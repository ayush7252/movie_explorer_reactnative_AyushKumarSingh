import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { verticalScale } from '../Constants/Dimensions';
import MovieCard from './MovieCard';
import { fetchMoviesByTitle } from '../AxiosRoutes/AxiosRoutes';
import Fuse from 'fuse.js';

interface SearchModalProps {
  data?: string;
  onSuggestionPress?: (title: string) => void;
}

const SearchModal = ({ data: query = '', onSuggestionPress }: SearchModalProps) => {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allMoviesForSuggestions, setAllMoviesForSuggestions] = useState<any[]>([]);
  const lastSelectedSuggestion = useRef<string | null>(null);
  const [inputQuery, setInputQuery] = useState(query);
  const abortControllerRef = useRef<AbortController | null>(null); // Ref to manage fetch cancellation

  // Update inputQuery if parent query changes
  useEffect(() => {
    setInputQuery(query);
  }, [query]);

  // Fetch movies for suggestions dropdown (on mount)
  useEffect(() => {
    const fetchAllMoviesForSuggestions = async () => {
      try {
        const response = await fetchMoviesByTitle('');
        setAllMoviesForSuggestions(response);
      } catch {
        setAllMoviesForSuggestions([]);
      }
    };
    fetchAllMoviesForSuggestions();
  }, []);

  // Handle FuseJS search for suggestions
  useEffect(() => {
    if (
      inputQuery &&
      allMoviesForSuggestions.length > 0 &&
      inputQuery !== lastSelectedSuggestion.current
    ) {
      const fuse = new Fuse(allMoviesForSuggestions, {
        keys: ['title'],
        threshold: 0.3,
      });
      const queryWords = inputQuery
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      const allFuzzy = fuse.search(inputQuery).map(r => r.item);
      const filtered = allFuzzy.filter(item =>
        queryWords.every(word =>
          item.title.toLowerCase().includes(word)
        )
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      if (inputQuery !== lastSelectedSuggestion.current) {
        lastSelectedSuggestion.current = null;
      }
    }
  }, [inputQuery, allMoviesForSuggestions]);

  // Function to fetch movies with cancellation support
  const fetchMoviesFromAPI = async (searchQuery: string, immediate = false) => {
  // Cancel any ongoing fetch
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }
  abortControllerRef.current = new AbortController();
  const { signal } = abortControllerRef.current;

  setAllMovies([]); // Clear previous movies to avoid showing outdated data
  setLoading(true); // Show the loader

  try {
    const response = await fetchMoviesByTitle(searchQuery, signal);
    if (response) {
      setAllMovies(response);
    } else {
      setAllMovies([]);
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('API error:', error);
      setAllMovies([]);
    }
  } finally {
    setLoading(false); // Hide the loader
  }
};

  // Debounced fetch for typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputQuery && inputQuery !== lastSelectedSuggestion.current) {
        fetchMoviesFromAPI(inputQuery);
      }
    }, 400);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [inputQuery]);

  // Handle suggestion press with immediate fetch
  const handleSuggestionPress = (suggestionTitle: string) => {
    lastSelectedSuggestion.current = suggestionTitle;
    setInputQuery(suggestionTitle);
    setShowSuggestions(false);
    if (onSuggestionPress) onSuggestionPress(suggestionTitle);
    Keyboard.dismiss();
    fetchMoviesFromAPI(suggestionTitle, true); // Fetch immediately
  };

  const handleReload = () => {
    if (inputQuery) {
      fetchMoviesFromAPI(inputQuery);
    }
  };

  const suggestionResultCount = suggestions.length;

  return (
    <View style={styles.container}>
      {showSuggestions && (
        <View style={styles.suggestionBox}>
          {suggestions.length > 0 && (
            <Text style={styles.suggestionCountText}>
              {suggestionResultCount} result{suggestionResultCount === 1 ? '' : 's'} found
            </Text>
          )}
          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(item.title)}
            >
              <Text style={styles.suggestionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      )}
      {inputQuery ? (
        loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <View style={{ flex: 1 }}>
            {allMovies.length > 0 && (
              <Text style={styles.resultCountText}>
                {allMovies.length} result{allMovies.length === 1 ? '' : 's'} found
              </Text>
            )}
            <FlatList
              style={{ flex: 1 }}
              data={allMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MovieCard data={item} handleReload={handleReload} />
              )}
              ListEmptyComponent={
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>No Data Found for "{inputQuery}"</Text>
                </View>
              }
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )
      ) : (
        <View style={styles.EnterMovieTitle}>
          <Text style={styles.text}>Enter movie title to search</Text>
        </View>
      )}
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  suggestionBox: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 4,
  },
  suggestionCountText: {
    color: 'rgb(181, 181, 179)',
    fontSize: verticalScale(10),
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 2,
  },
  suggestionItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: '#fff',
    fontSize: verticalScale(16),
  },
  EnterMovieTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(20),
  },
  text: {
    fontSize: verticalScale(18),
    fontWeight: '500',
    color: 'rgba(227, 223, 223, 0.47)',
  },
  resultCountText: {
    color: 'rgb(159, 158, 157)',
    fontSize: verticalScale(12),
    paddingLeft: verticalScale(8),
    paddingTop: 2,
    paddingBottom: 2,
  },
});
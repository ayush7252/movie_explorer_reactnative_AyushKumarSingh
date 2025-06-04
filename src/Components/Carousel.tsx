import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {verticalScale, width} from '../Constants/Dimensions';
import CarouselCard from './CarouselCard';

const Carousel = () => {
  interface Movie {
    id: number;
    rating: number;
    premium: boolean;
  }

  const [originalData, setOriginalData] = useState<Movie[]>([]);
  const [loopedData, setLoopedData] = useState<Movie[]>([]);
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);

  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(1000); // Start from middle of the loop
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {movies} = useSelector((state: any) => state.movies);

  useEffect(() => {
    const filtered = movies.filter(
      item => item.rating >= 8 && item.premium === false,
    );
    setOriginalData(filtered);
  }, [movies]);

  useEffect(() => {
    // Simulate infinite data by repeating originalData
    const repeated = Array(2000)
      .fill(originalData)
      .flat()
      .map((item, index) => ({
        ...item,
        key: `${item.id}-${index}`, // make unique keys
      }));
    setLoopedData(repeated);
  }, [originalData]);

  useEffect(() => {
    if (!flatListRef.current || loopedData.length === 0) return;

    // Scroll to a high middle index on mount
    flatListRef.current.scrollToIndex({
      index: currentIndex.current,
      animated: false,
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loopedData]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (modalOpenId !== null || loopedData.length === 0) return;

    intervalRef.current = setInterval(() => {
      currentIndex.current += 1;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000); 

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loopedData, modalOpenId]);

  const handleModalChange = (id: number | null) => {
    setModalOpenId(id);
  };

  return (
    <View testID="carousel-container">
      <Text style={styles.title} testID="carousel-title">
        Trending Movies
      </Text>
      <FlatList
        ref={flatListRef}
        testID="carousel-flatlist"
        data={loopedData}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <CarouselCard
            item={item}
            testID={`carousel-card-${item.id}`}
            onModalChange={handleModalChange}
          />
        )}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  title: {
    fontSize: verticalScale(18),
    fontWeight: '500',
    color: '#fff',
    marginVertical: verticalScale(10),
    marginLeft: verticalScale(20),
    lineHeight: verticalScale(20),
  },
});

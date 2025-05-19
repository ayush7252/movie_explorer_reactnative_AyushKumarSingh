import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import categories from '../Constants/SliderData';
import { scale, verticalScale } from '../Constants/Dimensions';

const HorizontalSlider = () => {
  return (
    <View style={styles.Container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.categoryScroll}
        testID="category-scroll"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            testID={`category-card-${item.id}`}
            activeOpacity={0.7}
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        initialNumToRender={5}
        ListHeaderComponent={<View style={{ width: scale(5) }} />} 
        ListFooterComponent={<View style={{ width: scale(5) }} />}
      />
    </View>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  Container: {
    paddingVertical: verticalScale(10),
  },
  categoryScroll: {
    paddingHorizontal: scale(5),
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: verticalScale(20),
    marginRight: scale(10),
    width: scale(100),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: verticalScale(1),
  },
  cardText: {
    color: '#fff',
  },
});

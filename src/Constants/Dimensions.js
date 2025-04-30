import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size, baseWidth = 375) => (width / baseWidth) * size;
const verticalScale = (size, baseHeight = 667) => (height / baseHeight) * size;
const moderateScale = (size, factor = 0.5, baseWidth = 375) =>
  size + (scale(size, baseWidth) - size) * factor;

export { width, height, scale, verticalScale, moderateScale };

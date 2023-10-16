import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../assets/Colors/Constants';

const deviceHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
  sectionBg: {
    backgroundColor: Constants.baseColor,
    height: deviceHeight,
  },
});
export default Styles;

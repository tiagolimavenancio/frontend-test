import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isFunction = input => typeof input === 'function';

class Devices {
  static isIphoneX() {
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (height === 812 || width === 812)
    );
  }
  
  static ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
      return iphoneXStyle;
    }
    return regularStyle;
  }
  
  static isAndroid() {
    return (Platform.OS === 'android');
  }
  
  static ifAndroid(androidStyle, regularStyle) {
    if (isAndroid()) {
      return androidStyle;
    }
    return regularStyle;
  }
  
  static renderIf(predicate) {
    return function(elemOrThunk) {
      return predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;
    }
  } 
}

export default Devices;



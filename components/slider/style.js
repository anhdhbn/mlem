import { StyleSheet,Dimensions } from 'react-native'
export const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  
  child: {
        height: 155,
        width,
        justifyContent: 'center'
      },
    slide: {
        width,
        height: 155,
        resizeMode: 'cover',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }
})
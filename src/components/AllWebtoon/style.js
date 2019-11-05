
import {
  StyleSheet
} from 'react-native'


import {
   BORDER_COLOR,
   TEXT_PRIMARY
} from '../../config/constant';

const styles = StyleSheet.create({
  container : {
    paddingHorizontal:18,
    paddingTop:18
  },
  title : {
    fontSize:TEXT_PRIMARY,
    fontWeight:'bold',
  },
  content : {
    flex:1,
    paddingBottom:20,
    marginTop:10
  }
})

export default styles;

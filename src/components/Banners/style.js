import {
  StyleSheet
} from 'react-native';

import {
  TITLE_LEAD,
  SUBTITLE_LEAD,
  TEXT_PRIMARY,
  TEXT_SECONDARY
 } from '../../config/constant';



const style = StyleSheet.create({
  container : {
    paddingBottom:20
  },
  image : {
    width:330,
    height:180,
    borderRadius:4
  },
  bannerTextTitle : {
    fontSize:TEXT_PRIMARY,
    fontWeight:'bold',
    marginTop:10
  },
  bannerTextPopularity : {
    position : 'absolute',
    right : 2,
    top:20,
    fontWeight:'bold'
  },
  bannerTextDesc : {
    color :'#666',
    marginTop:10,
    fontSize:TEXT_SECONDARY,
    width:'100%'
  }
});

export default style;

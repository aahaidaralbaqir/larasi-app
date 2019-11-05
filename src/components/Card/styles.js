import  {
  StyleSheet
} from 'react-native';

import {
  PRIMARY_COLOR,
  BORDER_COLOR,
  BORDER_WIDTH
} from '../../config/constant'


const styles = StyleSheet.create({
  containerCard : {
    width:125,
    height:'100%',
    backgroundColor:'white',
    paddingBottom:2,
    marginLeft:18,
    borderWidth:BORDER_WIDTH,
    borderColor:BORDER_COLOR
  },
  imageCard : {
    flex:1,
    width:null,
    height:null,
    resizeMode:'cover',
    borderRadius:3,
    borderTopLeftRadius:3,
    borderTopRightRadius:3
  },
  titleCard : {
    fontSize:13
  },
  genreCard: {
    fontSize:10,
    color:'silver'
  },
  buttonFavoritActive : {
    borderRadius:3,
    marginTop:10,
    backgroundColor:PRIMARY_COLOR
  },
  buttonFavoritNotActive : {
    borderRadius:3,
    borderWidth:BORDER_WIDTH,
    borderColor:BORDER_COLOR,
    marginTop:10
  },
  buttonFavoritTextActive : {
    color : 'whitesmoke',
    paddingHorizontal:10,
    paddingVertical: 5,
  },
  buttonFavoritTextNotActive : {
    color : 'silver',
    paddingHorizontal:10,
    paddingVertical: 5,
  }
});

export default styles;

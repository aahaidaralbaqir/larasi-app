import React from 'react';

import {
   View,
   Image,
   Text,
   TouchableOpacity
} from 'react-native';

import {
  BORDER_WIDTH,
  BORDER_COLOR
} from '../../config/constant';
import  moment from 'moment'
import { basePATH } from '../../config/api'
function Episode({title,image,createdAt}) {
   let noImage = 'https://image.shutterstock.com/z/stock-vector-no-image-vector-isolated-on-white-background-1481369594.jpg'
   let imageUrl = image == "" ? noImage : `${basePATH}/${image}`
   return (
      <View style={{flex:1,height:80,flexDirection:'row'}}>
         <View style={{flex:1.5}}>
            <Image
               source={{uri:imageUrl}}
               style={{width:'100%',height:'100%'}}
             />
         </View>
         <View style={{flex:5,padding:15,borderWidth:BORDER_WIDTH,borderColor:BORDER_COLOR}}>
         <Text style={{fontSize:16}}>{title}</Text>
            <View style={{flex:1,flexDirection:'row'}}>
               <Text style={{marginTop:12,color:'#666'}}>{moment(createdAt).format('DD MMMM YYYY')}</Text>
            </View>
         </View>
      </View>
   )
}

export default Episode;

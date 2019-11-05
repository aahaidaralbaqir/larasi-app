import React from 'react';
import {
   View,
   Image,
   Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR } from '../../config/constant';



function ListEpisode({image,title,date}) {
   return (
      <View style={{flex:1,marginTop:20}}>
         <View style={{flex:10,flexDirection : 'row'}}>
            <View style={{flex:2}}>
               <Image
                  source={{uri :image}}
                  style={{width:100,height:100,borderRadius:3}}
                  />
            </View>
            <View style={{flex:3}}>
               <Text style={{fontSize:20,fontWeight:'bold'}}>{title}</Text>
               <Icon type="FontAwesome" name="calendar" style={{color:PRIMARY_COLOR,marginTop:20}}> {date}</Icon>
            </View>
         </View>
      </View>
   )
}

export default ListEpisode;

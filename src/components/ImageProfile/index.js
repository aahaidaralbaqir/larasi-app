import React from 'react';
import {
   View,
} from 'react-native';
import { PRIMARY_COLOR } from '../../config/constant';
import Icon from 'react-native-vector-icons/FontAwesome';

function ImageProfile() {
   return (
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,padding:30}}>
               <Icon type="FontAwesome" name="user-circle-o" style={{fontSize:90,color :PRIMARY_COLOR}}/>
            </View>
      
         </View>
   )
}

export default ImageProfile;

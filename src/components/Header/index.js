import React,{ useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

function Header({navigation}){
  return (
    <View style={{flex:1,height:60,flexDirection:'row',backgroundColor:'#f4f4f4'}}>
      <View style={{flex:2}}></View>
      <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search1" style={{fontSize:30}}  />
        </TouchableOpacity>
      </View>
    </View>
  )

}

export default Header;

import React from 'react'
import {
   View,
   Text,
   TouchableOpacity,
   FlatList,
   Image,
   ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import {
   BORDER_COLOR,
   BORDER_WIDTH,
   PRIMARY_COLOR,
} from '../../config/constant'
import { connect } from 'react-redux'
import { basePATH } from '../../config/api'

function ListMyFavorite({image,title,isFavorite,navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailEpisode',{title})}>
    <View style={{flex:1,height:80,flexDirection:'row'}}>
    <View style={{flex:1.5}}>
      <Image
      source={{uri:`${basePATH}/${image}`}}
      style={{width:'100%',height:'100%'}}
      />
    </View>
    <View style={{flex:5,padding:15,borderWidth:BORDER_WIDTH,borderColor:BORDER_COLOR}}>
      <Text style={{fontSize:16}}>{title}</Text>
      <Icon name="bells" style={{color:PRIMARY_COLOR,marginTop:10}}> {isFavorite.length} Favorite</Icon>
    </View>
    </View>
    </TouchableOpacity>
  )
}

function Favorite(props) {
   return (
      <View style={{flex:1}}>
         <View style={{flex:7}}>
            <FlatList
               data={props.favorites}
               renderItem={({item}) =>  <ListMyFavorite key={item.id} {...item} navigation={props.navigation} />}
               keyExtractor={item => item.id.toString()}
            />
         </View>
      </View>
   )
}

const mapStateToProps = (state) => {
   return {
      favorites  : state.webtoon.favorite,
      isLoading : state.webtoon.isLoading
   }
}


export default connect(mapStateToProps,null)(Favorite)

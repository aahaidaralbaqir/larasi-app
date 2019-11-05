import React from 'react';
import {
   Image,
   Text,
   View,
   TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import constant
import { PRIMARY_COLOR } from '../../config/constant';
import { basePATH } from '../../config/api';
// import components



function ListWithButton({id,image,title,genre,navigation,favorite}) {
   return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail',{id,title,image,genre,favorite})}>
         <View style={{flex:1,flexDirection:'row',marginVertical:5}}>
            <View style={{flex:10,flexDirection : 'row'}}>
               <View style={{flex:2,flexDirection:'row'}}>
                  <View style={{flex:15,justifyContent:'center',flexDirection:'row'}}>
                    <View style={{flex:0.7}}>
                      <Image
                        source={{uri : `${basePATH}/${image}`}}
                        style={{width:50,height:50,borderRadius:3}}
                      />
                    </View>
                    <View style={{flex:2.5,justifyContent:'center'}}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>{title}</Text>
                      <Text style={{fontSize:10,color:'silver'}}>{genre.toUpperCase()}</Text>
                    </View>
                  </View>
               </View>
            </View>
         </View>
      </TouchableOpacity>
   )
}

function ListWithoutButton({image,id,title,genre,popularity,withSumEpisode,sumEpisode,onPress}) {
   const icon = withSumEpisode ? 'angellist' : 'heart-o';
   const text = withSumEpisode ? `${sumEpisode} Episode(s)` : popularity;

   return (
      <TouchableOpacity onPress={onPress}>
      <View style={{flex:1,flexDirection:'row',marginTop:10}}>
         <View style={{flex:10,flexDirection : 'row'}}>
            <View style={{flex:2}}>
               <Image
                  source={{uri : image}}
                  style={{width:100,height:100,borderRadius:3}}
                  />
            </View>
            <View style={{flex:3}}>
               <Text style={{fontSize:20,fontWeight:'bold'}}>{title  }</Text>
               <Text style={{fontSize:15,color:'#666',fontWeight:'bold'}}>{genre}</Text>
               <Icon type="FontAwesome" name={icon} style={{color:PRIMARY_COLOR,marginTop:20}}> {text}</Icon>
            </View>
         </View>
      </View>
      </TouchableOpacity>
   )
}



function List(props) {
   if(props.withButton) {
      return <ListWithButton {...props} />
   }
   return <ListWithoutButton {...props} />
}


export default List;

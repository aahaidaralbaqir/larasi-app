import React,{useState,useEffect} from 'react';
import {
   View,
   Text,
   FlatList,
   Image,
   TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
import { PRIMARY_COLOR,BORDER_WIDTH,BORDER_COLOR } from '../../config/constant';
import { fetchDataMyWebtoon } from '../../config/redux/action'
import { basePATH } from '../../config/api'

function ListMyWebtoon({id,image,title,navigation,genre,episodes}) {
   return (
     <TouchableOpacity onPress={() => navigation.navigate('EditWebtoon',{id,title,genre,image})}>
     <View style={{flex:1,height:80,flexDirection:'row'}}>
     <View style={{flex:1.5}}>
       <Image
       source={{uri:`${basePATH}/${image}`}}
       style={{width:'100%',height:'100%'}}
       />
     </View>
     <View style={{flex:5,padding:15,borderWidth:BORDER_WIDTH,borderColor:BORDER_COLOR}}>
       <Text style={{fontSize:16}}>{title}</Text>
       <Icon name="bells" style={{color:PRIMARY_COLOR,marginTop:10}}>{episodes.length} Eps</Icon>
     </View>
     </View>
     </TouchableOpacity>
   )
 }

function WebtoonCreation(props) {
   const { user_id , token } = props.currUser
   useEffect(() => {
      props.fetchMyWebtoon(token,user_id)
   },[])
   return (
      <View style={{flex:1}}>
         <View style={{flex:7}}>
            <FlatList
               data={props.webtoon}
               renderItem={({item}) =>  <ListMyWebtoon key={item.id} {...item} navigation={props.navigation} />}
               keyExtractor={item => item.id.toString()}
            />
            <View style={{width:60,height:60,backgroundColor:PRIMARY_COLOR,borderRadius:30,alignItems:'center',justifyContent:'center',position:'absolute',bottom:20,right:20}}>
            <Icon name="plus" style={{fontSize:30,color:'whitesmoke'}} onPress={() => props.navigation.navigate('CreateWebtoon')} />
         </View>
         </View>
         
      </View>
   )
}

const mapStateToProps = (state) => {
   return {
      currUser : state.auth.currUser,
      webtoon : state.user.webtoon
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMyWebtoon : (token,user_id) => dispatch(fetchDataMyWebtoon(token,user_id))
   }
} 

export default connect(mapStateToProps,mapDispatchToProps)(WebtoonCreation);

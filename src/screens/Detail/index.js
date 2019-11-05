import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {
   View,
   Text,
   Image,
   ScrollView,
   TouchableOpacity
} from 'react-native'
import { api ,headerOptions } from '../../config/api'
import Episode from '../../components/Episode'
import { handleShare } from '../../helpers'
import Icon from 'react-native-vector-icons/AntDesign'
import {basePATH} from '../../config/api'
import { fetchDataEpisode, fetchDataFavorite } from '../../config/redux/action'
import  Loading from '../../components/Loading'
function Detail(props) {
   const {getParam} = props.navigation
   const imageBanner = getParam('image') 
   const title = getParam('title')
   const genre = getParam('genre')
   const id = getParam('id')
   const favorite = getParam('favorite')
   const { token } = props.currUser
   const [isFavorite,setIsFavorite] = useState(favorite)
  const imageUrl = `${basePATH}/${imageBanner}`
   const addToFavorite = async () => {
      try{
        const response = await api.post(`/webtoons/favorite`,{webtoon_id : id},headerOptions(token))
        if(response.status == 200) {
          props.fetchFavorite(token)
          setIsFavorite(!isFavorite)
        }
      }catch(err){
        console.log(err)
      }
   }

   useEffect(() => {
      props.fetchEpisodes(token,id)
   },[])
   
   
   const icon = isFavorite  ? 'check' : 'plus';
   
   return(
      <ScrollView>
      <View style={{flex:1,position:'relative'}}>
      <View style={{flex:2}}>
         <Image
         source={{uri:imageUrl}}
         style={{height:200}}
         />
      </View>
      <View style={{width:'100%',backgroundColor:'black',height:200,left:0,top:0,position:'absolute',opacity:0.5}}>
          <View style={{flex:1,position:'relative'}}>
            <View style={{flex:2,flexDirection:'row'}}>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                  <Icon name="arrowleft" style={{fontSize:30,color:'whitesmoke'}} onPress={() => props.navigation.goBack()} />
                </View>
                <View style={{flex:5}}>
                </View>
                <View style={{flex:5,alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}}>
                  <Icon name={icon} style={{fontSize:30,color:'whitesmoke',marginRight:20}} onPress={!isFavorite ? addToFavorite : () => alert('wkwkwkwk')} />
                  <Icon name="sharealt" style={{fontSize:30,color:'whitesmoke',marginRight : 20}} onPress={handleShare}  />
                </View>
            </View>
            <View style={{flex:5,paddingHorizontal:20}}>
              <View style={{flex:1,justifyContent:'flex-end',paddingBottom:20}}>
                <Text style={{fontSize:40,color:'white'}}>{title}</Text>
                <Text style={{fontSize:20,color:'white'}}>{genre}</Text>
                <Icon name="book" style={{color:'white'}}> {props.episodes.length} Episode(s).</Icon>
              </View>
          </View>
        </View>
      </View>
      <View style={{flex:3}}>
        {props.episodes.map((item,index) =>  (
          <TouchableOpacity onPress={() => props.navigation.navigate('DetailEpisode',{ user_id : props.currUser.user_id,token : props.currUser.token, episode_id : item.id })}>
            <Episode key={index} {...item}/>
          </TouchableOpacity>
        ))}
      </View>
      </View>
      </ScrollView>
   )
}

const mapStateProps = (state) => {
    return {
      episodes : state.webtoon.episodes,
      currUser : state.auth.currUser,
      favorites : state.webtoon.favorite
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEpisodes : (token,webtoon_id) => dispatch(fetchDataEpisode(token,webtoon_id)),
    fetchFavorite : (token) => dispatch(fetchDataFavorite(token))
  }
}

export default connect(mapStateProps,mapDispatchToProps)(Detail);

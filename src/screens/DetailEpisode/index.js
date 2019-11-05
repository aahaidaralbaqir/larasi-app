import React,{useState,useEffect} from 'react'
import {
   FlatList,
   Image
} from 'react-native'
import { connect } from 'react-redux'
import { basePATH } from '../../config/api'
import { fetchDataChapter } from '../../config/redux/action'
import Loading from '../../components/Loading'
function Story({image}) {
   let imageUri = `${basePATH}/${image}`
   return (
      <Image
         source={{uri:imageUri}}
         style={{width:'100%',height:500}}
      />
   )
}


function DetailEpisode(props) {
   const episode_id = props.navigation.getParam('episode_id')
   const user_id = props.navigation.getParam('user_id')
   const token = props.navigation.getParam('token')

   useEffect(() => {
      props.fetchChapter(user_id,token,episode_id)
   },[])
   if(props.isLoading) {
      return <Loading />
   }
   return (
      <FlatList
        data={props.chapters}
        renderItem={({ item }) => <Story key={item.id} {...item}  />}
        keyExtractor={item => item.id.toString()}
      />
   )
}

const mapStateToProps = state => {
   return {
      chapters : state.webtoon.chapters,
      isLoading : state.webtoon.isLoading
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchChapter : (user_id,token,episode_id) => dispatch(fetchDataChapter(user_id,token,episode_id))
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailEpisode);

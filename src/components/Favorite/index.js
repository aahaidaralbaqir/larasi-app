import React,{useEffect} from 'react'
import { View , Text , ScrollView} from 'react-native'
import Card from '../Card'
import Loading from '../../components/Loading'
import  { fetchDataFavorite } from '../../config/redux/action'
import { TEXT_PRIMARY } from '../../config/constant'
import { api , headerOptions } from '../../config/api'
import { connect } from 'react-redux'

function Favorite(props) {
   const { token } = props.currUser
  
   const handleDeleteFavorite = (id) => {
    api.delete(`/webtoons/${id}/favorite`, headerOptions(token))
    .then( response => {
      props.fetchFavorite(token)
    })
    .catch(err => {
      console.log(err)
    }) 
  }
   
   useEffect(() => {
     props.fetchFavorite(token)
   },[])

   if(props.isLoading){
    return <Loading />
  }

   return (
         <View style={{flex:1}}>
            <Text style={{fontSize:TEXT_PRIMARY,fontWeight:'bold',marginLeft:18,marginTop:15}}>Favorit</Text>
            <View style={{height:170,marginTop:10}}>
               <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
               >
               {props.favorite.map((item,index) => (
                 <Card navigation={props.navigation} key={index} {...item} deleteFavorite={handleDeleteFavorite} />
               ))}
               </ScrollView>
            </View>
         </View>
   )
}


const mapStateToProps = (state) => {
  return  {
    currUser : state.auth.currUser,
    favorite : state.webtoon.favorite,
    isLoading : state.webtoon.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavorite : (token) => dispatch(fetchDataFavorite(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorite);

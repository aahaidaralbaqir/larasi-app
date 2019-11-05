import React,{ useEffect } from 'react';
import {
   View,
   Text,
} from 'react-native';
import  { fetchDataWebtoon } from '../../config/redux/action'
import List from "../List";
import styles from './style.js';
import { connect } from 'react-redux'
import Loading from '../../components/Loading'
function AllWebtoon(props) {
  const { token } = props.currUser
   useEffect(() => {
      props.fetchWebtoon(token)
   },[props.favorites])
   if(props.isLoading){
     return <Loading />
   }
   return (
      <View style={styles.container}>
         <Text style={styles.title}>All</Text>
         <View style={styles.content}>
            {props.webtoon.map((item,index) => (
              <List withButton key={item.id} navigation={props.navigation} {...item} />
            ))}
         </View>
      </View>
   )
}

const mapStateToProps = (state) => {
  return {
    webtoon : state.webtoon.webtoon,
    favorites : state.webtoon.favorite,
    currUser : state.auth.currUser,
    isLoading : state.webtoon.isLoading
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    fetchWebtoon : (token) => dispatch(fetchDataWebtoon(token))
  }
}

export default connect(mapStateToProps,mapDispatchProps)(AllWebtoon);

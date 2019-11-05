import React,{useState,useEffect} from 'react';
import {
 View,
 Text,
 ScrollView
} from 'react-native';
import AllWebtoon from '../../components/AllWebtoon'
import Banners from '../../components/Banners'
import Favorite from '../../components/Favorite'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { dataSource } from '../../config/data.js'

function ForYou(props) {
    const { navigation } = props
    const {username } = props.currUser
   
    return (
        <ScrollView>
        <View style={{flex:1}}>
            <Header navigation={navigation} />
            <View style={{flex:8,backgroundColor:'#f4f4f4'}}>
                <View style={{flex:4}}>
                    <View style={{flex:1,paddingHorizontal:18}}>
                        <Text style={{fontSize:30,fontWeight:'700',marginTop:10}}>Halo { username }</Text>
                        <Text style={{fontSize:17,color :'#666',marginTop:0}}>Best comic for this week !</Text>
                    </View>
                </View>
                <View style={{flex:9,alignItems:'center'}}>
                   <View style={{marginTop:20}}></View>
                   <Banners items={dataSource} />
                </View>
            </View>
            <View style={{flex:2}}>
                <View style={{flex:1}}>
                  <Favorite navigation={navigation} />
                </View>
                <View style={{flex:6}}>
                  <AllWebtoon items={dataSource} navigation={navigation} />
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
  return {
    currUser : state.auth.currUser
  }
}

export default connect(mapStateToProps,null)(ForYou);

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
//screens
import Detail from '../../screens/Detail';
import DetailEpisode from '../../screens/DetailEpisode';
import WebtoonCreation from '../../screens/WebtoonCreation';
import CreateWebtoon from '../../screens/CreateWebtoon';
import EditWebtoon from '../../screens/EditWebtoon';
import CreateEpisode from '../../screens/CreateEpisode';
import CreatePage from '../../screens/CreatePage';
import EditEpisode from '../../screens/EditEpisode';
import Search from '../../screens/Search';
// import helper and constant
import { handleShare } from '../../helpers';
import  { PRIMARY_COLOR,BORDER_COLOR,BORDER_WIDTH } from '../../config/constant';
import Icon from 'react-native-vector-icons/AntDesign'

import BottomNavigator from './BottomNavigator';

const WebtoonStack = createStackNavigator({
  WebtoonCreation : {
    screen : WebtoonCreation,
    navigationOptions : ({navigation}) => {
      return {
        headerStyle : {
          elevation : 0,
          borderBottomColor : BORDER_COLOR,
          borderWidth : BORDER_WIDTH
        },
        headerTitle : 'My Webtoon',
      }
    }
  },

  CreateWebtoon : {
    screen : CreateWebtoon
  },
  EditWebtoon : {
    screen : EditWebtoon,
  }
  
});


const PrivateNavigation = createStackNavigator({

  BottomNavigation : {
    screen : BottomNavigator,
    navigationOptions : {
      header : null
    }
  },

  Webtoon  : {
    screen: WebtoonStack,
    navigationOptions  : {
      header: null
    }
  },
  Detail : {
    screen : Detail,
    navigationOptions : ({navigation}) => {
      return {
        header : null
      }
    }
  },
  DetailEpisode : {
    screen : DetailEpisode,
    navigationOptions : ({navigation}) => {
      const {navigate,getParam} = navigation
      const title = getParam('title')
      return {
        headerTitle : title,
        headerTitleStyle: {
          fontSize: 18,
          color : 'white',
          fontWeight : 'bold'
        },
        headerTintColor: '#fff',
        headerStyle : {
          backgroundColor : 'black'
        },
        headerLeft: <Icon  name="arrowleft" style={{marginLeft:18,fontSize:20,color:'whitesmoke'}} onPress={() => navigation.goBack(null)} />,
        headerRight: <Icon type="FontAwesome" name="sharealt" style={{marginRight:30,fontSize:20,color:'whitesmoke'}} onPress={handleShare} />
      }
    }
  },
  CreateEpisode : {
    screen : CreateEpisode,
  },
  CreatePage : {
    screen : CreatePage
  },
  EditEpisode : {
    screen : EditEpisode
  },
  SearchScreen : {
    screen : Search,
    navigationOptions : ({navigation}) => {
      return {
        header : null
      }
    }
  }
})

export default PrivateNavigation;

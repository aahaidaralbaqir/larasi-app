
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { createStackNavigator } from 'react-navigation-stack';
import  { createBottomTabNavigator } from 'react-navigation-tabs';
import ForYou from '../../screens/ForYou';
import Favorite from '../../screens/Favorite';
import Profile from '../../screens/Profile';
import EditProfile from '../../screens/EditProfile';

import  { PRIMARY_COLOR,BORDER_COLOR, BORDER_WIDTH } from '../../config/constant';


const ForYouStack  = createStackNavigator({
  ForYou :  {
    screen : ForYou,
    navigationOptions : {
      header: null
    }
  },
  
});

const FavoritStack = createStackNavigator({
  Favorite : {
    screen : Favorite,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'My Favorite',
        headerStyle : {
          elevation : 0,
          borderBottomColor : BORDER_COLOR,
          borderWidth : BORDER_WIDTH
        },
        headerRight: <Icon name="search1" style={{marginRight:30,fontSize:25,color:PRIMARY_COLOR}} onPress={() => navigation.navigate('SearchScreen')} />,
      }
    }
  }
});


const ProfileStack = createStackNavigator({
  Profile : {
    screen : Profile,
  
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Profile',
        headerStyle : {
          elevation : 0,
          borderBottomColor : BORDER_COLOR,
          borderWidth : BORDER_WIDTH
        },
        headerRight: <Icon name="edit" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={() => navigation.navigate('EditProfile')} />,
      }
    }
  },
  EditProfile : {
    screen : EditProfile,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Edit Profile',
        headerStyle : {
          elevation : 0,
          borderBottomColor : BORDER_COLOR,
          borderWidth : BORDER_WIDTH
        },
        headerRight: <Icon type="FontAwesome" name="check" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={ () => navigation.navigate('Profile') }  />,
      }
    }
  }
});

const BottomNavigation = createBottomTabNavigator(
  {
    ForYou: {
      screen: ForYouStack,
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="appstore-o" color={tintColor} size={25} />
        ),
      },
    },
    Favorite: {
      screen: FavoritStack,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Favorite',
        tabBarIcon: ({tintColor}) => (
          <Icon name="hearto" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" color={tintColor} size={25} />
        ),

      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#00b900',
      inactiveTintColor: '#ccc',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffffff',
        elevation : 1,
        borderColor : BORDER_COLOR
      },
    },
  },
);


export default BottomNavigation;

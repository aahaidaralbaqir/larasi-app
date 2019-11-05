import React,{ useState,useEffect } from 'react';
import {
   View,
   Text,
   Image,
} from 'react-native';


import {
  PRIMARY_COLOR,
} from '../../config/constant';

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './style.js';

function Banners({items}){
   const [banners,setBanners] = useState(items);
   const [currentIndex,setCurrentIndex] = useState(0);

   useEffect(
    () => {
         let timeout = setTimeout(() => {
            setCurrentIndex(
               (currentIndex + 1) % banners.length
            );
         } , 3000);
         return () => clearTimeout(timeout);
   },[currentIndex]);
   return (
      <View style={styles.container}>
          <View>
              <Image
                 source={{uri:banners[currentIndex].image}}
                 style={styles.image}
              />
          </View>
          <View style={{width:300}}>
              <Text style={styles.bannerTextTitle}>
                  {banners[currentIndex].title}
               </Text>
               <Text style={styles.bannerTextPopularity}>
                  <Icon name="checkcircleo" style={{fontSize:15,color:PRIMARY_COLOR}}> {banners[currentIndex].popularity}</Icon>
               </Text>
              <Text style={styles.bannerTextDesc}>{banners[currentIndex].desc}</Text>
          </View>
      </View>
   )
}

export default Banners;

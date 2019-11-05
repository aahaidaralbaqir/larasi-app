import React from 'react';
import {
   View,
   Image,
   Text,
   TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { basePATH } from '../../config/api/'
function Card({id,image,title,navigation,genre,desc,deleteFavorite,favorite_id,favorite}) {
   return  (
      <TouchableOpacity onPress={() => navigation.navigate('Detail',{id,title,image,genre,desc,favorite})}>
      <View style={styles.containerCard}>
         <View style={{flex:1.5}}>
            <Image
               source={{uri:`${basePATH}/${image}`}}
               style={styles.imageCard}
            />
         </View>
         <View style={{flex:1.3,padding:10}}>
            <Text style={styles.titleCard}>{title}</Text>
            <Text style={styles.genreCard}>{genre.toUpperCase()}</Text>
            <TouchableOpacity onPress={ () =>  deleteFavorite(favorite_id)}>
              <View style={styles.buttonFavoritActive}>
                <Text style={styles.buttonFavoritTextActive}><Icon name="check" /> Favorit</Text>
              </View>
            </TouchableOpacity>
         </View>

      </View>

      </TouchableOpacity>
   )
}

export default Card;

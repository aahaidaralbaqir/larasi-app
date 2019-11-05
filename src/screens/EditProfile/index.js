
import React,{useState} from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   PixelRatio,
   Image
} from 'react-native';
import {
   Input,
   Item,
   Container,
   Content
} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
// import component
import ImageProfile from '../../components/ImageProfile';
import ImagePicker from 'react-native-image-picker'
// import constant
import {
   BORDER_COLOR,
   BORDER_WIDTH
} from '../../config/constant'


function EditProfile() {
   const [name,setName] = useState('');
   const [avatar,setAvatar] = useState(null);

   const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500
    };



    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(source);

        setAvatar(
         source
        );
      }
    });
  }

   return (
      <>
      <Container>
       <Content>
         <View style={{flex:3}}>
         <View style={{flex:4,alignItems:'center',position:'relative'}}>
            <TouchableOpacity onPress={selectPhotoTapped}>
             <View
               style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
               {avatar === null ? (
                 <Text>Select a Photo</Text>
               ) : (
                 <Image style={styles.avatar} source={avatar} />
               )}
             </View>
           </TouchableOpacity>
         </View>
         <View style={{flex:3,alignItems:'center',paddingHorizontal:20}}>
            <Item regular>
               <Input
                  value={name}
                  style={{
                     borderColor:BORDER_COLOR,
                     borderWidth: BORDER_WIDTH,
                     borderStyle: 'solid',
                     fontSize:15,
                     borderRadius: 2,
                     backgroundColor:'white',
                     borderStyle: 'solid'
                  }}
                  onChangeText={text => setName(text)}
                />
            </Item>
         </View>
         </View>
         </Content>
      </Container>
      </>
   )
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
    marginTop:20
  },
});

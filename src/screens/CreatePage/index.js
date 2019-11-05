
import React from 'react';
import {
   View,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   Image,
} from 'react-native';
import { connect } from 'react-redux'
import {
   Input,
   Item,
   Text
} from 'native-base';

import {
   TITLE_SIZE,
   PRIMARY_COLOR,
   BORDER_WIDTH,
   BORDER_COLOR
 } from '../../config/constant';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'
import { baseURL } from '../../config/api'


class CreatePage extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         episode_id : null,
         page : '',
         dataImage : null,
         image : 'https://image.shutterstock.com/z/stock-vector-no-image-vector-isolated-on-white-background-1481369594.jpg',
         loading : false
      }
      this.handleSave = this.handleSave.bind(this)
   }

   componentDidMount() {
      this.props.navigation.setParams({'createPage' : this.handleSave})
      let episode_id = this.props.navigation.getParam('episode_id')
      this.setState({
          episode_id
      })
   }

   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle : 'Create Page',
         headerStyle : {
           elevation : 0,
           borderBottomColor : BORDER_COLOR,
           borderWidth : BORDER_WIDTH
         },
         headerRight: <Icon name="check" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={navigation.getParam('createPage') }  />,
      };
    };
   


   selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions : {
         skipBackup : true,
         path : 'images'
      }
    };

    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
         const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
         }
        this.setState({
           image : response.uri,
           dataImage
         })
      }
    })
  }

handleSave = async () => {
      let data = new FormData;
      data.append('page',this.state.page)
      data.append('image', this.state.dataImage)
      try {
         const response = await axios({
           method: 'POST',
           url: `${baseURL}/user/${this.props.currUser.user_id}/webtoon/3/episode/${this.state.episode_id}/image`,
           data,
           headers: {
             'Authorization' : `Bearer ${this.props.currUser.token}`,
             'Content-Type': 'multipart/form-data',
           },
         });
         if (response.status == 200) {
           this.props.navigation.pop();
           this.setState({
             page: '',
             episode_id : null,
             image: 'https://image.shutterstock.com/z/stock-vector-no-image-ve-isolated-on-white-background-1481369594.jpg',
           });
         }
       } catch (error) {
         console.log(error);
       }
 }

  render () {
     return (
           <ScrollView>
           <View style={{flex:1}}>
              <View style={{flex:4,padding:18}}>

                 <View>
                    <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Page</Text>
                    <Item regular>
                        <Input keyboardType='numeric'  onChangeText={text => this.setState({page : text})} />
                    </Item>
                 </View>
  

                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Image</Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped}>
                    <View
                       style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                       {this.state.avatar === null ? (
                       <Text>Select a Photo</Text>
                       ) : (
                       <Image style={styles.avatar} source={{uri : this.state.image}} />
                       )}
                    </View>
                    </TouchableOpacity>
                 </View>
              </View>
        
           </View>
           </ScrollView>
        )
      }
   }

   const mapStateToProps  = (state) => {
      return {
         currUser : state.auth.currUser
      }
   }

   export default connect(mapStateToProps,null)(CreatePage);


   const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
         width: 300,
         height: 150,
         marginTop:20
      },
    });
    

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
import { setMyWebtoon } from '../../config/redux/action'
import { baseURL } from '../../config/api'
class CreateWebtoon extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         title : '',
         genre : '',
         dataImage : null,
         image : 'https://image.shutterstock.com/z/stock-vector-no-image-vector-isolated-on-white-background-1481369594.jpg',
         loading : false
      }
      this.handleSave = this.handleSave.bind(this)
   }

   componentDidMount() {
      this.props.navigation.setParams({'createWebtoon' : this.handleSave})
   }

   static navigationOptions = ({ navigation, navigationOptions }) => {
      return {
         headerTitle : 'Create Webtoon',
         headerStyle : {
           elevation : 0,
           borderBottomColor : BORDER_COLOR,
           borderWidth : BORDER_WIDTH
         },
         headerRight: <Icon name="check" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={navigation.getParam('createWebtoon') }  />,
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
      data.append('title',this.state.title)
      data.append('genre',this.state.genre)
      data.append('image', this.state.dataImage)
      try {
         const response = await axios({
           method: 'POST',
           url: `${baseURL}/user/${this.props.currUser.user_id}/webtoon`,
           data,
           headers: {
             'Authorization' : `Bearer ${this.props.currUser.token}`,
             'Content-Type': 'multipart/form-data',
           },
         });
         if (response.status == 200) {
            alert('Webtoon has been created !!')
            
           this.setState({
             title: '',
             genre: '',
             image: 'https://image.shutterstock.com/z/stock-vector-no-image-ve-isolated-on-white-background-1481369594.jpg',
           });
         }
       } catch (error) {
         console.log(error);
       }
 };

  render () {
     return (
           <ScrollView>
           <View style={{flex:1}}>
              <View style={{flex:4,padding:18}}>
                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Title</Text>
                 <Item regular>
                    <Input  onChangeText={text => this.setState({title : text})} />
                 </Item>
                 </View>
  
                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10}}>Genre</Text>
                 <Item regular>
                    <Input onChangeText={text => this.setState({genre : text})}  />
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
         currUser : state.auth.currUser,
         myWebtoon : state.user.webtoon
      }
   }
   
   const mapDispatchToProps = (dispatch) => {
      return {
         reFetchMyWebtoon : (data) =>  dispatch(setMyWebtoon(data))
      }
   }

   export default connect(mapStateToProps,mapDispatchToProps)(CreateWebtoon);


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
    
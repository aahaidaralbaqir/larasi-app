
import React from 'react';
import {
   View,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   Image,
   Modal,
   TouchableHighlight
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
 } from '../../config/constant'
import ListImage from '../../components/ListImage'
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'
import { basePATH,baseURL } from '../../config/api'
import { fetchDataEpisode , fetchDataChapter } from '../../config/redux/action'
import axios from 'axios'
import Loading from '../../components/Loading';

const options = {
   quality: 1.0,
   maxWidth: 500,
   maxHeight: 500,
   storageOptions : {
      skipBackup : true,
      path : 'images'
   }
 }

class EditEpisode extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         episode_id : null,
         title : '',
         dataImage : null,
         webtoon_id : null,
         modalVisible: false,
         image : 'https://image.shutterstock.com/z/stock-vector-no-image-vector-isolated-on-white-background-1481369594.jpg',
         loading : false
      }
      this.handleEditEpisode = this.handleEditEpisode.bind(this)
   }
   
   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle : 'Edit Episode',
         headerStyle : {
           elevation : 0,
           borderBottomColor : BORDER_COLOR,
           borderWidth : BORDER_WIDTH
         },
         headerRight: <Icon name="check" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={navigation.getParam('EditEpisode') }  />,
      }
    }

   componentDidMount() {
      let episode_id = this.props.navigation.getParam('id')
      let image = this.props.navigation.getParam('image')
      let title = this.props.navigation.getParam('title')
      let { token,user_id } = this.props.currUser
      this.setState({
         episode_id,
         image,
         title
      })
      this.props.fetchChapters(user_id,token,episode_id)
      this.props.navigation.setParams({'EditEpisode' : this.handleEditEpisode})
   }

   setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

   selectPhotoTapped = () => {
  

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

  handleEditEpisode = async () => {
      let data = new FormData;
      let { episode_id , webtoon_id } = this.state
      let { token,user_id } = this.props.currUser
      data.append('title',this.state.title)
      data.append('image', this.state.dataImage)
      try {
         const response = await axios({
           method: 'PATCH',
           url: `${baseURL}/user/${user_id}/webtoon/${webtoon_id}/episode/${episode_id}`,
           data,
           headers: {
             'Authorization' : `Bearer ${token}`,
             'Content-Type': 'multipart/form-data',
           },
         });
         if (response.status == 200) {
            alert('Episode has been updated !!')
            this.props.fetchEpisodes(token,webtoon_id)
            setTimeout(() => {
                 this.props.navigation.pop();
            },3000)
           this.setState({
             title: '',
             episode_id : null,
             episode_id : null,
             image: 'https://image.shutterstock.com/z/stock-vector-no-image-ve-isolated-on-white-background-1481369594.jpg',
           });
         }
       } catch (error) {
         console.log(error);
       }
 }

  handleDeleteImage = (id) =>{
   alert(id)
 }

  render () {
     let imageUrl =  this.state.dataImage === null ? {uri : `${basePATH}/${this.state.image}`} : {uri : this.state.image}
     const { title } = this.state
     return (
           <ScrollView>
            <Modal
               animationType="slide"
               transparent={false}
               visible={this.state.modalVisible}
               onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
               }}>
               <View style={{marginTop: 22}}>
                  <View>
                  <Text>Hello World!</Text>

                  <TouchableHighlight
                     onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                     }}>
                     <Text>Hide Modal</Text>
                  </TouchableHighlight>
                  </View>
               </View>
            </Modal>
           <View style={{flex:1}}>
              <View style={{flex:4,padding:18}}>
                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Title</Text>
                 <Item regular>
                    <Input value={title} onChangeText={text => this.setState({title : text})} />
                 </Item>
                 </View>

                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Cover</Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped}>
                    <View
                       style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                       {this.state.avatar === null ? (
                       <Text>Select a Photo</Text>
                       ) : (
                       <Image style={styles.avatar} source={imageUrl} />
                       )}
                    </View>
                    </TouchableOpacity>
                 </View>

                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Page</Text>
                 { this.props.isLoading && <Loading /> }
                 
                 {this.props.chapters.map((item,index) =>(
                        <ListImage key={index} {...item} onDelete={this.handleDeleteImage} />
                  ))}
                 </View>

                 <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{padding:10,backgroundColor:PRIMARY_COLOR,width:'40%',borderRadius:3}}>
                     <TouchableOpacity onPress={()=> this.props.navigation.navigate('CreatePage',{episode_id : this.state.episode_id})}>
                     <Text style={{color:'white'}}> <Icon name="pluscircle" /> Page </Text>
                     </TouchableOpacity>
                  </View>
                  <View style={{padding:10,backgroundColor:'#f7be16',width:'40%',borderRadius:3}}>
                     <TouchableOpacity onPress={() => this.handleDelete()}>
                        <Text style={{color:'white'}}> <Icon name="closecircle" /> Episode </Text>
                     </TouchableOpacity>
                  </View>
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
         chapters : state.webtoon.chapters,
         isLoading : state.webtoon.isLoading
      }
   }
   const mapDispatchToProps = (dispatch) => {
      return {
         fetchEpisodes : (token,webtoon_id) => dispatch(fetchDataEpisode(token,webtoon_id)),
         fetchChapters : (user_id,token,episode_id) => dispatch(fetchDataChapter(user_id,token,episode_id))
      }
   }
   export default connect(mapStateToProps,mapDispatchToProps)(EditEpisode);


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
    
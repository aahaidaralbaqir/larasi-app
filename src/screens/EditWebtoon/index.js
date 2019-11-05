
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
import { baseURL } from '../../config/api'
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'
import {api, basePATH , headerOptions} from '../../config/api'
import { fetchDataMyWebtoon, fetchDataEpisode } from '../../config/redux/action'
import  Episode  from '../../components/Episode'
import  Loading  from '../../components/Loading'
import axios from 'axios'

class EditWebtoon extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         title : '',
         genre : '',
         dataImage : null,
         webtoon_id : null,
         image : 'https://image.shutterstock.com/z/stock-vector-no-image-vector-isolated-on-white-background-1481369594.jpg',
         loading : false
      }
      this.handleUpdate = this.handleUpdate.bind(this)
   }
   
   componentDidMount() {
      let id = this.props.navigation.getParam('id')
      let title = this.props.navigation.getParam('title')
      let genre = this.props.navigation.getParam('genre')
      let oldImage = this.props.navigation.getParam('image')
      this.setState({
         title,
         genre,
         webtoon_id : id,
         image : oldImage
      })

      this.props.navigation.setParams({'updateWebtoon' : this.handleUpdate})
      this.props.fetchEpisodes(this.props.currUser.token,id)
   }

   static navigationOptions = ({ navigation }) => {
      return {
         headerTitle : 'Edit Webtoon',
         headerStyle : {
           elevation : 0,
           borderBottomColor : BORDER_COLOR,
           borderWidth : BORDER_WIDTH
         },
         headerRight: <Icon name="check" style={{marginRight:30,fontSize:20,color:PRIMARY_COLOR}} onPress={navigation.getParam('updateWebtoon') }  />,
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

  handleUpdate = () => {
     
      let data = new FormData;
      let { token,user_id } = this.props.currUser
      data.append('title',this.state.title)
      data.append('genre',this.state.genre)
      data.append('image', this.state.dataImage)
      axios({
         method: 'PATCH',
         url: `${baseURL}/user/${user_id}/webtoon/${this.state.webtoon_id}`,
         data,
         headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
         },  
      })
      .then(result => {
         alert('Webtoon succesfully edited')
         setTimeout(() => {
            this.props.fetchMyWebtoon(token,user_id)
         },3000)
      })
      .catch(error => {

      })
 }

 handleDelete = () => {
    let { webtoon_id } = this.state
    let { user_id,token } = this.props.currUser
    api.delete(`/user/${user_id}/webtoon/${webtoon_id}`,headerOptions(token))
    .then(result => {
      alert('Webtoon has been deleted !!!')
      setTimeout(() => {
         this.props.fetchMyWebtoon(token,user_id)
         this.props.navigation.pop()
      },3000)
    }) 
    .catch(error => console.log(err)) 
 }

  render () {
     let imageUrl =  this.state.dataImage === null ? {uri : `${basePATH}/${this.state.image}`} : {uri : this.state.image}
     return (
           <ScrollView>
           <View style={{flex:1}}>
              <View style={{flex:4,padding:18}}>
                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Title</Text>
                 <Item regular>
                    <Input value={this.state.title} onChangeText={text => this.setState({title : text})} />
                 </Item>
                 </View>
  
                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10}}>Genre</Text>
                 <Item regular>
                    <Input value={this.state.genre} onChangeText={text => this.setState({genre : text})}  />
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
                       <Image style={styles.avatar} source={imageUrl} />
                       )}
                    </View>
                    </TouchableOpacity>
                 </View>

                 <View>
                 <Text style={{fontSize:TITLE_SIZE,marginBottom:10,marginTop:10}}>Episode(s)</Text>
                 { this.props.isLoading && <Loading /> }
                    {this.props.episodes.map((item,index) => (
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('EditEpisode',{webtoon_id : item.webtoon_id,title : item.title,image : item.image, id : item.id})}>
                       <Episode key={index} {...item} />
                     </TouchableOpacity>
                    ))}
                 </View>
                 <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{padding:10,backgroundColor:PRIMARY_COLOR,width:'40%',borderRadius:3}}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEpisode',{webtoon_id : this.props.navigation.getParam('id')})}>
                     <Text style={{color:'white'}}> <Icon name="pluscircle" /> Episode</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={{padding:10,backgroundColor:'#f7be16',width:'40%',borderRadius:3,marginRight:3}}>
                     <TouchableOpacity onPress={() => this.handleDelete()}>
                        <Text style={{color:'white'}}> <Icon name="closecircle" /> Webtoon </Text>
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
         episodes : state.webtoon.episodes,
         isLoading : state.webtoon.isLoading
      }
   }

   const mapDispatchToProps = (dispatch) => {
      return {
         fetchMyWebtoon : (token,user_id) => dispatch(fetchDataMyWebtoon(token,user_id)),
         fetchEpisodes : (token,webtoon_id) => dispatch(fetchDataEpisode(token,webtoon_id))
      }
   }


   export default connect(
      mapStateToProps,
      mapDispatchToProps
   )(EditWebtoon);

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
    
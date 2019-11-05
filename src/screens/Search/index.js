import React,{useState,useEffect} from 'react'
import  {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import {
    Item,
    Input
} from 'native-base'
import { BORDER_WIDTH,BORDER_COLOR,CONFIG,PRIMARY_COLOR } from '../../config/constant'
import axios from 'axios'
import Icon from 'react-native-vector-icons/AntDesign'
function Result({id,image,title,genre,navigation}) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail',{id,title,image,genre}) }>
      <View style={{flex:1,height:80,flexDirection:'row'}}>
      <View style={{flex:1.5}}>
        <Image
        source={{uri:image}}
        style={{width:'100%',height:'100%'}}
        />
      </View>
      <View style={{flex:5,padding:15,borderWidth:BORDER_WIDTH,borderColor:BORDER_COLOR}}>
        <Text style={{fontSize:16}}>{title}</Text>
        <Icon name="bells" style={{color:PRIMARY_COLOR,marginTop:10}}> {genre}</Icon>
      </View>
      </View>
      </TouchableOpacity>
    )
  }

function Search({navigation}) {
    const [query,setQuery] = useState('Title')
    const [data,setData] = useState([])
    
    useEffect(() => {
        function getFetchUrl() {
            return `${CONFIG.apiUrl}/webtoons?title=${query}`;
          }
      
          async function fetchData() {
            const result = await axios(getFetchUrl(),{ headers: {"Authorization" : `Bearer ${CONFIG.token._55}`} });
            let {data : {data}} = result
            setData(data)
        }
          fetchData();
    },[query])

    return (
        <View style={{flex:1}}>
            <View style={{height:70,flexDirection:'row',borderBottomWidth:BORDER_WIDTH,borderBottomColor:BORDER_COLOR}}>
                <View style={{flex:3}}>
                    <Item regular style={{marginTop:10,marginLeft:18}}>
                        <Input value={query} onChangeText={text => setQuery(text)} />
                    </Item>
                </View>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={ () => navigation.goBack(null)}>
                    <Text>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1}}>
                <FlatList
                    data={data}
                    renderItem={({item}) =>  <Result key={item.id} {...item} navigation={navigation} />}
                />
            </View>
        </View>
    )
}

export default Search;
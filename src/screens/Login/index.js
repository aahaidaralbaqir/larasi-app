import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { setCurUser } from '../../config/redux/action'
import {
    View,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import {
    Container,
    Text,
    Item,
    Input,
    Button,
    Icon
} from 'native-base'

import { validateEmail } from '../../helpers'

import { api } from '../../config/api'
import { setCurrUser } from '../../config/redux/action'
import AsyncStorage from '@react-native-community/async-storage';

function Login(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [visible,setVisible] = useState(false)
    const [active,setActive] = useState(true)


    const checkIsError = () => {
        if(validateEmail(email) === true && password.length >= 5) {
            setActive(false);
        }else{
            setActive(true);
          }
    }

    const handleSubmit = () => {
      api.post('/login',{ email , password })
      .then(res => {
          let data = {
              token : res.data.token,
              user_id : res.data.user_id,
              username : res.data.username
          }
          props.setCurrentUser(data)
          AsyncStorage.setItem('userData',JSON.stringify(data))
          props.navigation.navigate('ForYou')
      })
      .catch(err => {
        console.log(err)
      })
    }

    useEffect(() => {
        checkIsError();
    },[email,password]);


    const color = visible ? 'green' : 'silver';
    const visiblePassword = visible ? false : true;

    console.log(props)
    return (
        <Container>
           <View style={styles.loginContainer}>
                <View style={styles.loginText}>
                    <Text style={styles.loginTextTitle}>LOGIN</Text>
                    <Text style={{marginTop: 15}}>
                        Login With Your Account <Text style={{color : 'green',fontWeight:'bold'}}>WEEBTOON</Text>
                    </Text>
                </View>
                <View style={styles.loginFormGroup}>
                    <View>
                        <Text style={{marginBottom : 14}}>Email</Text>
                        <Item regular>
                            <Input
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </Item>
                    </View>
                    <View>
                        <Text style={{marginBottom : 14,marginTop:14}}>Password</Text>
                        <Item regular>
                            <Input
                                secureTextEntry={visiblePassword}
                                value={password}
                                onChangeText={text => setPassword(text)}
                             />
                            <Icon name="eye" style={{color:color}} onPress={() => setVisible(!visible)} />
                        </Item>
                    </View>
                    <View style={{marginTop: 30}}>
                        <Button
                            full
                            success
                            disabled={active}
                            onPress={handleSubmit}
                        >
                            <Text>LOGIN</Text>
                        </Button>
                    </View>
                </View>
           </View>
        </Container>
    )
}

const mapDispatchProps = (dispatch) => {
  return {
    setCurrentUser : (objUser) => dispatch(setCurUser(objUser))
  }
}

export default connect(null,mapDispatchProps)(Login)

const styles = StyleSheet.create({
   loginContainer : {
       flex : 1,
    },
   loginContainer : {
     flex : 1
   },
   loginText : {
     alignItems : 'center',
     height : 200,
     flex: 1,
     justifyContent : 'center',
     marginTop : 40
   },
   loginTextTitle : {
       fontSize: 30,
   },
   loginFormGroup : {
        flex : 2,
        paddingHorizontal : 40
   }
});

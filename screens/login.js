import React from 'react';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import MenuButton from '../components/MenuButton'
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import {AsyncStorage} from 'react-native';
import Config from '../config'

 let config = new Config()


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    

    };
  }



  onClickListener = () =>  {
    Alert.alert("Alert", "Button pressed ");
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
      
      <Card style={styles.card}>
      <View style={styles.mainBody}>


      <View style={styles.inputContainer}>
       <Icon name="account-circle" color="#3498DB" size={30} style={styles.inputIcon} />
      
      <TextInput style={styles.inputs}
      ref={(input)=>{this.email=input}}
      placeholder="UserName"
      keyboardType="email-address"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({email: text})}/>
      </View>

      <View style={styles.inputContainer}>
      <Icon name="vpn-lock" color="#3498DB" size={30} style={styles.inputIcon} />
      <TextInput style={styles.inputs}
      ref={(input)=>{this.password=input}}
      placeholder="Password"
      secureTextEntry={true}
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({password: text})}/>
      </View>
      
      <View style={styles.inputContainer}>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.login(this.state.email, this.state.password, this.email.clear(),this.password.clear())}>
      <Text style={styles.signUpText}>Log in</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}  onPress={() => navigate('Register')}>
      <Text style={styles.signUpText}>Register</Text>
      </TouchableHighlight>

      </View>

      </View>
      </Card>
      </View>

      );
  }
}

function mapStateToProps(state) {
  return {
    email: state.email,
    password:state.password
  }
}

function mapDispatchToProps(dispatch,onProps) {

  return{
    login:(email,password)=>{   
      var body={email: email , password: password}
      console.log("url----------",config.getBaseUrl());
      axios.post(config.getBaseUrl()+"user/login",body).then(res=>{

        dispatch({ type: 'LOGIN', payload:[body, res.data.data._id, res.data.data.name, res.data.data.tasks, res.data.data.userRole, res.data.data.profilePhoto, res.data.data.phone, res.data.data.experience]})
        _storeData(res.data.data._id);
        Toast.show('successfully Login.');
        onProps.navigation.navigate('DrawerNavigator',)
      },err=>{
        console.log({err: err});
      }).catch(function(error){
        console.log(error);
      })
    }
  }
}
 _storeData = async (email) => {
    try {
      await AsyncStorage.setItem('email',email);
    } catch (error) {
        console.log(error);
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  mainBody: {
    justifyContent: 'center',
    alignItems: 'center',   
    marginTop:50
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',

  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#372e5f",
    marginLeft:-25
  },
  signupButton:{
    backgroundColor: "#372e5f",
    marginLeft:10
  },
  signUpText: {
    color: 'white',
  },
  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:40
  },
  card:{
    elevation:5,
    backgroundColor: 'white',
    marginLeft:5,
    marginRight:5
  }
});
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
import MenuButton from '../components/MenuButton'
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';
import Icon from "react-native-vector-icons/MaterialIcons";
import Config from '../config'

 let config = new Config()



class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name:'',
      last_name:'',
    };

  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
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
      placeholder="First name"
      keyboardType="email-address"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({first_name: text})}/>
      </View>

      <View style={styles.inputContainer}>
      <Icon name="account-circle" color="#3498DB" size={30} style={styles.inputIcon} />
      <TextInput style={styles.inputs}
      placeholder="Last name"
      keyboardType="email-address"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({last_name: text})}/>
      </View>

      <View style={styles.inputContainer}>
      <Icon name="email" color="#3498DB" size={30} style={styles.inputIcon} />
      <TextInput style={styles.inputs}
      placeholder="UserName"
      keyboardType="email-address"
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({email: text})}/>
      </View>

      <View style={styles.inputContainer}>
      <Icon name="vpn-lock" color="#3498DB" size={30} style={styles.inputIcon} />
      <TextInput style={styles.inputs}
      placeholder="Password"
      secureTextEntry={true}
      underlineColorAndroid='transparent'
      onChangeText={(text)=>this.setState({password: text})}/>
      </View>

      <View style={styles.inputContainer}>
      <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.ragister(this.state)}>
      <Text style={styles.signUpText}>Sign up</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}  onPress={() => navigate('Login')}>
      <Text style={styles.signUpText}>Log in</Text>
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
    first_name: state.first_name,
    last_name: state.last_name,
    password:state.password
  }
}
function mapDispatchToProps(dispatch,onProps) {

  return{
    ragister:(text)=>{
      
      var body={first_name:text.first_name,last_name:text.last_name,email: text.email, password: text.password}
      console.log(body);
      axios.post(config.getBaseUrl()+"user/signup",body).then(res=>{
        dispatch({ type: 'REGISTER', payload:body })
        Toast.show('successfully Registration.');
        onProps.navigation.navigate('Login')
      },err=>{
        console.log({err: err});
      })

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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
    justifyContent: 'center'
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
  signupButton: {
    backgroundColor: "#372e5f",
    marginLeft:-25
  },
  loginButton:{
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
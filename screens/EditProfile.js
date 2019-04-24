import React from 'react';
import { StyleSheet, Text, View , Image, Button, TouchableHighlight, TextInput,ScrollView, alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import MenuButton from '../components/MenuButton'
import axios from 'axios'
import Toast from 'react-native-simple-toast';
import {AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import RNFetchBlob from 'react-native-fetch-blob';
import { EventRegister } from 'react-native-event-listeners'

import Config from '../config'

let config = new Config()

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      name:'',
      email:'',
      phone:'',
      experience:'',
      userRole:'',
      profilePhoto: null,
      data:[],
      id:[],
      imageURL: '',
      profilePhotoName: "",
      joiningDate:''
    };
  }

  handleUploadImage = () => {
    console.log("edit",this.state.profilePhoto);
    RNFetchBlob.fetch('PUT', config.getBaseUrl()+"user/change-profile/"+this.state.id, {
      'Content-Type' : 'multipart/form-data',
    }, [
    {
      name : 'profilePhoto',
      filename : this.state.profilePhotoName,
      data: RNFetchBlob.wrap(this.state.profilePhoto)
    }
    ]).then((resp) => {
      var res = JSON.parse(resp.data);
      this.storeImg(res.profilePhoto);
     
    }).catch((err) => {
      console.log(err);
    })
  };
   storeImg = async(res)=> {
    try {
   
      await AsyncStorage.setItem('Img',res);
    } catch (error) {
        console.log("ERRORRRRRRRRRRRRRRRRRr",error);
    }
  }
  componentDidMount= async()=>{
    let value = await  AsyncStorage.getItem('email'); 
    this.setState(prevState =>({
      id: [...prevState.id, value]
    }))
    fetch(config.getBaseUrl()+'user/get-user-by-id/'+value).
    then((Response)=>Response.json()).
    then((findresponse,err)=>
    {
    
      this.setState(prevState =>({
        data: [...prevState.data, findresponse]
      }))
     
      this.setState({
        profilePhoto: findresponse.profilePhoto ? config.getMediaUrl() + findresponse.profilePhoto : config.getMediaUrl() + 'avataricon.png'
      });
     


    })
  }


  profilePic(data){
 
    
    let img1 = {uri: this.state.profilePhoto}
    
    
    return(
      <View>
      <Image style={styles.img} source={img1} />
      <TouchableHighlight style={[styles.buttonContainer,styles.ChoosePhotoButton]} onPress={this.pickImage}>
      <Text style={styles.ChoosePhotoText}>Choose Photo</Text>
      </TouchableHighlight>
      </View>
      )

  }
  render() {

    const {navigate} = this.props.navigation;
    let { image } = this.state;

    return (

      <ScrollView
      stickyHeaderIndices={[0]}>
      
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Edit Profile</Text>
      </Header>
      </View>

      <View style={{zIndex:-1}}>


      {
        this.state.data.map((data)=>
          <View>
          <View style={styles.profilePic}>
          {this.profilePic(data)}
          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="account-circle" color="#3498DB" size={30} style={styles.inputIcon}  />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Name</Text>
          <TextInput
          style={{marginBottom:15}}
          autoFocus={true}
          placeholder={data.name}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({name:newValue})}/>
          </View>

          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="email" color="#3498DB" size={30} style={styles.inputIcon} />

          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Email</Text>
          <TextInput
          style={{marginBottom:15}}
          placeholder={data.email}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({email:newValue})}/>
          </View>

          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="info" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>About</Text>
          <TextInput
          style={{marginBottom:15}}
          placeholder={data.userRole}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({userRole:newValue})}/>
          </View>
          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="call" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Phone</Text>
          <TextInput
          style={{marginBottom:15}}
          placeholder={data.phone}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({phone:newValue})}/>
          </View>

          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="work" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Experience</Text>
          <TextInput
          style={{marginBottom:15}}
          placeholder={data.experience}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({experience:newValue})}/>
          </View>

          </View>

           <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="today" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Joining Date</Text>
          <TextInput
          style={{marginBottom:15}}
          placeholder={data.joiningDate}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({joiningDate:newValue})}/>
          </View>

          </View>
          <View style={styles.inputContainer1}>
          <TouchableHighlight style={[styles.buttonContainer, styles.savechangebtn]} onPress={() => this.props.edit(this.state.email, this.state.name, this.state.phone, this.state.userRole,this.state.id ,this.state.experience, this.state.joiningDate)}>
          <Text style={styles.signUpText}>Save Changes</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.canclebtn]}  onPress={() => navigate('ProfileScreen')}>
          <Text style={styles.signUpText}>Cancle</Text>
          </TouchableHighlight>
          </View>
          </View>
          )
      }

      </View>
      </ScrollView>
      
      );
}
pickImage = async () => {
  ImagePicker.launchImageLibrary(options, (response) => {
  

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } 
    else {
      const source = { uri: response.uri }
     
      this.setState({ profilePhoto: response.uri, profilePhotoName : response.fileName });
      this.handleUploadImage()
    }
  });


};
}

function mapDispatchToProps(dispatch, onProps) {
  return{
    edit:(email,name,phone,userRole, id,experience,joiningDate)=>{   
      var body={email: email , name: name,phone:phone, userRole:userRole , experience:experience ,joiningDate:joiningDate}
      axios.put(config.getBaseUrl()+"user/update-details/"+id,body).then(res=>{
        _storeData(res);
        console.log("updated");
    
       EventRegister.emit('res', res)
     


        dispatch({ type: 'EDIT', payload:body})

        Toast.show('Updated Profile');

      },err=>{
        console.log({err: err});
      }).catch(function(error){
        console.log(error);
      })
    }
  }
}
 async function _storeData(res) {
    try {
   
      await AsyncStorage.setItem('currentUser',JSON.stringify(res));
    } catch (error) {
       

    }
  }
export default connect( mapDispatchToProps)(EditProfile);
const options = {
  allowsEditing: true,
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: '',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:10
  },
  img: {
    height: 170,
    width: 170,
    borderRadius: 100,
    alignItems: 'center',
  },
  inputIcon:{

    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:120,
    borderRadius:30,
  },
  ChoosePhotoText: {
    color: 'white',
  },
  ChoosePhotoButton: {
    backgroundColor: "#372e5f",
  },
  profilePic:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  textName:{
    color:'gray',
    marginTop:25
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    elevation:5,
    marginLeft:5,
    marginRight:5,
    borderRadius:30,
    borderBottomWidth: 1,
    height:55,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputContainer1:{
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    marginLeft:5,
    marginRight:5,
    height:55,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  savechangebtn: {
    backgroundColor: "#372e5f",
    marginLeft:40

  },
  canclebtn:{
    backgroundColor: "#372e5f",
    marginLeft:20


  },
  signUpText: {
    color: 'white',
  },
});


// onPress={this.pickImage}
import React from 'react';
import { StyleSheet, Text, View , Image, Button, TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'
// import { ImagePicker } from 'expo';
// import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import {AsyncStorage} from 'react-native';


import Config from '../config'

 let config = new Config()

class ProfileScreen extends React.Component {
  state = {

    result1:[],
    fetching: false,
    value:[],
    name:[],
    profilePhoto:[]

  };
  componentDidMount = async()=>{
    console.log("hello");
    this.retrieveItem().then((goals) => {
      console.log(goals)
      const value = goals;
      this.setState({result1: []})

      this.setState({fetching: true})
      fetch(config.getBaseUrl()+'user/get-user-by-id/'+value).
      then((Response)=>Response.json()).
      then((findresponse,err)=> {     
        console.log("pic---------",findresponse.profilePhoto);
        this.setState(prevState =>({
          result1: [...prevState.result1, findresponse]
        }))
         this.setState({
        profilePhoto: config.getMediaUrl()+findresponse.profilePhoto
      });
      }).then(()=>{
        this.setState({fetching: false})
      })
    }).catch((error) => {

    }); 
  }

  async retrieveItem() {
    try {
      const retrievedItem =  await AsyncStorage.getItem('email');
      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  profilePic(data){
     let img1 = data.profilePhoto && data.profilePhoto!="" ? {uri: this.state.profilePhoto} : require('../assets/avataricon.png')
   
      return(
        <View>
        <Image style={styles.img} source={img1} />
    
        </View>
        )

  }
  render() {
    console.log("yehhh",this.state.pic);
    let { image } = this.state;
    const {navigate} = this.props.navigation;
    return (
      <View >
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <View style={{flexDirection:'column',flex:10}}>
      <Text style={styles.text}>My Profile</Text>
      </View>
      <View style={{flexDirection:'column',flex:2}}>
      <Icon name="add" color="#fff" size={35} style={styles.icon} onPress={() => navigate('EditProfile')}/>
      </View>
      </Header>
      <View>
      {
        this.state.result1.map((data)=>
          <View>
          <View style={styles.profilePic}>
          {this.profilePic(data)}

          </View>
          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="account-circle" color="#3498DB" size={30} style={styles.inputIcon} />
          
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Name</Text>
          <Text>{data.name}</Text>
          </View>
          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="email" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>Email</Text>
          <Text>{data.email}</Text>
          </View>
          </View>

          <View style={styles.inputContainer}>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="info" color="#3498DB" size={30} style={styles.inputIcon} />
          </View>
          <View style={{flexDirection:'column',flex:10}}>
          <Text style={styles.textName}>About</Text>
          <Text>{data.userRole}</Text>
          </View>
          </View>

          </View>

          )
      }
      </View>
      </View>
      );
  }

}

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 70
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom:20,
    marginTop:20
  },
  inputIcon: {

    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 120,
    borderRadius: 30,
    marginTop: 5,
    zIndex: 5
  },
  ChoosePhotoText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChoosePhotoButton: {
    backgroundColor: "#372e5f",
  },
  profilePic: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  textName: {
    color: 'gray'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 55,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {

    marginLeft: 10,
    marginTop: 40
  }
});



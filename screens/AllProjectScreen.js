import React from 'react';
import { Picker,StyleSheet, Text, View, TextInput, ScrollView ,Button, TouchableHighlight, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from 'react-native-linear-gradient';
import PTRView from 'react-native-pull-to-refresh';
import {AsyncStorage} from 'react-native';
import Config from '../config'

 let config = new Config()

class AllProjectScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data : [],
      result1:[],      
      tasks:[] 

    }
  }
  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  componentDidMount= async()=>{

    let value = await  AsyncStorage.getItem('email');    
    fetch(config.getBaseUrl()+'project/all').
    then((Response)=>Response.json()).
    then((findresponse,err)=>
    {    
      for(let i=0;i<findresponse.length;i++){
        let k=findresponse[i].Teams.length
        for(let j=0;j<k;j++){
          if(findresponse[i].Teams[j]._id == value){
            
            this.setState(prevState =>({
              result1: [...prevState.result1, findresponse[i]]
            }))

            console.log("title----",findresponse[i].title);
          console.log(findresponse[i].title, "AVATAR=============================>",findresponse[i].avatar);
          }
        }
      }
    })
  }
  avatar(data){
    console.log("call");
    console.log(data.avatar);

    if(data.avatar== ''){
      console.log("if---");
      return(
           <Image style={styles.img} source={require('../assets/avataricon.png')}/>
        )
    }
    else{
      console.log("else---");
      console.log(config.getMediaUrl());
      return(
        <Image style={styles.img} source={{uri:config.getMediaUrl()+data.avatar}}/>
        )
    }
  }
  
  render() {

    const {navigation} = this.props;

    return (
      <PTRView onRefresh={this._refresh} >
      <ScrollView
      stickyHeaderIndices={[0]}>
      <View >
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>AllProject</Text>
      </Header>
      </View>     

      <View style={{zIndex:-1}}>

      {
        this.state.result1.map((data)=>

          <View >
          <LinearGradient
          colors={['#000066', '#00ffff']}
          style={styles.card}>

          <TouchableHighlight onPress={() => navigation.navigate('DisplayTasks',{title:data.title, _id:data._id})}>
         <View>
          <View style={styles.inputContainer}>
          <View style={{flex:10,flexDirection:'column'}}>
          <Text style={[styles.textProjectName,styles.titleProject]} >{data.title}</Text>
          </View>
          <View style={{flex:2,flexDirection:'column'}}>
          <Icon name="keyboard-arrow-right" size={30} color="#ccc" style={{marginRight:0,marginLeft:20}}
          onPress={() => navigation.navigate('EditProject',{_id:data._id, title:data.title, desc:data.desc, clientEmail:data.clientEmail, clientFullName:data.clientFullName, clientContactNo:data.clientContactNo, clientDesignation:data.clientDesignation})}/>
          </View>
          </View>
         
          <View  style={styles.imgView}>
          {this.avatar(data)}
          
          </View>

          <View style={styles.inputContainer}>
          <View style={{flex:6,flexDirection:'column'}}>
          <View style={{flex:6,flexDirection:'column'}}>
          <Text style={styles.textProjectName}>Tasks</Text>
          </View>
          <View style={{flex:6,flexDirection:'column'}}>
          <Text style={styles.textProjectName1}>{(data.tasks).length}</Text>
          </View>
          </View>
          <View style={{flex:6,flexDirection:'column'}}>
          <View style={{flex:6,flexDirection:'column'}}>

          <Text style={styles.textProjectName}>Issue</Text>
          </View>
          <View style={{flex:6,flexDirection:'column'}}>

          <Text style={styles.textProjectName1}>{(data.IssueId).length}</Text>
          </View>
          </View>
          <View style={{flex:6,flexDirection:'column'}}>
          <View style={{flex:6,flexDirection:'column'}}>

          <Text style={styles.textProjectName}>Bug</Text>
          </View>
          <View style={{flex:6,flexDirection:'column'}}>

          <Text style={styles.textProjectName1}>{(data.BugId).length}</Text>
          </View>
          </View>
          </View>
          </View>
           </TouchableHighlight>
          </LinearGradient>

          </View>
          )
      }
      </View>
      </ScrollView>
      </PTRView>
      );
  }
}



export default connect(mapStateToProps)(AllProjectScreen);

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
    marginTop:40
  },
  card:{
    marginTop:20,
    elevation:5,
    color:'white',
    marginLeft:5,
    marginRight:5, 
  },
  inputContainer: {
    padding:10,
    flexDirection: 'row',
    alignItems:'center'
  },
  textProjectName:{
    marginLeft:10,
    fontSize:20,
    color:'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  textProjectName1:{
    marginLeft:20,
    fontSize:20,
    color:'white',
    fontWeight: 'bold',
    width:25,
    height:25,
    backgroundColor:'#372e5f',
    borderRadius:5,
    borderBottomWidth: 1,
    alignItems: 'center',
    textAlign: 'center', 
     justifyContent: 'center',
  },
  inputContainer1: {
    backgroundColor: '#FFFFFF',
    padding:10,
    flexDirection: 'row',
    alignItems:'center'
  },
  imgView: {
    flex: 1,
    flexDirection:'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems:'center',
    justifyContent: 'center',

  },
  img: {
    height: 90,
    width: 90,
    borderRadius: 50,
    alignItems:'center',
    justifyContent: 'center',
    elevation:5
  },
  titleProject:{
    textAlign:'center',
    alignItems:'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color:'white',
    marginLeft:20
  }
});




import React from 'react';
import { Picker,StyleSheet, Text, View, TextInput, ScrollView ,Button, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from 'react-native-linear-gradient';
import PTRView from 'react-native-pull-to-refresh';
import {AsyncStorage} from 'react-native';
import Config from '../config'
import * as _ from 'lodash';
let config = new Config()

class AllProjectScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data : [],
      result1:[],      
      tasks:[] ,
      inprogress:[],
      status:[],
      assignTo:[]

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
        var taskLength = _.filter(findresponse[i].tasks, (task)=>{ return task.status == 'in progress' }).length
        findresponse[i]['inProgressCount'] = taskLength;
        for(let j=0;j<k;j++){
          if(findresponse[i].Teams[j]._id == value){

            this.setState(prevState =>({
              result1: [...prevState.result1, findresponse[i]]
            }))
            // this.setState(prevState =>({
            //   assignTo: [...prevState.assignTo, findresponse[i].Teams[j].name]
            // }))
            console.log("====ID=---=-----------------------........................",findresponse[i]._id);
          }
          // console.log(findresponse[i].title,'members=><>>>>>>>>>>>>>>>>>>>>>>.',findresponse[i].Teams[j].name);
           // console.log(findresponse[i].title,"team-=-=-===-=-=-=-=-=-..-.-..-.-.-.-",findresponse[i].Teams[j].name);

        }

      }
    })
  }


  avatar(data){
   // console.log("call");
    console.log(data.avatar);

    if(data.avatar== ''){
     // console.log("if---");
      return(
        <Image style={styles.img} source={require('../assets/rose1.jpeg')}/>
        )
    }
    else{
      //console.log("else---");
      //console.log(config.getMediaUrl());
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
      <Header style={{ backgroundColor: '#4b415a',height:50}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>AllProject</Text>
      </Header>
      </View>     

      <View style={{zIndex:-1}}>

      {
        this.state.result1.map((data)=>

          <View>
          <LinearGradient
          colors={['#fff', '#fff']}
          style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('DisplayTasks',{title:data.title, _id:data._id})}>
          <View>

          <View style={{flexDirection:'row'}}>
          <View  style={styles.imgView}>
          {this.avatar(data)} 
          </View>



          <View style={{flexDirection:'column',flex:8}}>

          <View style={styles.inputContainer}>
          <View style={{flex:10,flexDirection:'column'}}>
          <Text style={[styles.textProjectName,styles.titleProject]} >{data.title}</Text>
          <Text style={[styles.descProject]} >{data.desc}</Text>
          </View>
          <View style={{flex:2,flexDirection:'column',marginTop:50}}>
          <Icon name="keyboard-arrow-right" size={30} color="#000000" 
          onPress={() => navigation.navigate('EditProject',{_id:data._id, title:data.title, desc:data.desc, clientEmail:data.clientEmail, clientFullName:data.clientFullName, clientContactNo:data.clientContactNo, clientDesignation:data.clientDesignation})}/>
          </View>
          </View>

          </View>

          </View>

          <View style={{flexDirection:'row', alignItems: 'center',justifyContent: 'center', flex: 1,marginBottom:5}}>
            <Image style={{width:25,height:25, borderRadius: 50,marginRight:5}} source={require('../assets/inprogress.png')}/>
          <Text style={{ color:'green',fontSize:20,marginRight:5}}>In Progress:</Text>
          
          <Text style={{fontSize:20}}>{data.inProgressCount}</Text>

          </View>
          </View>

          </TouchableOpacity>
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
    marginTop:10
  },
  card:{
    marginTop:20,
    elevation:5,
    color:'white',
    marginLeft:5,
    marginRight:5, 
    backgroundColor:'#ddd',
    borderLeftColor:'#4b415a',
     borderLeftWidth: 3,
     borderBottomColor:'#ddd',
     borderBottomWidth: 2,
  },
  inputContainer: {
    padding:10,
    flexDirection: 'row',
    alignItems:'center'
  },
  textProjectName:{
    // marginLeft:10,
    fontSize:20,
    color:'black',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    flexDirection:'column',
    flex:4,
    margin:10


  },
  img: {
    height: 70,
    width: 70,
    margin:10
  },
  titleProject:{
    // textAlign:'center',
    // alignItems:'center',
    // justifyContent: 'center',
    fontWeight: 'bold',
    color:'black',
    // marginLeft:20
  },
  descProject:{
    fontSize:16,
    color:'black',

  }
});


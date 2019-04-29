import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions, Animated, TouchableOpacity ,ScrollView} from 'react-native';
import MenuButton from '../components/MenuButton'
import { Header } from 'native-base';
import {AsyncStorage} from 'react-native';
import Config from '../config'
import Icon from "react-native-vector-icons/MaterialIcons";
import HTMLView from 'react-native-htmlview'

let priority1='';
let config = new Config()

export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
    
      

    }
  }
  async componentDidMount(){

    let value = await  AsyncStorage.getItem('email');
  
    console.log(value);    
    fetch(config.getBaseUrl()+'sendNotification/get-notification-By-Id/'+value).
    then((Response)=>Response.json()).
    then((findresponse,err)=>
    { 
      for(let i=0;i<findresponse.length;i++){
        //console.log("in notification screen====",findresponse[i].type); 
        this.setState(prevState =>({
          data: [...prevState.data, findresponse[i]]
        }))
      

    // let splitfunction = findresponse[i].createdAt.split('T')[0]
    // console.log("=================================================",splitfunction);
    // this.setState({newDate: splitfunction})
      }
    }).catch((error) => {
      console.log("Errorrrrrrrrrrrr",error);
    })

  }

  bordershow(data){

    if(data.priority==4){

      return priority1='orange';
    }
    else if(data.priority==3){
      return priority1='yellow';
    }
    else if(data.priority==2){
      return priority1='red';    
    }
    else if(data.priority==1){
      return priority1='blue'
    }
    else {
      return priority1='blue';
    }

  }
  myFunction(data){

    
    if(data.type == 'leaveAccepted'){
       let a =data.createdAt
     let split = a.split('T')[0]
   //   console.log(split);
   // const regex = data.content.replace(/<[^>]*>/g, '');
  
      return(
     
        <View style={styles.LeaveCard}>
        <View style={{flexDirection:'row'}}>
        <Icon name="thumb-up"  size={30} style={styles.leaveAccepted}  />
        <Text style={{color:'green',marginLeft:5}}>Leave</Text>
        <Text style={{color:'gray',marginLeft:170}}>{split}</Text>
        </View>

        <View style={{flexDirection:'row'}}>

         <HTMLView value={data.content} style={styles.content} />
        </View>
        </View>
       
        )
    }
    else if(data.type == 'leaveRejected'){
       let a =data.createdAt
     let split = a.split('T')[0]
     console.log(split);

      return(

        <View style={styles.LeaveCard}>
        <View style={{flexDirection:'row'}}>
        <Icon name="thumb-down"  size={30} style={styles.leaveRejected}  />
        <Text style={{color:'#008a00',marginLeft:5}}>Leave</Text>
           <Text style={{color:'gray',marginLeft:170}}>{split}</Text>
        </View>

        <View style={{flexDirection:'row'}}>

       <HTMLView value={data.content} style={styles.content} />
        </View>
        </View>
        
        )

    }
    else if(data.type == 'task'){
     let a =data.createdAt
     let split = a.split('T')[0]
     console.log(split);

   
      return(

        <View style={styles.taskscard}>
        <View style={{flexDirection:'row'}}>
         <View style={{width:20,height:20, borderRadius: 50,  borderWidth: 2, borderColor: this.bordershow(data)}} ></View>
        <Text style={{color:'#256dde',marginLeft:5}}>Task</Text>
        <Text style={{color:'gray',marginLeft:170}}>{split}</Text>
        </View>

        <View>
        <HTMLView value={data.content} style={styles.content} />

     
        </View>
        </View>
        )
    }
    else if(data.type == 'comment'){
     let a =data.createdAt
     let split = a.split('T')[0]
     console.log(split);

   
      return(

        <View style={styles.taskscard}>
        <View style={{flexDirection:'row'}}>
         <View style={{width:20,height:20, borderRadius: 50,  borderWidth: 2, borderColor: this.bordershow(data)}} ></View>
        <Text style={{color:'#256dde',marginLeft:5}}>Task</Text>
        <Text style={{color:'gray',marginLeft:170}}>{split}</Text>
        </View>

        <View>
        <HTMLView value={data.content} style={styles.content} />

     
        </View>
        </View>
        )
    }
    else{

    // let a = data.createdAt
    //  let split = a.split('T')[0]
    //  console.log(split);

  
       const regex = data.content.replace(/<[^>]*>/g, '');

      return(
        <View style={styles.othercard}>
        <View style={{flexDirection:'row'}}>
        <Icon name="notifications"  size={30} style={styles.other}  />
        <Text style={{color:'#76008a'}}>Other</Text>
             
      
        </View>

        <View style={{flexDirection:'row'}}>

        <HTMLView value={data.content} style={styles.content} />
        </View>
        </View>
        )
    }
  }


  render() {
    return(
      <ScrollView
      stickyHeaderIndices={[0]}>

      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Notifications</Text>
      </Header>
      </View>
      <View style={{zIndex:-1}}>
      {
        this.state.data.map((data)=>

          <View>
          {this.myFunction(data)}
          </View>

          )
      }
      </View>
      </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:10
  },

 
  LeaveCard:{
    marginLeft:15,
    marginTop:10,
    marginRight:15,
    elevation:5,
    backgroundColor:'#fff',
    padding:10,
    borderLeftColor:'#9ecea1',
    borderBottomColor:'#4caf50',
    borderLeftWidth: 5,
    borderBottomWidth: 2,
  },
  taskscard:{
    marginLeft:15,
    marginTop:10,
    marginRight:15,
    elevation:5,
    backgroundColor:'#fff',
    padding:10,
    borderLeftColor:'#8bc1f1',
    borderBottomColor:'#2196f3',
    borderLeftWidth: 5,
        borderBottomWidth: 2,
  },
  othercard:{
    marginLeft:15,
    marginTop:10,
    marginRight:15,
    elevation:5,
    backgroundColor:'#fff',
    padding:10,
    borderLeftColor:'#c58fd0',
    borderBottomColor:'#9c27b0',
    borderLeftWidth: 5,
    borderBottomWidth: 2,
  },
  tasksciercle:{
    width:30,
    height:30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  inputIcon:{

    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',
    
  },
  other:{
    width:30,
    height:30,

    color: 'purple',
  },
  leaveAccepted:{
    width:30,
    height:30,

    color: 'green',

  },
  leaveRejected:{
    width:30,
    height:30,
    
    color: 'red',
  },
  content:{
    color:'black',
   


  }

});
// Icon name="fiber-manual-record"  size={30} 
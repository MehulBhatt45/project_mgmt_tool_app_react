import React from 'react';
import { StyleSheet, Text, View ,ScrollView, Picker,TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import PTRView from 'react-native-pull-to-refresh';
import {AsyncStorage} from 'react-native';
import Config from '../config'
import Icon from "react-native-vector-icons/MaterialIcons";
import { EventRegister } from 'react-native-event-listeners'
let config = new Config()
let priority;
let priority1='';

class DisplayTasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [],
      modalVisible: false,
      todo:[],
      inprogress:[],
      testing:[],
      done:[],
      tasksValue:[],
      priorityset:[],
      finalData:[],
      profilepic:[],
      assignToTask:[],
      ProjectId:[]

    }
     this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.getDate()
      
      });

  }

async getDate(){
    try {
      const value = await AsyncStorage.getItem('updateddata');
      if (value !== null) { 
        var data = JSON.parse(value);
      console.log("update ttask=======================",data);
      if(data.status == 'in progress'){
        this.setState({inprogress:[data]})
        console.log("inprogress==========",this.state.inprogress);
      }else if(data.status == 'to do'){
        this.setState({todo:[data]})
         console.log("inprogress==========",this.state.todo);
      
      }else if(data.status == 'testing'){
        this.setState({testing:[data]})
          console.log("inprogress==========",this.state.testing);
      }else{
        this.setState({done:[data]})
             console.log("inprogress==========",this.state.done);
      }


      if(data.priority  == 4){
        data.priority="High";
        this.setState({priorityset:data.priority})
      }else if(data.priority  == 3){
        data.priority="Medium";
        this.setState({priorityset:data.priority})
      }else if(data.priority  == 2){
        data.priority="Highest";
        this.setState({priorityset:data.priority})
      }else if(data.priority  == 1){
        data.priority="low";
        this.setState({priorityset:data.priority})
      }
    }

    } catch (error) {
      console.log(error);
    }
  }   

 


  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentWillMount = async()=>{

    let value = await  AsyncStorage.getItem('email'); 

this.setState({ProjectId:this.props.navigation.state.params._id})
console.log("project id",this.state.ProjectId);
    fetch(config.getBaseUrl()+'tasks/get-task-by-id/'+this.state.ProjectId).
    then((Response)=>Response.json()).
    then((findresponse,err)=> {     
      for(let i=0;i<findresponse.length;i++){

            if(findresponse[i].assignTo._id == value){

              this.setState(prevState =>({
                data: [...prevState.data,findresponse[i].assignTo.tasks]
              }))   


              this.setState(prevState =>({
                finalData: [...prevState.finalData,findresponse[i].priority]
              }))  
              console.log("finalData",findresponse[i].priority);
              this.setState(prevState =>({
                profilepic: [...prevState.profilepic,findresponse[i].assignTo.profilePhoto]
              })) 
              
          
              if(findresponse[i].status == "to do"){
                console.log("==========")
                this.setState(prevState =>({
                  todo: [...prevState.todo, findresponse[i]]
                }))
              }else if(findresponse[i].status == "in progress"){
                this.setState(prevState =>({
                  inprogress: [...prevState.inprogress, findresponse[i]]
                }))
                console.log("==========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..",this.state.inprogress.length)
              }else if(findresponse[i].status == "testing"){
                console.log("==========")
                this.setState(prevState =>({
                  testing: [...prevState.testing, findresponse[i]]
                }))
              }else{
               console.log("==========")
                this.setState(prevState =>({
                  done: [...prevState.done, findresponse[i]]
                }))
              }
              //  console.log("state==",this.state.finalData);

              if(this.state.finalData==4){

                this.state.finalData="High";

                this.setState(prevState =>({
                  priorityset: [...prevState.priorityset, this.state.finalData]
                }))
                console.log("high--",this.state.priorityset);

              }else if(this.state.finalData==3){

                this.state.finalData="Medium";

                this.setState(prevState =>({
                  priorityset: [...prevState.priorityset, this.state.finalData]
                }))
                console.log("Medium--",this.state.priorityset);

              }else if(this.state.finalData==2){

                this.state.finalData="Highest";

                this.setState(prevState =>({
                  priorityset: [...prevState.priorityset, this.state.finalData]
                }))
                console.log("Highest--",this.state.priorityset);


              }else if(this.state.finalData==1){
                this.state.finalData="low";

                this.setState(prevState =>({
                  priorityset: [...prevState.priorityset, this.state.finalData]
                }))
                console.log("low--",this.state.priorityset);

              }
            }
          
    




      }
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
  pickerFunction(){
    // console.log("DATA======================================>", this.state.profilepic);
    const {navigation} = this.props;
    if(this.state.tasksValue=="to do"){

      return(
        this.state.todo.map((data)=>
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset, projectId: data.projectId, profilepic:data.assignTo.profilePhoto})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>
          <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column',flex:8}}>
          <Text style={styles.texttitle}>Title:</Text>
          </View>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="add" color="#000" size={20} style={styles.icon} onPress={() => navigation.navigate('EditTasks',{data:JSON.stringify(this.state.todo),_id:data._id,projectId: data.projectId})}/>
          </View>
          </View>
          <Text style={styles.textProjectName}>{data.title}</Text>

          <Text style={styles.texttitle}>Description:</Text>
          <Text style={styles.textProjectName}>{data.desc}</Text>

          </View>
          </TouchableHighlight>
          )
        )
    } 
    else if(this.state.tasksValue=="in progress"){
      return(
        this.state.inprogress.map((data)=>
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset,projectId: data.projectId, profilepic:data.assignTo.profilePhoto})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

            <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column',flex:8}}>
          <Text style={styles.texttitle}>Title:</Text>
          </View>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="add" color="#000" size={20} style={styles.icon} onPress={() => navigation.navigate('EditTasks',{data:JSON.stringify(this.state.inprogress),_id:data._id,projectId: data.projectId})}/>
          </View>
          </View>
          <Text style={styles.textProjectName}>{data.title}</Text>

          <Text style={styles.texttitle}>Description:</Text>
          <Text style={styles.textProjectName}>{data.desc}</Text>

          </View>
          </TouchableHighlight>
          )
        )
    }
    else if(this.state.tasksValue == "testing"){
      return(
        this.state.testing.map((data)=>
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset, projectId: data.projectId , profilepic:data.assignTo.profilePhoto})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

            <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column',flex:8}}>
          <Text style={styles.texttitle}>Title:</Text>
          </View>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="add" color="#000" size={20} style={styles.icon} onPress={() => navigation.navigate('EditTasks',{data:JSON.stringify(this.state.testing),_id:data._id,projectId: data.projectId})}/>
          </View>
          </View>
          <Text style={styles.textProjectName}>{data.title}</Text>

          <Text style={styles.texttitle}>Description:</Text>
          <Text style={styles.textProjectName}>{data.desc}</Text>

          </View>
          </TouchableHighlight>
          )
        )
    }
    else if(this.state.tasksValue == "complete"){
      return(
        this.state.done.map((data)=>
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset, projectId: data.projectId , profilepic:data.assignTo.profilePhoto})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

            <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column',flex:8}}>
          <Text style={styles.texttitle}>Title:</Text>
          </View>
          <View style={{flexDirection:'column',flex:2}}>
          <Icon name="add" color="#000" size={20} style={styles.icon} onPress={() => navigation.navigate('EditTasks',{data:JSON.stringify(this.state.done),_id:data._id,projectId: data.projectId})}/>
          </View>
          </View>
          <Text style={styles.textProjectName}>{data.title}</Text>

          <Text style={styles.texttitle}>Description:</Text>
          <Text style={styles.textProjectName}>{data.desc}</Text>

          </View>
          </TouchableHighlight>
          )
        )
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (

      <ScrollView
      stickyHeaderIndices={[0]}>
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}> 
      <Text style={styles.text}>{this.props.navigation.state.params.title}</Text>
      </Header>
      </View>
      <View style={{zIndex:-1}}> 
      <LinearGradient
      colors={['#000066', '#00ffff']}
      style={{elevation:5,marginTop:5,marginLeft:5,marginRight:5,backgroundColor: '#ccc'}}>
      <Picker
      selectedValue={this.state.tasksValue}
      style={{height: 50, color:'white'}}
      onValueChange={(itemValue, itemIndex) =>
        this.setState({tasksValue: itemValue}) }>
        <Picker.Item label="To Do" value="to do"/>
        <Picker.Item label="In Progress" value="in progress" />
        <Picker.Item label="Testing" value="testing" />
        <Picker.Item label="Complete" value="complete" />
        </Picker>
        </LinearGradient>
        </View>
        <View style={{zIndex:-1}}>
        {this.pickerFunction()}
        </View>
        </ScrollView>

        );
  }
}
mapStateToProps = (state) => {
  return{
    _id:state._id,
    title:state.title
  }
}
export default connect(mapStateToProps)(DisplayTasks);
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
  
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    width:250,
    padding:10,
    flexDirection: 'row',
    alignItems:'center'
  },
  textProjectName:{
    marginLeft:5,
    fontSize:15,
    color:'black',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'justify',
    padding:5

  },
  texttitle:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:5
  },
  icon: {

    marginLeft: 10,
    marginTop: 10
  }
});


// 192.168.43.49:
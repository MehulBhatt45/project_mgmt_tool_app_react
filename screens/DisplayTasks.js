import React from 'react';
import { StyleSheet, Text, View ,ScrollView, Picker,TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import PTRView from 'react-native-pull-to-refresh';
import {AsyncStorage} from 'react-native';
import Config from '../config'

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
      finalData:[]
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


    fetch(config.getBaseUrl()+'project/all').
    then((Response)=>Response.json()).
    then((findresponse,err)=> {     
      for(let i=0;i<findresponse.length;i++){


        if(findresponse[i]._id == this.props.navigation.state.params._id){

          for(let j=0;j<findresponse[i].tasks.length;j++){ 

            console.log("in display task------------------",findresponse[i].tasks[j].comment)
            if(findresponse[i].tasks[j].assignTo._id == value){


              this.setState(prevState =>({
                data: [...prevState.data,findresponse[i].tasks[j]]
              }))   


              this.setState(prevState =>({
                finalData: [...prevState.finalData,findresponse[i].tasks[j].priority]
              }))  
              
              if(findresponse[i].tasks[j].status == "to do"){
                console.log("==========")
                this.setState(prevState =>({
                  todo: [...prevState.todo, findresponse[i].tasks[j]]
                }))
              }else if(findresponse[i].tasks[j].status == "in progress"){
                console.log("==========")
                this.setState(prevState =>({
                  inprogress: [...prevState.inprogress, findresponse[i].tasks[j]]
                }))
              }else if(findresponse[i].tasks[j].status == "testing"){
                console.log("==========")
                this.setState(prevState =>({
                  testing: [...prevState.testing, findresponse[i].tasks[j]]
                }))
              }else{
                                console.log("==========")
                this.setState(prevState =>({
                  done: [...prevState.done, findresponse[i].tasks[j]]
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
    // console.log("DATA======================================>", data);
    const {navigation} = this.props;
    if(this.state.tasksValue=="to do"){
      return(
        this.state.todo.map((data)=>
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset, projectId: data.projectId})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

          <Text style={styles.texttitle}>Title:</Text>
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
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

          <Text style={styles.texttitle}>Title:</Text>
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
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

          <Text style={styles.texttitle}>Title:</Text>
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
          <TouchableHighlight onPress={() => navigation.navigate('Model',{_id:data._id,title:data.title,desc:data.desc,createdBy:data.assignTo.name,createdAt:data.createdAt,status:data.status, assignTo:data.assignTo.name, priorityset:this.state.priorityset})}>
          <View style={{borderLeftColor:this.bordershow(data), borderLeftWidth: 5,marginTop:20, elevation:5,backgroundColor: 'white', marginLeft:5, marginRight:5,padding:5,color:'#372e5f'}}>

          <Text style={styles.texttitle}>Title:</Text>
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
  }
});
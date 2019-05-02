import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions, Animated, TouchableOpacity, ScrollView, TextInput , Picker, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import Config from '../config'
import MenuButton from '../components/MenuButton'
let config = new Config()
import { connect } from 'react-redux';
import axios from 'axios'
import {AsyncStorage} from 'react-native';
import * as _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { EventRegister } from 'react-native-event-listeners'
import RNPickerSelect from 'react-native-picker-select';



let {width, height} = Dimensions.get('window');


class EditTasks extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      title:'',
      desc:'',
      status:'',
      assignTo:'',

      tasksValue:undefined,
      assignToTask:[],
      TeamNames: [],
      priority:[],
      priorityset:[],
      fileUpload:undefined,
      imageName: '',
      file: "",
      images:[],
      id:[],
      finaldata:[],
      projectId:[],
      assignToName:[],
      priorityvalue:[]
     
   
      



    };
  }


  componentWillMount() {
    this.listener = EventRegister.addEventListener('resp', (resp) => {
      console.log("hello======================",resp);
      this.setState(prevState =>({
        images: [...prevState.images, resp]
      }))
      this.setState({
          fileUpload: ""
        })
      })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  
  componentDidMount= async()=>{


    let value = await  AsyncStorage.getItem('email');    

    let data = JSON.parse(this.props.navigation.state.params.data)
   
       console.log("idddddddddddddddd",data);
       for(let i=0;i<data.length;i++){

      if(data[i]._id == this.props.navigation.state.params._id){
        this.setState(prevState =>({
          finaldata: [...prevState.finaldata, data[i]]
        }))
        this.setState(prevState =>({
          projectId: [...prevState.projectId, data[i].projectId]
        }))
        this.setState({ tasksValue:data[i].assignTo._id})
        this.setState({priorityvalue:data[i].priority})
        
     

      }
         
        for(let j=0;j<data[i].images.length;j++){
          this.setState(prevState =>({
            images: [...prevState.images, data[i]]
          }))

        }
       }




      // console.log("call component",data[i].projectId);

    

    fetch(config.getBaseUrl()+'project/get-project-by-id/'+this.props.navigation.state.params.projectId).
    then((Response)=>Response.json()).
    then((findresponse,err)=>
      {    //console.log("response=-----------------",findresponse);

      this.setState({TeamNames:findresponse.Teams});
     // console.log("this-===",this.state.TeamNames);
    })
  }


  RNPiker(){
  
     console.log("assign to",this.state.assignToName);
    var values = []
   // var placeholder=[]
    this.state.TeamNames.map((data)=>{
      values.push({label: data.name,value: data._id})
    })
    console.log("value========================",values);
    return(
      <View>
      <RNPickerSelect
      items={values}
      onValueChange={selected => {
        console.log("SELECTED USER==============================>",selected);
        this.setState({
          tasksValue: selected,
        });
      }}
      value={this.state.tasksValue}
      />
      </View>
      )

  }

  render(){

    
    const {navigate} = this.props.navigation;
    return(
      <ScrollView
      stickyHeaderIndices={[0]}>
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}> 
      <Text style={styles.text}>Edit Task</Text>
      </Header>
      </View>

      <View style={{zIndex:-1}}>
      {
        this.state.finaldata.map((data)=>
          <View>

          <View style={styles.inputContainer}>
          <Text style={styles.textTitle}>Title:</Text>
          <TextInput 
          autoFocus={true}
          placeholder={data.title}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({title:newValue})}/>
          </View>

          <View style={styles.inputContainer}>
          <Text style={styles.textTitle}>Desc:</Text>
          <TextInput 
          autoFocus={true}
          placeholder={data.desc}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({desc:newValue})}/>
          </View>


          <View style={styles.inputContainer}>
          <Text style={styles.textTitle}>Status:</Text>
          <TextInput 
          autoFocus={true}
          placeholder={data.status}
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          onChangeText = {(newValue) => this.setState({status:newValue})}/>
          </View>



          <View style={styles.inputContainer}>
          <Text style={styles.textTitle}>Assign To:</Text>
          <View>
          {
            this.RNPiker()
          }
          </View>
          </View> 


          <View style={styles.inputContainer}>
          <Text style={styles.textTitle}>priority :</Text>
          <Picker
          selectedValue={this.state.priorityvalue}
          style={{height: 50, color:'black'}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({priorityvalue: itemValue}) }>
            <Picker.Item label="low" value="4"/>
            <Picker.Item label="Medium" value="3" />
            <Picker.Item label="High" value="2" />
            <Picker.Item label="Highest" value="1" />
          </Picker>
          </View> 

            <View style={styles.inputContainer}>
            <Image style={styles.img}
            source={{uri:this.state.fileUpload}} />
            </View>


            <View style={styles.inputContainer}>
            {
              this.state.images.map((data)=>
                <View style={{marginTop:10}}>
                <Image  source={{uri:config.getMediaUrl()+data.images}} style={{width: '100%', height: 150}}/>
                </View>
                )
            }
            </View>


            </View>
            )
      }

      <TouchableOpacity style={{  backgroundColor: "#372e5f",padding:10,width:'100%',marginTop:10}}
      onPress={this.pickImage}>
      <Text style={{textAlign:'center',color:'white'}}>Upload image </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer1}>
      <TouchableOpacity style={[styles.buttonContainer, styles.savechangebtn]} 
      onPress={() => this.props.edittask(this.state.desc, this.state.title, this.state.status, this.state.tasksValue,this.state.priorityvalue,this.state.file,this.state.imageName,this.state.projectId,this.state.id, this.props.navigation.state.params._id)}>
      <Text style={styles.signUpText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.canclebtn]}  onPress={() => navigate('DisplayTasks')}>
      <Text style={styles.signUpText}>Cancle</Text>
      </TouchableOpacity>
      </View>

      </View>
      </ScrollView>
      )
  }

  pickImage = async () => {
    console.log("function call", this.props.navigation.state.params.projectId);
    const options = {
      allowsEditing: true,
      base64: false
    };
    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } 
      else {
        console.log("this images===========",response);
        const source = { uri: response.uri }
        console.log(source);
        this.setState({ file: response.uri, fileUpload: response.uri, imageName : response.fileName });
      }
    })
  };
}

function mapDispatchToProps(dispatch) {

  return{
    edittask:(desc,title,status,assignTo,priority,file,images,projectId,id,_id)=>{   
      var body={desc: desc , title: title,status:status, assignTo:assignTo, priority:priority }
      console.log("res===>",body);
      
      if(file==undefined){
        axios.put(config.getBaseUrl()+"tasks/update-task-by-id/"+_id,body).then(resp=>{
          _storeData(resp);
          console.log("updated===========",resp);
          alert("Update success!");
          dispatch({ type: 'EDITTASKS', payload:body})
        },err=>{
          console.log({err: err});
        }).catch(function(error){
          console.log(error);
        })
      }else{
        RNFetchBlob.fetch('PUT', config.getBaseUrl()+'tasks/update-task-by-id/'+_id, {
          'Content-Type' : 'multipart/form-data',
        },
        [

        {
          name : 'desc',
          data: desc
        },
         {
          name : 'title',
          data: title
        },
         {
          name : 'status',
          data: status
        },
        {
          name : 'assignTo',
          data: assignTo
        },
         {
          name : 'priority',
          data: priority
        },
        //  {
        //   name : 'projectId',
        //   data: projectId
        // },
        {
          name : 'fileUpload',
          filename :images,
          data: RNFetchBlob.wrap(file)
        },

        ]).then((res) => {

          var resp = JSON.parse(res.data);
          EventRegister.emit('resp', resp ) 


          alert("Upload Image success!");
           _storeData(resp);

          console.log("yessss",resp);

        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
}

 async function _storeData(resp) {
   console.log("async data------------------------------",resp);
    try {
   
      await AsyncStorage.setItem('updateddata',JSON.stringify(resp));
    } catch (error) {
       

    }
  }
export default connect(mapDispatchToProps)(EditTasks);

const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center',
    marginTop: 10,

  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    textAlign:'justify',
    elevation:5,
    marginTop:5,
    padding:10,
    margin:5
  },
  textTitle:{
    color:'gray',
    fontSize:20,
    fontWeight: 'bold'
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
  img: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    marginTop:10
  },
})
// const pickerSelectStyles = StyleSheet.create({
  //   inputIOS: {
    //     fontSize: 16,
    //     paddingVertical: 12,
    //     paddingHorizontal: 10,
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     borderRadius: 4,
    //     color: 'black',
    //     paddingRight: 30, // to ensure the text is never behind the icon
    //   },
    //   inputAndroid: {
      //     fontSize: 16,
      //     paddingHorizontal: 10,
      //     paddingVertical: 8,
      //     borderWidth: 0.5,
      //     borderColor: 'eggplant',
      //     borderRadius: 8,
      //     color: 'black',
      //     paddingRight: 30, // to ensure the text is never behind the icon
      //   },
      // });




      // {
        //   this.state.assignToTask.maps((data)=>
        // <Picker.Item label={data.name} value={data._id}/>

        //   )
        // }

        // <Picker.Item label={this.props.navigation.state.params.priorityset} selectedValue={this.props.navigation.state.params.priorityset}/>





        //      <View style={styles.inputContainer}>
        // {
          //   this.state.images.map((data)=>
          //     <View >
          //     <View style={{marginTop:10}}>

          //     <Image  source={{uri:config.getMediaUrl()+data.images}} style={{width: '100%', height: 150}}/>
          //     </View>
          //     </View>

          //     )
          // }
          // </View>




          //    <View style={styles.inputContainer}>
          // <Text style={styles.textTitle}>Assign To:</Text>

          // <Picker 
          // selectedValue={this.state.tasksValue}
          // style={{height: 50, color:'black'}}
          // // onValueChange={(itemValue, itemIndex) => 
            // //   //this.pickerChange(itemIndex)}>{

              // //   // this.state.TeamNames.map( (v)=>{

                // //   //    return (<Picker.Item label={v.name} value={v._id} />)
                // //   // }
                // //    // )
                // //   }

                //   </Picker>
          //   </View> 
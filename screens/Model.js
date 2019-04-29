import React from 'react';
import { StyleSheet, Text, View , ScrollView, TextInput, Dimensions, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'
import {AsyncStorage} from 'react-native';
import Config from '../config'
import HTMLView from 'react-native-htmlview'
import { connect } from 'react-redux'
import axios from 'axios'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast from 'react-native-simple-toast';
import {PermissionsAndroid} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
// import RNUploader from 'react-native-uploader';
var RNUploader = require('NativeModules').RNUploader;


let config = new Config()

const WIDTH = Dimensions.get('window').width 
class Model extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comments : [],
      content:'',
      id:[],
      userId:[],
      taskId:[],
      fileUpload:undefined,
      imageName: '',
      file: "",
      projectId:[],
      name:[]

    }

  }

  componentWillMount() {
    this.listener = EventRegister.addEventListener('resp', (resp) => {
      console.log("hello======================",resp);
      this.setState(prevState =>({
        comments: [...prevState.comments, resp]
      }))
      this.setState({
        fileUpload: ""
      })
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  componentDidMount = async()=>{
    console.log("hello componentdidmount");

    let value = await  AsyncStorage.getItem('email'); 
    this.setState({userId:value})
    this.setState({id:this.props.navigation.state.params._id})
    this.setState({taskId:this.props.navigation.state.params._id})
    this.setState({projectId:this.props.navigation.state.params.projectId})
    console.log("taskid==================>",this.state.taskId);
    console.log("userId====================",this.state.userId);
    console.log("ProjectId====================",this.props.navigation.state.params.projectId);
    console.log("id================",this.props.navigation.state.params._id);
    fetch(config.getBaseUrl()+'comment/all/'+this.props.navigation.state.params._id).
    then((Response)=>Response.json()).
    then((findresponse,err)=> {     
      for(let i=0;i<findresponse.length;i++){

        console.log("comment========");
        this.setState(prevState =>({
          comments: [...prevState.comments, findresponse[i]]
        }))

        this.setState(prevState =>({
          name: [...prevState.name, findresponse[i].userId.name]
        }))
        
      }

    }).catch((error) => {

    });
  }  

  profile(data){
    console.log("<><><><><><>>>>>>>>>>>>>>>>>>>",this.props.navigation.state.params.profilepic);
    let img1 = {uri: this.props.navigation.state.params.profilepic}
    let img2 = this.props.navigation.state.params.profilepic
    if(img2==''){
      console.log("if call");
      return(
        <View >
        <Image style={styles.img1} source={require('../assets/avataricon.png')}/>
        
        </View>
        )
    }
    else
        console.log("else call");
      return(
        <View style={{flexDirection: 'row',}}>
        <Image style={styles.img1} source={img1}/>
        
        </View>
        )
  } 
  comment(data){

    if(data.images == ''){

      return(
        <View >
        <View style={{flexDirection: 'row',}}>
        {this.profile(data)}
        <Text style={{color:'black',fontSize:15, marginLeft:10,alignItems: 'center',marginTop:10}}>{this.props.navigation.state.params.assignTo}</Text>
        </View>
        <View style={{marginTop:10}}>

        <HTMLView value={data.content} style={styles.content} />
        </View>
        </View>
        )
    }
    else{

      return(
        <View >
        <View style={{flexDirection: 'row',}}>
        {this.profile(data)}
          <Text style={{color:'black',fontSize:15, marginLeft:10,alignItems: 'center',marginTop:10}}>{this.props.navigation.state.params.assignTo}</Text>
        </View>
        <View style={{marginTop:10}}>
        <HTMLView value={data.content} style={styles.content} />
        <Image  source={{uri:config.getMediaUrl()+data.images}} style={{width: '100%', height: 150}}/>
        </View>
        </View>
        )
    }
  }
  render() {
    console.log("call render");

    return (
      <ScrollView
      stickyHeaderIndices={[0]}>

      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}> 
      <Text style={styles.text}>Task Details</Text>
      </Header>
      </View>
      <View  style={{zIndex:-1}}>
      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Title:</Text>
      <Text>{this.props.navigation.state.params.title}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Desc:</Text>
      <Text>{this.props.navigation.state.params.desc}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Created By:</Text>
      <Text>{this.props.navigation.state.params.createdBy}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Created Date:</Text>
      <Text>{this.props.navigation.state.params.createdAt}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Status:</Text>
      <Text>{this.props.navigation.state.params.status}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Assign To:</Text>
      <Text>{this.props.navigation.state.params.assignTo}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Priority:</Text>
      <Text>{this.props.navigation.state.params.priorityset}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Comment:</Text>

      <TextInput
      ref={(input)=>{this.content=input}}
      style={styles.textarea}
      multiline = {true}
      numberOfLines = {4}
      onChangeText={(text) => this.setState({content:text})}/>


      <Image style={styles.img}
      
      source={{uri:this.state.fileUpload}} />


      <TouchableHighlight style={{  backgroundColor: "#372e5f",padding:10,width:'100%',marginTop:10}}
      onPress={this.pickImage}>
      <Text style={{textAlign:'center',color:'white'}}>Upload image with comment</Text>
      </TouchableHighlight>


      <View style={styles.inputContainer1}>
      <TouchableHighlight style={[styles.buttonContainer, styles.savechangebtn]}
      onPress={() => this.props.comments(this.state.content,this.state.taskId, this.state.userId,this.state.file,this.state.imageName, this.props.navigation.state.params.projectId, this.state.comments, this.state.id,this.state.fileUpload, this.content.clear())}>
      <Text style={styles.signUpText}>Add Comment</Text>
      </TouchableHighlight>

      </View>
      </View>
      <View>
      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>All Comments:</Text>

      {
        this.state.comments.map((data)=>
          <View style={{margin:5}}>
          {this.comment(data)}
          </View>

          )
      }
      </View>
      </View>
      </View>
      </ScrollView>
      );
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

function mapDispatchToProps(onProps) {
  return{
    comments:(content,taskId,userId,file, images, projectId, comments,id, name, fileupload)=>{   
      var body={content: content ,userId:userId,taskId:taskId,name:name}
      console.log("body================",body);
      if(file==undefined){
        if(content == ''){
          alert("Please comment")
        }else{
          axios.post(config.getBaseUrl()+'comment/add-comment/',body).then(resp=>{
            EventRegister.emit('resp', resp ) 
          
            alert("Upload success!");
            console.log("comments====>",resp);
          },err=>{
            console.log({err: err});
          }).catch(function(error){
            console.log(error);
          })

        }
      }
      else{
        if(content== '' && file == ''){
          alert("Please comment")
        }
        else{

          RNFetchBlob.fetch('POST', config.getBaseUrl()+'comment/add-comment', {
            'Content-Type' : 'multipart/form-data',
          },
          [
          {
            name : 'projectId',
            data: projectId
          },
          {
            name : 'userId',
            data: userId
          },
          {
            name : 'taskId',
            data: taskId
          },
          {
            name : 'content',
            data: content
          },
          {
            name : 'fileUpload',
            filename :images,
            data: RNFetchBlob.wrap(file)
          },

          ]).then((res) => {

            var resp = JSON.parse(res.data);
            EventRegister.emit('resp', resp ) 
            
            alert("Upload Image success!");
            // this.setState({fileUpload:[]})
            // fileUpload:[]

            console.log("yessss",resp);

          })
          .catch((err) => {
            console.log(err);
          })
        }

      }
    }
  }
}

export default connect( mapDispatchToProps)(Model)

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
  textarea: {
    textAlignVertical: 'top',  
    fontSize: 14,
    color: '#333',
    marginLeft:10,
    marginRight:10,
    borderColor: '#fff',
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  inputContainer1:{
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    marginLeft:5,
    marginRight:5,
    height:55,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    marginTop:10
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:180,
    borderRadius:30,
    padding:10,
    textAlign:'center'
  },
  savechangebtn: {
    backgroundColor: "#372e5f",
    alignItems:'center',
    justifyContent: 'center', 
  },
  signUpText: {
    color: 'white',
  },
  img: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    marginTop:10
  },
  img1: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});


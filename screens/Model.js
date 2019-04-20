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
    
    }
     
  }


  componentDidMount = async()=>{

    let value = await  AsyncStorage.getItem('email'); 
    this.setState({userId:value})
    this.setState({id:this.props.navigation.state.params._id})
    this.setState({taskId:this.props.navigation.state.params._id})
    console.log("taskid==================>",this.state.taskId);
    console.log("userId====================",this.state.userId);

    fetch(config.getBaseUrl()+'comment/all/'+this.props.navigation.state.params._id).
    then((Response)=>Response.json()).
    then((findresponse,err)=> {     
      for(let i=0;i<findresponse.length;i++){

        console.log("comment========",findresponse[i].images);
        this.setState(prevState =>({
          comments: [...prevState.comments, findresponse[i]]
        }))
      }


    }).catch((error) => {

    });
  }  
  // handleUploadImage = () => {
  //   console.log("call function=======================",this.state.fileUpload);
  //   RNFetchBlob.fetch('POST', config.getBaseUrl()+'comment/add-comment', {
  //     'Content-Type' : 'multipart/form-data',
  //   }, [
  //   {
  //     name : 'fileUpload',
  //     filename : this.state.imageName,
  //     data: RNFetchBlob.wrap(this.state.fileUpload)
  //   },
  //   {
  //     name : 'userId',
  //     data: this.state.userId
  //   },
  //   {
  //     name : 'taskId',
  //     data: this.state.taskId
  //   },
  //   ]).then((resp) => {

  //     var res = JSON.parse(resp.data);
  //     console.log("yessss",res);

  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // };
  render() {
    
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
      style={styles.textarea}
      multiline = {true}
      numberOfLines = {4}
      onChangeText={(text) => this.setState({content:text})}/>

      <TouchableHighlight style={{  backgroundColor: "#372e5f",padding:10,width:'100%',marginTop:10}}
      onPress={this.pickImage}>
      <Text style={{textAlign:'center',color:'white'}}>Upload image with comment</Text>
      </TouchableHighlight>


      <View style={styles.inputContainer1}>
      <TouchableHighlight style={[styles.buttonContainer, styles.savechangebtn]}
      onPress={() => this.props.comments(this.state.content,this.state.taskId, this.state.userId,this.state.fileUpload,this.state.imageName)}>
      <Text style={styles.signUpText}>Add Comment</Text>
      </TouchableHighlight>

      </View>
      <Image style={styles.img} source={{uri:this.state.fileUpload}} />
      </View>
      <View>
      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>All Comments:</Text>

      {
        this.state.comments.map((data)=>
          <View style={{elevation:5,color:'black'}}>
          <HTMLView value={data.content} style={styles.content} />
          <Image  source={{uri:config.getMediaUrl()+data.images}} style={{width: '100%', height: 150}}/>
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
    console.log("function call");
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       title: 'Cool Photo App Camera Permission',
    //       message:
    //       'Cool Photo App needs access to your camera ' +
    //       'so you can take awesome pictures.',
    //       buttonNeutral: 'Ask Me Later',
    //       buttonNegative: 'Cancel',
    //       buttonPositive: 'OK',
    //     },
    //     );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('You can use the camera');
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
            console.log(source);
            this.setState({ fileUpload: response.uri, imageName : response.fileName });
            // this.props.comments(this.state.content,this.state.taskId, this.state.userId,this.state.fileUpload,this.state.imageName)
            console.log("this images===========",this.state.fileUpload);
            // this.handleUploadImage()
          }

        });
    //   } else {
    //     console.log('Camera permission denied');
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  };
}


function mapDispatchToProps(onProps) {
  // console.log("imagname===",this.state.imageName);
  // console.log("fileupload===========",this.state.fileUpload);

  return{
    comments:(content,taskId,userId,file, images)=>{   
      var body={content: content ,userId:userId,taskId:taskId}
      console.log("body================",body);
      if(file==undefined){
        axios.post(config.getBaseUrl()+'comment/add-comment/',body).then(res=>{
          console.log("comments====>",body);
          Toast.show('Submit comment successfully');
        },err=>{
          console.log({err: err});
        }).catch(function(error){
          console.log(error);
        })
      } else{
        const fs = RNFetchBlob.fs
        console.log("in else part=================",file);
        RNFetchBlob.fetch('POST', config.getBaseUrl()+'comment/add-comment', {
        'Content-Type' : 'multipart/form-data',
        },
        [{
          name : 'fileUpload',
          filename :images,
          data: RNFetchBlob.wrap(file)
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

        ]).then((resp) => {
           // return resp.readFile("base64");
          var res = JSON.parse(resp.data);
          console.log("yessss",res);

        })
        .catch((err) => {
          console.log(err);
        })

      }
    }
  }
}
export default connect( mapDispatchToProps)(Model)
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
  },


});

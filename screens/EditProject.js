import React from 'react';
import MenuButton from '../components/MenuButton'
import { Picker,StyleSheet, Text, View, TextInput, ScrollView, ActivityIndicator ,Button, TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios'

import Config from '../config'

 let config = new Config()

 class EditProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    title:'',
    desc:'',
    clientEmail:'',
    clientFullName:'',
    clientContactNo:'',
    clientDesignation:'' 
    };
  }


  render() {
 const {navigate} = this.props.navigation;
    return (
      <ScrollView
      stickyHeaderIndices={[0]}>
      
      <View >
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Edit Project</Text>
      </Header>
      </View>
      <View>
        
      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Title</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.title}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({title:newValue})}/>
      </View>

      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Project Discription</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.desc}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({desc:newValue})}/>
      </View>

       <View>
         <Text style={styles.clienttext}>Client Details:</Text>
       </View>

      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Email</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.clientEmail}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({clientEmail:newValue})}/>
      </View>


      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Full Name</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.clientFullName}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({clientFullName:newValue})}/>
      </View>

      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Contact No.</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.clientContactNo}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({clientContactNo:newValue})}/>
      </View>

      <View style={styles.inputContainer}> 
      <Text style={styles.textName}>Designation</Text>
      <TextInput 
      autoFocus={true}
      placeholder={this.props.navigation.state.params.clientDesignation}
      placeholderTextColor = "#000000"
      autoCapitalize = "none"
      onChangeText = {(newValue) => this.setState({clientDesignation:newValue})}/>
      </View>

      <View style={styles.inputContainer1}>
      <TouchableHighlight style={[styles.buttonContainer, styles.savechangebtn]} 
      onPress={() => this.props.editProject(this.state.desc, this.state.title, this.state.clientEmail, this.state.clientFullName,this.props.clientContactNo ,this.state.clientDesignation, this.props.navigation.state.params._id)}>
      <Text style={styles.signUpText}>Save Changes</Text>
      </TouchableHighlight>

      <TouchableHighlight style={[styles.buttonContainer, styles.canclebtn]}  onPress={() => navigate('AllProjectScreen')}>
      <Text style={styles.signUpText}>Cancle</Text>
      </TouchableHighlight>
      </View>
      
      </View>
      </ScrollView>
      );
 
  }
}



function mapDispatchToProps(dispatch) {

  return{
    editProject:(desc,title,clientEmail,clientFullName, clientContactNo,clientDesignation,_id)=>{   
      var body={desc: desc , title: title,clientEmail:clientEmail, clientFullName:clientFullName , clientContactNo:clientContactNo, clientDesignation:clientDesignation}
       console.log("res===>",body);
      axios.put(config.getBaseUrl()+"project/update/"+_id,body).then(res=>{
        dispatch({ type: 'EDITPROJECT', payload:body})

      },err=>{
        console.log({err: err});
      }).catch(function(error){
        console.log(error);
      })
    }
  }
}
export default connect(mapDispatchToProps)(EditProject);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:40
  },
   inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    elevation:5,
    marginLeft:10,
    marginRight:5,
    marginTop:5,
    height:55,
    marginBottom:20,
    flexDirection: 'column',

    padding:10
  },
  textName:{
    color:'gray'
  },
  clienttext:{
    color:'#383048',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft:10
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
});
// this.state.profilePhoto.split('/').reverse()[0].split('.').reverse()[0]
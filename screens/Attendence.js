import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput , Picker, Image, Button} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'


export default class Attendence extends React.Component {
	constructor(props){
    super(props);
    this.state = {
     	date:''
    };

  }



ShowCurrentDate=()=>{

      var date = new Date().getDate(); 
var month = new Date().getMonth() + 1; 
var year = new Date().getFullYear(); 
var hours = new Date().getHours(); 
var min = new Date().getMinutes(); 
var sec = new Date().getSeconds(); 

      alert(date + '-' + month + '-' + year +'-'+hours + '-' +min+'-'+sec);

     }

	render() {
		console.log("datte==========================",this.state.date);
		return (
			<ScrollView
			stickyHeaderIndices={[0]}>
			<View>
			<Header style={{ backgroundColor: '#4b415a',height:50}}> 
			 <MenuButton navigation={this.props.navigation} />
			<Text style={styles.text}>attendence</Text>
			</Header>
			</View>

			<View style={styles.container}>
			
			<TouchableOpacity style={styles.buttonContainer} onPress={ this.ShowCurrentDate}>
			<Text style={styles.signUpText}>Checkin</Text>
			</TouchableOpacity>
	
			</View>
			</ScrollView>
			)
	}


	
}

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
    marginTop: 10,

},
buttonContainer: {
	height:40,
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
	width:120,
	borderRadius:30,
	backgroundColor: "green",
},

signUpText: {
    color: 'white',
  },

	
});



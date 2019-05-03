import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput , Picker, Image, Button} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'
import {AsyncStorage} from 'react-native';
import Config from '../config'
import axios from 'axios'
import { Table, Row, Rows } from 'react-native-table-component';
import { EventRegister } from 'react-native-event-listeners'

let config = new Config()


class Attendence extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userId:[],
			attendencedata:[],
			getData:[],
			InOut:[],
			dateNow:[],
			tableHead: ['CheckIn', 'CheckOut','Difference'],
			
		};

	}


	componentWillMount= async()=>{

		this.listener = EventRegister.addEventListener('data', (data) => {
			
			console.log("data---------new---------",data.in_out.slice(-1)[0]);
		

			this.setState({getData:[data]})
			this.setState({dateNow:data.date.split('T')[0]})

			this.setState(prevState =>({
				InOut: [...prevState.InOut, data.in_out.slice(-1)[0]]
			}))

		})

	}
	componentWillUnmount() {
		EventRegister.removeEventListener(this.listener)
	}

	componentDidMount= async()=>{
		let value = await  AsyncStorage.getItem('email');  

		let user_Id = value
		this.setState({userId:value})
		var date1 = new Date().getDate(); 
		var month = new Date().getMonth() + 1; 
		var year = new Date().getFullYear(); 
		let date =  year + '-' + month + '-' + date1
		var body={user_Id:user_Id, date:date}
		axios.post(config.getBaseUrl()+'attendence/get-attendence-by-get-and-id',body).then(res=>{
			let date = res.data.date.split('T')[0]

			
			this.setState(prevState =>({
				getData: [...prevState.getData, res.data]
			}))
			this.setState({InOut:res.data.in_out})

			
			this.setState(prevState =>({
				dateNow: [...prevState.dateNow, date]
			}))


		},err=>{
			console.log({err: err});
		})
		
		attendenceFunction=(data)=>{
			this.setState({attendencedata:data})

		}



	}
	time(){


		for(let i=0;i<this.state.InOut.length;i++){
			
		console.log("data===============time==========",this.state.InOut[i].checkOut);

		if(this.state.InOut[i].checkOut == null){
			console.log("if");
			return(
			<View>
			{
				this.state.InOut.map((data)=>
					<View style={{elevation:5,backgroundColor:'#ccc'}}>
					<Text>checkIn:{data.checkIn}</Text>
				
					</View>
					)
			}
			</View>
			)

		}
		else{
			console.log("else");
		return(
			<View>
			{
				this.state.InOut.map((data)=>
					<View style={{elevation:5,backgroundColor:'#ccc'}}>
					<Text>checkIn:{data.checkIn}</Text>
					<Text>checkOut:{data.checkOut}</Text>
					</View>
					)
			}
			</View>
			)

		}
		}

	}


	render() {
		const state = this.state;

		let res = this.state.attendencedata;
		let btn = '';
		const Checkout = <Text style={styles.Checkbtn}>Checkout</Text>;
		const Checkin =  <Text style={styles.Checkbtn}>Checkin</Text>;
	

		for(let i=0;i< res.length;i++){

			if(res[i].data.in_out.slice(-1)[0].checkOut == null){
				btn =  Checkout

			}else{
				btn = Checkin
			}
		}	
		return(
			<ScrollView
			stickyHeaderIndices={[0]}>
			<View>
			<Header style={{ backgroundColor: '#4b415a',height:50}}> 
			<MenuButton navigation={this.props.navigation} />
			<Text style={styles.text}>attendence</Text>
			</Header>
			</View>

			<View style={styles.container}>
			<Text style={styles.signUpText}>{btn}</Text>
			<TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.attendence(this.state.userId)}>
			<Text style={styles.signUpText}>{btn}</Text>
			</TouchableOpacity>
			</View>

			<View>
			<Text>Date:{this.state.dateNow}</Text>

			<View >

			{
				this.state.getData.map((data)=>
					<View >
					<Text>difference:{data.difference}</Text>
					{this.time(data)}

					</View>
					)
			}
			</View>

			</View>
			
			</ScrollView>
			)	


	}
}

function mapDispatchToProps(dispatch) {
	let data=[]
	return{
		attendence:(userId)=>{

			var body={userId:userId}
			console.log(body);
			axios.post(config.getBaseUrl()+"attendence/emp-attendence",body).then(res=>{


				data.push({data:res.data})
				attendenceFunction(data)
				EventRegister.emit('data', res.data)




			},err=>{
				console.log({err: err});
			})

		}
	}
}

export default connect(mapDispatchToProps)(Attendence)

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
		height:100,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width:100,
		borderRadius:50,
		backgroundColor: "green",
		marginTop:10
	},

	Checkbtn: {
		color: 'white',

	},
	head: { height: 40, backgroundColor: '#f1f8ff' },
	text1: { margin: 6 },
	container1: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

});








		
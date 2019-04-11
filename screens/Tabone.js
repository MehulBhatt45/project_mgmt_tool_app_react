import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import DialogBox from 'react-native-dialogbox';
import { connect } from 'react-redux';

import MenuButton from '../components/MenuButton'
let result1 = [];

class Tab1 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data : [],
			todo:[],
			modalVisible: false,
			animating: true	
		}
	}
	closeActivityIndicator = () => setTimeout(() => this.setState({
		animating: false }), 1500)

	componentDidMount(){	
		fetch('https://raoinfotech-conduct.tk:4001/project/all').
		then((Response)=>Response.json()).
		then((findresponse,err)=>
		{     
			for(let i=0;i<findresponse.length;i++){
				if(findresponse[i].assignTo._id == this.props._id){
					
					if(findresponse[i].status == "to do"){
						this.setState(prevState =>({
							todo: [...prevState.todo, findresponse[i]]
						}))
					}
				}
			}
		})
		{this.closeActivityIndicator()}
	}
	render() {
		const animating = this.state.animating
		return (
			<View >
			<ActivityIndicator
			animating = {animating}
			color = '#372e5f'
			size = "large"
			style = {styles.activityIndicator}/>
			{
				this.state.todo.map((data)=>
					
					<View style={styles.card1}>

					<Text style={styles.title}>
					{data.title}
					</Text>
					<Text>
					{data.desc}
					</Text>
					
					</View>
					
					)
			}
			</View>
			)
	}
}
mapStateToProps = (state) => {
	return{
		_id:state._id,
		name:state.name,
		tasks:state.tasks

	}
}
export default connect(mapStateToProps)(Tab1);
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
		marginTop:40
	},
	card:{
		marginLeft:10,
		marginRight:10,
		marginTop:20,
		elevation:5,
		height:20,
		backgroundColor: 'pink',
	},
	card1:{
		flex:3,
		flexDirection: 'column',
		marginLeft:10,
		marginRight:10,
		marginTop:20,
		elevation:5,
		padding:5,
		backgroundColor: 'white',
	},
	title: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 15,
	},
	
});



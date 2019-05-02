import React from 'react';
import {
	View, 
	Text,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Button,
	Alert,
	AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialIcons";
import { EventRegister } from 'react-native-event-listeners'

import Config from '../config'
const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height 

let config = new Config()
class MenuDrawer extends React.Component {
	state={
		name:[],
		pic:[],
		data:[]
	}


	componentWillMount= async()=>{
		console.log("recall drawer");
		const value = await AsyncStorage.getItem('currentUser');
		if (value !== null) {

			var data = JSON.parse(value);
			this.listener = EventRegister.addEventListener('res', (data) => {
				console.log("drawer>>>>>>>.======================",data);
				this.setState({
					data:[data.data]
				})
				this.setState({
					pic:[data.data.profilePhoto]
				})
				console.log("yehh data in drawer==============",this.state.data);
			})
		}
	}
	componentWillUnmount() {
		EventRegister.removeEventListener(this.listener)
	}



	componentDidMount= async()=>{
		
		
		let value = await  AsyncStorage.getItem('email'); 

		fetch(config.getBaseUrl()+'user/get-user-by-id/'+value).
		then((Response)=>Response.json()).
		then((findresponse,err)=>
		{    console.log("res-----------",findresponse.name);
		this.setState(prevState =>({
			data: [...prevState.data, findresponse]
		}))
		this.setState(prevState =>({
			name: [...prevState.name, findresponse.name]
		}))

		this.setState(prevState =>({
			pic: [...prevState.pic, findresponse.profilePhoto]
		}))
		
		console.log("final-------",this.state.name);


		  

	})
}

navLink(nav, text) {
	return(
		<TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
		<Text style={styles.link}>{text}</Text>
		</TouchableOpacity>
		)
}
clearAsyncStorage = async() => {
	const value = await AsyncStorage.setItem('email', '');
	const value1 = await AsyncStorage.setItem('currentUser', '');
	console.log("aaa======>",value,value1);
	this.props.navigation.navigate('Login')
}

profilepic(data){
	//console.log("all data----",this.state.data);
	
	if(data.profilePhoto==''){
		
		return(
		 <Image style={styles.img} source={require('../assets/avataricon.png')}/>
		 )
	}
	else
		
	return(
		    <Image style={styles.img} source={{uri:config.getMediaUrl()+this.state.pic}}/>
		)
}

render() {

	 console.log("drawer");
	
	return(
		<View style={styles.container}>
		<ScrollView style={styles.scroller}>

		<View style={styles.topLinks}>

		{
			 this.state.data.map((data)=>
			 	<View style={styles.profile}>
			 	<View style={styles.imgView}>
			 	{this.profilepic(data)}


			 	</View>
			 	<View style={styles.profileText}>
			 	<Text style={styles.name}>{data.name}</Text>
			 	</View>
			 	</View>
			 	)
		}

		</View>
		<View style={styles.bottomLinks}>
		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="account-circle" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('ProfileScreen', 'Profile')}		
		</View>
		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="folder" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('AllProjectScreen', 'AllProject')}
		</View>

		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="check-box" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('TaskScreen', 'Tasks')}
		</View>


		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="accessibility" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('Leave','Leave')}
		</View>

		
		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="notifications" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('Attendence','Attendence')}
		</View>

		
		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="today" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('Noticeboard','Noticeboard')}
		</View>


		<View style={{flex:2,flexDirection:'row'}}>
		<Icon name="notifications" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		{this.navLink('Notifications','Notifications')}
		</View>



		</View>
		<View style={styles.btnlogout} >			
		<Icon name="input" size={25} style={{marginTop:15,color:'white',marginLeft:10}} />
		<TouchableOpacity onPress={()=>
			Alert.alert(
				'Log out',
				'Do you want to logout?',
				[
				{text: 'Cancel', onPress: () => {return null}},
				{text: 'Confirm', onPress: () => {this.clearAsyncStorage()}},
				],
				{ cancelable: false }
				)  
		}>
		<Text style={{margin: 16,fontWeight: 'bold',color:'white',fontSize:20}}>Logout</Text>
		</TouchableOpacity>
		</View>
		</ScrollView>

		</View>
		)
}
}

mapStateToProps = (state) => {
	return{
		_id:state._id,
		name:state.name

	}
}
export default connect(mapStateToProps)(MenuDrawer);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#383048',

	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#4b415a',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks:{
		height: 160,
		backgroundColor: '#383048',
	},

	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
		color:'white'
	},

	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: '#383048',
		paddingTop: 10,
		color:'white'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	},
	btnlogout:{
		backgroundColor: '#383048',
		color:'white',
		flexDirection:'row'

	}
})
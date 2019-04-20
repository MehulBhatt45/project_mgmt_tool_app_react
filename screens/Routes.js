import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import DrawerNavigator from '../navigation/DrawerNavigator'
import TaskScreen from './TaskScreen';
import AllProjectScreen from './AllProjectScreen';
import ProfileScreen from './ProfileScreen';
import Login from './login';
import Register from './Register';
import Leave from './Leave'
import Tabmain from './Tabmain'
import Tab1 from './Tabone'
import DisplayTasks from './DisplayTasks'
import EditProject from './EditProject'
import Model from './Model'
import Noticviewmore from './Noticviewmore';
import Notifications from './Notifications';


import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({

	Login: {
		screen: Login,
		navigationOptions:  {
			title: 'Login',
			headerLeft: null
		}
	},
	ProfileScreen:{
		screen: ProfileScreen,
		navigationOptions:  {
			
			headerLeft: null
		}
	},
	DisplayTasks:{
		screen:DisplayTasks,
		navigationOptions:  {
			header: null
		}
	},
	Noticviewmore:{
		screen:Noticviewmore,
		navigationOptions:  {
			header: null
		}

	},
	Register: {
		screen: Register,
		navigationOptions:  {
			title: 'Register',
			headerLeft: null
		}
	},
	Model:{
		screen:Model,
		navigationOptions:{
			header:null
		}
	},
	Notifications:{
		screen:Notifications,
		navigationOptions:{
			header:null
		}
	},
	DrawerNavigator: {
		screen: DrawerNavigator,
		navigationOptions:  {
			header: null
		}
	},

	
});

const Routes = createAppContainer(MainNavigator);

export default Routes;
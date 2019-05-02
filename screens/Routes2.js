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
import MenuDrawer from '../components/MenuDrawer'
import Noticviewmore from './Noticviewmore';
import Notifications from './Notifications';
import EditTasks from './EditTasks';
import Attendence from './Attendence';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({

	DrawerNavigator: {
		screen: DrawerNavigator,
		navigationOptions:  {
			header: null
		}
	},
	DisplayTasks:{
		screen:DisplayTasks,
		navigationOptions:  {
			header: null
		}
	},
	ProfileScreen:{
		screen: ProfileScreen,
		navigationOptions:  {

			header: null
		}
	},
	Attendence:{
		screen:Attendence,
		navigationOptions:  {
			header: null
		}
	},
	Model:{
		screen:Model,
		navigationOptions:{
			header:null
		}
	},
	MenuDrawer:{
		screen: MenuDrawer,
		navigationOptions:  {

			headerLeft: null
		}
	},
	Noticviewmore:{
		screen:Noticviewmore,
		navigationOptions:  {
			header: null
		}

	},
	Notifications:{
		screen:Notifications,
		navigationOptions:{
			header:null
		}
	},
	
	Login: {
		screen: Login,
		navigationOptions:  {
			title: 'Login',
			headerLeft: null
		}
	},
	Register: {
		screen: Register,
		navigationOptions:  {
			title: 'Register',
			headerLeft: null
		}
	},
	EditTasks:{
		screen:EditTasks,
		navigationOptions:{
			header:null
		}
	},

});

const Routes2 = createAppContainer(MainNavigator);

export default Routes2;
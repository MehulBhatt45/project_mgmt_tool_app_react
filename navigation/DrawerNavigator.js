import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import TaskScreen from '../screens/TaskScreen';
import AllProjectScreen from '../screens/AllProjectScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Register from '../screens/Register';
import Login from '../screens/login';
import EditProfile from '../screens/EditProfile';
import Leave from '../screens/Leave'
import Noticeboard from '../screens/Noticeboard'
import DisplayTasks from '../screens/DisplayTasks'
import EditProject from '../screens/EditProject'
import Notifications from '../screens/Notifications';


import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		AllProjectScreen: {
			screen: AllProjectScreen
		},
		ProfileScreen: {
			screen: ProfileScreen
		},
		TaskScreen: {
			screen: TaskScreen
		},
		EditProfile: {
			screen: EditProfile
		},
		Notifications:{
			screen:Notifications
		},
		Leave: {
			screen: Leave
		},
		Noticeboard:{
			screen:Noticeboard
		},
	
		EditProject:{
			screen:EditProject
		},
				
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);
import React from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import Tab1 from './Tabone';
import Tab2 from './Tabtwo';
import Tab3 from './Tabthree';
import Tab4 from './Tabfour';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MenuButton from '../components/MenuButton'

import {RkButton, RkText, RkTabSet,RkTabView, RkTab, RkTheme } from 'react-native-ui-kitten';


export default class Tabmain extends React.Component {
	render() {
		return (
            <ScrollView>
			<RkTabView rkType='dark'>
			<RkTabView.Tab title={'To Do'}>
			<Tab1 />
			</RkTabView.Tab>
			<RkTabView.Tab title={'In Progress'}>
			<Tab2 />
			</RkTabView.Tab>
			<RkTabView.Tab title={'Testing'}>
			<Tab3 />
			</RkTabView.Tab>
			<RkTabView.Tab title={'Done'}>
			<Tab4 />
			</RkTabView.Tab>
			</RkTabView>  
			</ScrollView>
			);
	}
}

RkTheme.setType('RkTabView', 'dark', {
  backgroundColor:'#372e5f',
  color:'white',
  fontWeight: 'bold',
  borderColor:'black',
  justifyContent: 'center',
  textAlign:'center',
  fontSize: 50,

});

RkTheme.setType('RkTabView', 'darkSelected', {

	fontWeight: 'bold',
	fontSize: 50
});
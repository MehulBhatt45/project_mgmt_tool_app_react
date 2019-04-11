import React from 'react';
import {ScrollableTab, Container,Image, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Tabs,Tab } from 'native-base';
import { StyleSheet, View } from 'react-native';

import MenuButton from '../components/MenuButton'
import Tab1 from './Tabone';
import Tab2 from './Tabtwo';
import Tab3 from './Tabthree';
import Tab4 from './Tabfour';
import Tabmain from './Tabmain';
import {RkButton, RkText, RkTabSet,RkTabView, RkTab, RkTheme } from 'react-native-ui-kitten';
export default class TaskScreen extends React.Component {

  render() {
    return (
      <View >
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Tasks</Text>
      </Header>
      <Tabmain />
      </View>
      );
  }
}

const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:40
  }
});



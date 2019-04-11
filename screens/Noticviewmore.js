import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';

export default class Noticviewmore extends React.Component {


  render() {
console.log(this.props.navigation.state.params.images);
    return (
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <Text style={styles.text}>{this.props.navigation.state.params.title}</Text>
      </Header>
     
          <View style={styles.mainCard}>
          <View style={styles.inputIcon}>
          <Image  source={require('../assets/rose1.jpeg')}/>
          </View>
          <Text style={{marginLeft:15,fontSize:20, fontWeight: 'bold'}}>{this.props.navigation.state.params.title}</Text>
          <Text style={{marginLeft:15,fontSize:15,  textAlign: 'justify'}}>{this.props.navigation.state.params.desc}</Text>
          </View>
      </View> 
      )
  }
}

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
  mainCard:{
    marginLeft:30,
    marginTop:10,
    marginRight:30,
    elevation:5,
    backgroundColor:'#fff',
    padding:10,
  },
  inputIcon:{
    justifyContent: 'center',
    alignItems: 'center',
  },

});

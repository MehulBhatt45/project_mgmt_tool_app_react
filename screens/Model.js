import React from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'


export default class Model extends React.Component {
  render() {
    return (
       <ScrollView
      stickyHeaderIndices={[0]}>
      <View >
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:95}}> 
      <Text style={styles.text}>Task Details</Text>
      </Header>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Title:</Text>
      <Text>{this.props.navigation.state.params.title}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Desc:</Text>
      <Text>{this.props.navigation.state.params.desc}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Created By:</Text>
      <Text>{this.props.navigation.state.params.createdBy}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Created Date:</Text>
      <Text>{this.props.navigation.state.params.createdAt}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Status:</Text>
      <Text>{this.props.navigation.state.params.status}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Assign To:</Text>
      <Text>{this.props.navigation.state.params.assignTo}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.textTitle}>Priority:</Text>
      <Text>{this.props.navigation.state.params.priorityset}</Text>
      </View>
      </View>
      </ScrollView>
      );
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    textAlign:'justify',
    elevation:5,
    marginTop:5,
    padding:10
  },
  textTitle:{
    color:'gray',
    fontSize:20,
    fontWeight: 'bold'

  }
});

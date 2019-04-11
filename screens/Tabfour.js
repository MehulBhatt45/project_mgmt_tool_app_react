import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,ActivityIndicator, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { connect } from 'react-redux';
import MenuButton from '../components/MenuButton'
let result1 = [];

class Tab4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      complete:[],
     animating: true   
    }
  }
  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 1500)

  componentDidMount(){
    fetch('https://raoinfotech-conduct.tk:4001/tasks/all-task').
    then((Response)=>Response.json()).
    then((findresponse,err)=>
    {      
      for(let i=0;i<findresponse.length;i++){
        if(findresponse[i].assignTo._id == this.props._id){
          if(findresponse[i].status == "complete"){
            this.setState(prevState =>({
              complete: [...prevState.complete, findresponse[i]]
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
      size = "large"/>
       <ScrollView>
      <View>
      {
        this.state.complete.map((data,key)=>
          <View>
          
          <View style={styles.card1}>
    

          <Text style={styles.title}>
          {data.title}
          </Text>

          <Text>
          {data.desc}
          </Text>

          </View>
          
          </View>

          )
      }
      </View>
       </ScrollView>
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
export default connect(mapStateToProps)(Tab4);

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



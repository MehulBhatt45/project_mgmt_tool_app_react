import React from 'react';
import { StyleSheet, Text, View, Image , TouchableHighlight, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'

import Config from '../config'

 let config = new Config()

export default class Noticeboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice:[],
      images:[]
    }
  }

  componentDidMount(){    
    fetch(config.getBaseUrl()+'notice/allnotice').
    then((Response)=>Response.json()).
    then((findresponse,err)=>
    {   
      for(let i=0;i<findresponse.length;i++){
        let k=findresponse[i].images.length
          this.setState(prevState =>({
            notice: [...prevState.notice, findresponse[i]]
          }))
          console.log("undifine----------",this.state.notice[0].images[0]);
         
        for(let j=0;j<k;j++){
          

           this.setState(prevState =>({
            images: [...prevState.images, findresponse[i].images[j]]
          }))
           console.log(this.state.images);

        }
      } 
    })
  }

  render() {


    const {navigate} = this.props.navigation;
    return (

      <ScrollView
      stickyHeaderIndices={[0]}>
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Notice Board</Text>
      </Header>
      </View>
      <View style={{zIndex:-1}}>
      {
        this.state.notice.map((data)=>
          <View style={styles.mainCard}>
          <View style={styles.inputIcon}>
          <Image style={styles.img} source={{uri:config.getMediaUrl()+this.state.images[0]}}/>
          </View>
          <Text style={{marginLeft:15,fontSize:20, fontWeight: 'bold',justifyContent: 'center',alignItems: 'center',textAlign:'center'}}>{data.title}</Text>
          <View style={{  justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}  onPress={() => navigate('Noticviewmore',{_id:data._id,title:data.title, desc:data.desc, images:data.images})}>
          <Text style={styles.signUpText}>View more</Text>
          </TouchableHighlight>
          </View>
          </View>
          )
      }
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
  buttonContainer: {
    height:35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:90,
  },
  signupButton:{
    backgroundColor: "#372e5f",
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
  },

});

import React from 'react';
import { StyleSheet, Text, View ,Image, ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import Config from '../config'

 let config = new Config()
export default class Noticviewmore extends React.Component {

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
        if(findresponse[i]._id == this.props.navigation.state.params._id){
          console.log(findresponse[i]._id);

          let k=findresponse[i].images.length
          this.setState(prevState =>({
            notice: [...prevState.notice, findresponse[i]]
          }))
          // console.log("undifine----------",this.state.notice[0].images[0]);

          for(let j=0;j<k;j++){


            this.setState(prevState =>({
              images: [...prevState.images, findresponse[i].images[j]]
            }))
            console.log(findresponse[i].images[j]);

          }
        }
      } 
      console.log("notice board======================",this.state.notice);
    })
  }
  


  render() {
    console.log(this.props.navigation.state.params.images);
    return (
      <ScrollView
      stickyHeaderIndices={[0]}>
      <View>
      <Header style={{ backgroundColor: '#4b415a',height:50}}>
      <Text style={styles.text}>{this.props.navigation.state.params.title}</Text>
      </Header>
      </View>
      <View style={{zIndex:-1}}>
      {
        this.state.notice.map((data)=>

          <View style={styles.mainCard}>
          <View style={styles.inputIcon}>
          <Image  source={{uri:config.getMediaUrl()+data.images[0]}} style={{width: '100%', height: 150}}/>
          </View>
          <Text style={{marginLeft:15,fontSize:20, fontWeight: 'bold'}}>{data.title}</Text>
          <Text style={{marginLeft:15,fontSize:15,  textAlign: 'justify'}}>{data.desc}</Text>
          </View>
          )}
        </View> 
        </ScrollView>
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
    marginTop:10
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

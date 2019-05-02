import React from 'react';
import { StyleSheet, Text, View, BackHandler, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Register from './screens/Register';
import DrawerNavigator from './navigation/DrawerNavigator'
import TaskScreen from './screens/TaskScreen';
import AllProjectScreen from './screens/AllProjectScreen';
import ProfileScreen from './screens/ProfileScreen';
import Login from './screens/login';
import EditProfile from './screens/EditProfile';
import Leave from './screens/Leave';
import Routes from './screens/Routes';
import Routes2 from './screens/Routes2';
import Noticeboard from './screens/Noticeboard';
import Model from './screens/Model';
import Noticviewmore from './screens/Noticviewmore';
import Notifications from './screens/Notifications';
import Attendence from './screens/Attendence';
import {AsyncStorage} from 'react-native';
import EditTasks from './screens/EditTasks';
let {width, height} = Dimensions.get('window');

const initialState = {

  password:'',
  email:'',
  _id:'',
  name:'',
  tasks:'',
  userRole:'',
  profilePhoto:'',
  phone:'',
  experience:'',

  profilePhoto:'',
  desc:'',
  title:'',
  clientEmail:'',
  clientFullName:'',
  clientContactNo:'',
  clientDesignation:'',


   title:'',
    desc:'',
    status:'',
    assignTo:'',
    priority:'',
  
};

const reducer = (state=initialState,action) => {

  switch (action.type) {
    case 'LOGIN':

    return { email:state.email=action.payload[0].email,
      password: action.payload[0].password  ,
      _id:state._id= action.payload[1],
      name:state.name=action.payload[2],
      tasks:state.tasks=action.payload[3],
      userRole:state.userRole=action.payload[4],
      profilePhoto:state.profilePhoto=action.payload[5],
      phone:state.phone=action.payload[6],
      experience:state.experience=action.payload[7],

    }
    case 'EDIT':
    return{
      email:state.email=action.payload[0].email,
      password: action.payload[0].password  ,
      _id:state._id= action.payload[1],
      name:state.name=action.payload[2],
      tasks:state.tasks=action.payload[3],
      userRole:state.userRole=action.payload[4],
      profilePhoto:state.profilePhoto=action.payload[5],
      phone:state.phone=action.payload[6],
      experience:state.experience=action.payload[7],
       profilePhoto:state.profilePhoto=action.payload[8].profilePhoto
    }

    case 'EDITPROJECT':
    return{
      desc:state.desc=action.payload.desc,
      title:state.title=action.payload.title,
      clientEmail:state.clientEmail=action.payload.clientEmail,
      clientFullName:state.clientFullName=action.payload.clientFullName,
      clientContactNo:state.clientContactNo=action.payload.clientContactNo,
      clientDesignation:state.clientDesignation=action.payload.clientDesignation

    }
     case 'EDITTASKS':
    return{
      desc:state.desc=action.payload.desc,
      title:state.title=action.payload.title,
       status:state.status=action.payload.status,
        assignTo:state.assignTo=action.payload.assignTo,
         // priority:state.priority=action.payload.priority,
     

    }
    case 'REGISTER':
    return { email:action.payload.email,
      password: action.payload.password }             
    }

    return state
  }
  const store = createStore(reducer)

   

  export default class App extends React.Component {
    state = {
        backClickCount: 0
    };
    
      componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
 _spring() {
        this.setState({backClickCount: 1}, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.15 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({backClickCount: 0});
            });
        });

    }

  handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

        return true;
    };


    constructor(props){
      super(props);
      this.state = {
        value: [],

      };
       this.springValue = new Animated.Value(100);
    }

    componentDidMount= async()=>{
      const value = await  AsyncStorage.getItem('email');
      if (value !== null) {
        console.log("appjs  ==",value);
        this.setState({value: value});       
      }  

    }
    render() {
      if(this.state.value==false){
        return(
          <View style={styles.container}>
          <Provider store={store}>
          <Routes />
          <View >
               

           <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
           <Text style={styles.exitTitleText}>press back again to exit the app</Text>

           <TouchableOpacity
           activeOpacity={0.5}
           onPress={() => BackHandler.exitApp()}
           >
           <Text style={styles.exitText}>Exit</Text>
           </TouchableOpacity>

           </Animated.View>
           </View>
          </Provider>
          </View>
          )
      }
      else{
        return (
          <View style={styles.container}>
          <Provider store={store}>
          <Routes2 />
          <View >
               

           <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
           <Text style={styles.exitTitleText}>press back again to exit the app</Text>

           <TouchableOpacity
           activeOpacity={0.5}
           onPress={() => BackHandler.exitApp()}
           >
           <Text style={styles.exitText}>Exit</Text>
           </TouchableOpacity>

           </Animated.View>
           </View>
          </Provider>
          </View>
          );
      }
      // return(
      //   <View style={styles.container}><Text>Hello World!</Text></View>
      // );
    }
  }

  const styles = StyleSheet.create({
     container: {
      flex: 1,
      backgroundColor: '#fff',
    },
     animatedView: {
        width,
        backgroundColor: "#4b415a",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#fff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
  });

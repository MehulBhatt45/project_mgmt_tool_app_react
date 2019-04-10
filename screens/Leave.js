import React from 'react';
import { StyleSheet, Text, View ,TouchableHighlight, TextInput,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import MenuButton from '../components/MenuButton'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import Calendar from 'react-native-calendar-select';
import { connect } from 'react-redux'
import axios from 'axios'
import Icon from "react-native-vector-icons/MaterialIcons";

import Toast from 'react-native-simple-toast';
import Config from '../config'

 let config = new Config()

class Leave extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      date:[],

      fetching: false,
      isDateTimePickerVisible: false,
      isDateTimePickerVisible2: false,
      value: '',
      text:'',
      startDate: '',  
      endDate: ''
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked1: ', date);
    this.setState({date: date});
    this._hideDateTimePicker();
    this.setState({fetching: false})
  };

  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    this.calendar && this.calendar.open();
  }


  showDate(){
    console.log("startdate:",this.state.startDate);
    console.log("startdate:",this.state.endDate); 

    let customI18n = {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Start date',
        'end': 'End date',
        'date': 'Date',
        'save': 'Confirm',
        'clear': 'Reset'
      },
      'date': 'DD / MM'  
    };

    let color = {
      subColor: '#f0f0f0'
    };
    if(this.state.fetching == false){

      console.log("date==",this.state.date);
      
      return(
        <View>
        <View style={{flex:1,flexDirection: 'row'}}>
        <View>
        <Icon name="date-range" size={30}  style={{marginTop:20 , marginLeft:18 , color:'#372e5f'}}/>
        </View>
        <View style={styles.cards1}>
        <TouchableHighlight onPress={this._showDateTimePicker}>
        <Text >For one Day</Text>
        </TouchableHighlight>
        </View>

        <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker} />

        </View>

        <View style={{flex:1, marginTop:50,flexDirection: 'row'}}>
        <View>
        <Icon name="date-range" size={30} style={{marginTop:20 , marginLeft:18 , color:'#372e5f'}} />
        </View>
        <View style={styles.cards1}>
        <TouchableHighlight onPress={this.openCalendar}>
        <Text >For More Days </Text>
        </TouchableHighlight>
        </View>
        <Calendar
        i18n="en"
        ref={(calendar) => {this.calendar = calendar;}}
        customI18n={customI18n}
        color={color}
        format="YYYYMMDD"
        minDate="20190101"
        maxDate="20501231"
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onConfirm={this.confirmDate} />
        </View>
        </View>
        )
    }
  }
  render=()=> {
    console.log("value==",this.state.value);
    return (
      <View >
      <Header style={{ backgroundColor: '#4b415a',height:80}}>
      <MenuButton navigation={this.props.navigation} />
      <Text style={styles.text}>Apply Leave</Text>
      </Header>
      {this.showDate()}

      <View> 
      <Text style={{color:'black',fontSize: 20,marginTop:80,marginLeft:20}}>Reason:</Text>
      <RadioButton.Group
      onValueChange={value => this.setState({ value })}
      value={this.state.value}>
      <View>
      <View style={{flexDirection:'row',marginLeft:20}}>
      <RadioButton value="Sick Leave" />
      <Text style={{marginTop:8}}>Sick Leave</Text>
      </View>

      <View style={{flexDirection:'row',marginLeft:20}}>
      <RadioButton value="Emergency leave" />
      <Text style={{marginTop:8}}>Emergency leave</Text>
      </View>

      <View style={{flexDirection:'row',marginLeft:20}}>
      <RadioButton value="without pay" />
      <Text style={{marginTop:8}}>without pay</Text>
      </View>

      <View style={{flexDirection:'row',marginLeft:20}}>
      <RadioButton value="Personal Leave" />
      <Text style={{marginTop:8}}>Personal Leave</Text>
      </View>
      </View>

      </RadioButton.Group>
      </View>
      <View>
      <Text style={{color:'black',fontSize: 20,marginTop:10,marginLeft:20}}>Reason For Leave :-</Text>
      </View>

      <TextInput
      style={styles.textarea}
      multiline = {true}
      numberOfLines = {4}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text} />

      <View style={styles.inputContainer1}>
      <TouchableHighlight style={[styles.buttonContainer, styles.savechangebtn]}
      onPress={() => this.props.leave(this.state.date,this.state.startDate,this.state.endDate,this.state.value,this.state.text)}>
      <Text style={styles.signUpText}>Submit</Text>
      </TouchableHighlight>

      </View>
      </View>
      );
  }
}

function mapDispatchToProps(onProps) {

  return{
    leave:(date,startDate, endDate, value, text)=>{   
      var body={date: date , startDate: startDate,endDate:endDate , value:value, text:text}

      axios.post(config.getBaseUrl()+"leave/add-leave",body).then(res=>{
        console.log("leave====>",body);
        Toast.show('Submit Leave successfully ');

      },err=>{
        console.log({err: err});
      }).catch(function(error){
        console.log(error);
      })
    }
  }
}

export default connect( mapDispatchToProps)(Leave)

const styles = StyleSheet.create({

  text: {
    fontSize: 20,
    color:'white',
    justifyContent: 'center',
    marginTop:40
  },
  cards:{
    marginTop:20,
    elevation:5,
    marginLeft:5,
    marginRight:5,
  },
  cards1:{ 
    marginTop:20,
    elevation:5,
    backgroundColor: '#e7e7e7',  
    height:30,
    marginLeft:20,
    marginRight:5,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  inputContainer1:{
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ffffff',
    marginLeft:5,
    marginRight:5,
    height:55,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    marginTop:10
  },

  textarea: {
    textAlignVertical: 'top',  
    fontSize: 14,
    color: '#333',
    marginLeft:20,
    marginRight:20,
    borderColor: '#fff',
    borderColor: '#000000',
    borderRadius: 4,
    borderWidth: 0.5,


  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:120,
    borderRadius:30,

  },
  savechangebtn: {
    backgroundColor: "#372e5f",
    alignItems:'center',
    justifyContent: 'center', 

  },
  signUpText: {
    color: 'white',
  },
});



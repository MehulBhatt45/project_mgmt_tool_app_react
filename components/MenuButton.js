import React from 'react'
import { StyleSheet } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
import Icon from "react-native-vector-icons/MaterialIcons";

export default class MenuButton extends React.Component {
	render() {
		return(
			<Icon name="add" color="#3498DB" size={30} style={styles.menuIcon} onPress={() => this.props.navigation.toggleDrawer()}/>
		)
	}
}

const styles = StyleSheet.create({
	menuIcon: {
		zIndex: 9,
		position: 'absolute',
		top: 40,
		left: 20,
	}
})
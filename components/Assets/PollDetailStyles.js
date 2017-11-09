import {StyleSheet} from 'react-native'

export default StyleSheet.create({
	activityIndicator: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3F51B5',
		flexDirection: 'column',
		paddingTop: 25
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white'
	},
	radioStyle: {
		borderRightWidth: 1,
		borderColor: '#2196f3',
		paddingRight: 10
	},
	radioButtonWrap: {
		marginRight: 5
	},
});
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1
	},
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
	text: {
		color: 'white',
		paddingHorizontal: 8,
		fontSize: 16
	},
	rowStyle: {
		flexDirection: "row",
		paddingVertical: 20,
		paddingLeft: 8,
		paddingRight: 8,
		borderTopColor: 'white',
		borderLeftColor: 'white',
		borderRightColor: 'white',
		borderBottomColor: '#E0E0E0',
		borderWidth: 1
	},
	rowText: {
		color: '#212121',
		fontSize: 16,
		marginLeft: 5
	},
	subText: {
		fontSize: 14,
		color: '#757575'
	},
	section: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		padding: 6,
		backgroundColor: '#2196F3'
	}
});
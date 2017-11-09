import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	Image,
	ListView,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import styles from "./Assets/ListPollStyles";

var POLLS_URL = 'https://pollap.herokuapp.com/api/sondages';

import Details from './Details';

export default class PollsList extends Component {
	
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
		this.bindMethods();
	}

	bindMethods() {
		if (! this.bindableMethods) {
			return;
		}

		for (var methodName in this.bindableMethods) {
			this[methodName] = this.bindableMethods[methodName].bind(this);
		}
	}

	onLearnMore(poll) {
	    this.props.navigation.navigate('Details', { ...poll });
	}

	getInitialState() {

		var getRowData = (dataBlob, sectionID, rowID) => {
			return dataBlob[sectionID][rowID];
		}

		return {
			loaded : false,
			dataSource : new ListView.DataSource({
				getRowData              : getRowData,
				rowHasChanged           : (row1, row2) => row1 !== row2
			})
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData () {
		fetch(POLLS_URL).then((response) => response.json()).then((responseData) => {
			var polls = responseData,
			length = polls.length,
			dataBlob = {},
			poll,
			i

			for (i = 0; i < length; i++) {
				poll = polls[i];
				dataBlob[poll.id] = poll;
			}
			this.setState({
				dataSource : this.state.dataSource.cloneWithRows(dataBlob),
				loaded     : true
			});

		}).done();
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return this.renderListView();
	}

	renderLoadingView() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>Polls List</Text>
				<View style={styles.container}>
					<ActivityIndicator 
						animating={!this.state.loaded} 
						style={[styles.activityIndicator, {height: 80}]}
						size="large"
					/>
				</View>
			</View>
		);
	}

	renderListView() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Polls List</Text>
				</View>
				<ListView
					dataSource 	= {this.state.dataSource}
					style 		= {styles.listview}
					renderRow 	= {this.renderRow}
				/>
			</View>
        );
    }

}

Object.assign(PollsList.prototype, {
	bindableMethods : {
		renderRow : function (rowData) {
			return (
				<TouchableOpacity onPress={() => this.onLearnMore(rowData)}>
					<View style={styles.rowStyle}>
						<Image style={{width: 50, height: 50}} source={{ uri: rowData.picture.path }} />
						<Text style={styles.rowText}>{rowData.title}</Text>        
					</View>
				</TouchableOpacity>
			);
		},
	}
});
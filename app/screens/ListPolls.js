import React, { Component } from 'react';
import { Spinner, Text, View, Content, Container, Header, Body, Title, Button, 
	Icon, ListItem, List, Thumbnail } from 'native-base';
import {AsyncStorage} from 'react-native';
var POLLS_URL = 'https://pollap.herokuapp.com/api/sondages';

import styles from './../styles/ListPolls';
import Details from './Details';

export default class PollsList extends Component {
	// constructor
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}
	// OnPress navigation
	OnPressPoll(poll) {
	    this.props.navigation.navigate('Details', { ...poll });
	}
	// Init state
	getInitialState() {
		const date = new Date();
		return {
			polls_loaded : false,
			categories_loaded : false,
			polls_result: [],
			categories_result: [],	
			today: date.getDate() + '_' + parseInt(date.getMonth()+1) + '_' + date.getFullYear()			
		}
	}
	// fetch data on component mount
	componentDidMount() {
		AsyncStorage.getItem('LISTPOLLS' + '_' + this.state.today, (err, result) => {
			if( result!==null ){
				this.setState({
					polls_result: JSON.parse(result),					
					polls_loaded: true
				});
			}else{	
				this.fetchPollsData();
			}
		});
	}
	fetchPollsData () {			
		fetch(POLLS_URL).then((response) => response.json()).then((responseData) => {
			this.setState({
				polls_result: responseData,
				polls_loaded     : true
			});
			AsyncStorage.setItem('LISTPOLLS' + '_' + this.state.today, JSON.stringify(responseData));
		})
		.catch(function(error) {
			this.setState({
				polls_loaded: false
			});
		});
	}
	// format date
	renderDate(poll_date) {
		let parsed_date = new Date(poll_date),
			mount = ("0" + parsed_date.getMonth()).slice(-2),
			day = ("0" + parsed_date.getDay()).slice(-2),
			year = parsed_date.getFullYear();
		return mount+'/'+day+'/'+year;
	}
	
	render() {
		return( 
			<Container>
				<Header hasTabs>
					<Body>
						<Title>Polls List</Title>
					</Body>
				</Header>
				<Content>
					<View>
					{ !this.state.polls_loaded ? <Spinner /> : <List dataArray={this.state.polls_result} renderRow={(item) =>
						<ListItem style={styles.pollItem} button onPress={()=>this.OnPressPoll(item)} divider>
							<View style={ styles.containerRow }>
								<Thumbnail circular size={100} source={{uri: item.picture.path}} style={{marginRight:5}}/>
								<View>
									<Text numberOfLines={1} ellipsizeMode='tail' style={{color: 'blue',width: 250}}>{item.title.toUpperCase()}</Text>
									<Text numberOfLines={1} style={{width: 250}}>{ item.description.toLowerCase() }</Text>
									<Text note>{ this.renderDate(item.start_date) }</Text>																						
								</View>
							</View>
							<Icon name="ios-arrow-forward" style={ styles.iconList }/>
						</ListItem>
					} />}
					</View>
				</Content>
			</Container>
		);
	}
}
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight,
	ActivityIndicator,
	Button
} from 'react-native';

import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import styles from './Assets/PollDetailStyles';

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			pollid: this.props.navigation.state.params.id,
			poll_title: this.props.navigation.state.params.title,
			loaded : false
		};
	}

	componentDidMount() {
		this._fetchData(this.state.pollid);
	}

	_fetchData (pollid) {
		let POLL_API = 'https://pollap.herokuapp.com/api/sondages/'+pollid;
		fetch(POLL_API).then((response) => response.json()).then((responseData) => {
			this.setState({
				poll: responseData,
				loaded     : true
			});

		}).done();
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingPollView();
		}

		return this.renderPollView();
	}


	renderLoadingPollView() {
		return (
			<View>
				<View>
					<View>
						<Text style={styles.poll_title}>{ this.state.poll_title }</Text>
					</View>
				</View>
			</View>
		);
	}

	renderPollView(){
		const poll = this.state.poll;
		return (
			<View>
				<View>
					<View>
						<Text style={styles.poll_title}>{ poll.title }</Text>
						<View style={{flexDirection:'row'}}>
							<Image style={{width: 200, height: 200}} source={{ uri: poll.picture.path }} />
							<View style={{flex:1}}>
							{

								poll.sondage_responses.map((obj, i) => {
								var that = this;
								
								var onPress = (value, index) => {
									this.setState({
										chosenValue: value,
									})
								}
								obj.label = obj.title;
								obj.value = obj.id;
								var is_selected =   this.state.chosenValue == obj.value;
								
								return (
									<RadioButton 
										labelHorizontal={true} key={i}>
										<RadioButtonLabel
											obj={obj}
											index={i}
											onPress={onPress}
											labelStyle={{fontWeight: 'bold', color: '#2ecc71'}}
											labelWrapStyle={{}}
										/>
										<RadioButtonInput
											obj={obj}
											index={i}
											isSelected={is_selected}
											onPress={onPress}
											buttonInnerColor={'#f39c12'}
											buttonOuterColor={is_selected ? '#2196f3' : '#000'}
											buttonSize={30}
											buttonStyle={{}}
											buttonWrapStyle={{marginLeft: 10}}
										/>
									</RadioButton>
								)

							})}
							</View>
						</View>
					</View>
				
					<View>
						<Text style={styles.poll_description}> {poll.description} </Text>
					</View>
				</View>
			</View>
		);
	}
}
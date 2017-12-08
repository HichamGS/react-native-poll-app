import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ListPolls from './../screens/ListPolls';
import PollDetail from './../screens/Details';


export const PollStack = StackNavigator({
	ListPolls: {
		screen: ListPolls,
		navigationOptions: {
			header: null,
		},
	},
	Details: {
		screen: PollDetail,
		navigationOptions: {
			header: null,
		},
	},
});

export const Root = StackNavigator({
	PollsList: {
		screen: PollStack,
	},
});
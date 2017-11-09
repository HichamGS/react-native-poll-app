import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ListPolls from '../ListPolls';
import PollDetail from '../Details';


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
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import BMIScreen from './screens/BMIScreen';
import BMRScreen from './screens/BMRScreen';
import WeightTargetScreen from './screens/WeightTargetScreen';


const TabNavigator = createBottomTabNavigator({
  BMIScreen: BMIScreen,
  BMRScreen: BMRScreen,
  WeightTargetScreen: WeightTargetScreen,
});

export default createAppContainer(TabNavigator);

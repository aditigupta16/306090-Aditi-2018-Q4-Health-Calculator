import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import BMIScreen from './screens/BMIScreen';
import BMRScreen from './screens/BMRScreen';
import WeightTargetScreen from './screens/WeightTargetScreen';
import MealListScreen from './screens/MealListScreen';


const TabNavigator = createBottomTabNavigator({
  BMI: BMIScreen,
  BMR: BMRScreen,
  WeightTarget: WeightTargetScreen,
  Meals: MealListScreen,
});

export default createAppContainer(TabNavigator);

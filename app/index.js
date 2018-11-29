import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class BMIScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your BMI calculator. Coming Soon!</Text>
      </View>
    );
  }
}

class BMRScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your BMR calculator. Coming Soon!</Text>
      </View>
    );
  }
}

class WeightTargetScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your Weight Target calculator. Coming Soon!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  BMIScreen: BMIScreen,
  BMRScreen: BMRScreen,
  WeightTargetScreen: WeightTargetScreen,
});

export default createAppContainer(TabNavigator);
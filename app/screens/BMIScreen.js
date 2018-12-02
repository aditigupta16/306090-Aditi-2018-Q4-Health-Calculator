import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class BMIScreen extends React.Component {

  handlePress() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter your weight (pounds)"
            />
           <Text> Weight </Text>
           <TextInput
             style={{height: 40}}
             placeholder="Enter your height (cms)"
             />
            <Text> Height </Text>
            <Button
            onPress={this.handlePress}
            title="Calculate"

          />
      </View>
    );
  }
}

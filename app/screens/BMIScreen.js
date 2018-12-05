import React from "react";
import { Text, View, TextInput, Button } from "react-native";

export default class BMIScreen extends React.Component {
  handlePress = (weight, height) => {
    fetch("http://localhost:8000/api/bmi-calculator/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weight: this.state.weight,
        height: this.state.height
      })
    })
      .then(response => response.json())

      .catch(error => {
        console.error(error);
      });
  };
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      error: false
    };

    this.handlePress = this.handlePress.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter your weight (pounds)"
          onChangeText={weight => this.setState({ weight })}
        />
        <Text> Weight </Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter your height (cms)"
          onChangeText={height => this.setState({ height })}
        />
        <Text> Height </Text>
        <Button onPress={this.handlePress} title="Calculate" />
      </View>
    );
  }
}

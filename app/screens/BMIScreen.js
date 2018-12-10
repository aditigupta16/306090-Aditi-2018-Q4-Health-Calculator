import React from "react";
import { Text, View, TextInput, Button } from "react-native";

export default class BMIScreen extends React.Component {
  handlePress = (weight, height) => {
    fetch("http://192.168.86.49:8000/api/bmi-calculator/", {
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
      .then(data => {
        this.setState({ bmi: data.bmi });
        console.log(this.state.bmi);
      })
      .catch(error => {
        console.error(error);
      });
  };
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      weight: "",
      error: false,
      bmi: ""
    };
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
        <View>
          {this.state.bmi ? (
            <Text> Your BMI is {this.state.bmi}</Text>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

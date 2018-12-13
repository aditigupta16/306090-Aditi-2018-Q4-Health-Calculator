import React from "react";
import { Text, View, TextInput, Button, Picker } from "react-native";

export default class BMIScreen extends React.Component {
  handlePress = (weight, height, age, gender, activity) => {
    fetch("http://192.168.86.76:8000/api/bmr-calculator/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weight: this.state.weight,
        height: this.state.height,
        age: this.state.age,
        gender: this.state.gender,
        activity: this.state.activity
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          total_calories_required: data.total_calories_required
        });
        console.log(this.state.total_calories_required);
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
      age: "",
      gender: "",
      activity: "",
      total_calories_required: ""
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter your weight (kgs)"
          onChangeText={weight => this.setState({ weight })}
        />
        <Text> Weight </Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter your height (cms)"
          onChangeText={height => this.setState({ height })}
        />
        <Text> Height </Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter your age (years)"
          onChangeText={age => this.setState({ age })}
        />
        <Text> Age </Text>

        <Picker
          selectedValue={this.state.gender}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ gender: itemValue })
          }
        >
          <Picker.Item label="male" value="male" />
          <Picker.Item label="female" value="female" />
        </Picker>
        <Text> Gender </Text>

        <Picker
          selectedValue={this.state.activity}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ activity: itemValue })
          }
        >
          <Picker.Item label="sedentary" value="sedentary" />
          <Picker.Item label="lightly active" value="lightly active" />
          <Picker.Item label="moderately active" value="moderately active" />
          <Picker.Item label="very active" value="very active" />
          <Picker.Item label="extra active" value="extra active" />
        </Picker>
        <Text> Activity </Text>

        <Button onPress={this.handlePress} title="Calculate" />
        <View>
          {this.state.total_calories_required ? (
            <Text>
              {" "}
              You require {this.state.total_calories_required} Calories everyday
              to maintain your weight.
            </Text>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

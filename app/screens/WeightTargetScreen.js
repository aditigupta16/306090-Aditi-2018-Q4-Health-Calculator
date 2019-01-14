import React from "react";
import { Text, View, TextInput, Button, Picker } from "react-native";

export default class WeightTarget extends React.Component {
  handlePress = (weight, height, age, gender, activity, target, days) => {
    fetch("http://192.168.1.3:8000/api/weight-target-calculator/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weight: this.state.weight,
        target: this.state.target,
        height: this.state.height,
        age: this.state.age,
        gender: this.state.gender,
        activity: this.state.activity,
        target: this.state.target,
        days: this.state.days,
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          calories_required_to_consume: data.calories_required_to_consume
        });
        console.log(this.state.calories_required_to_consume);
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
      calories_required_to_consume: "",
      target: ""
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
        placeholder="Enter your target weight (kgs)"
        onChangeText={target => this.setState({ target })}
      />
        <Text> Target Weight </Text>

        <TextInput
        style={{ height: 40 }}
        placeholder="Days to lose weight"
        onChangeText={days => this.setState({ days })}
      />
        <Text> Days</Text>
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
          {this.state.calories_required_to_consume ? (
            <Text>
              {" "}
              You require {this.state.calories_required_to_consume} Calories everyday
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

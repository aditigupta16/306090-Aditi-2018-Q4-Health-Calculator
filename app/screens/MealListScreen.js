import React from "react";
import { View,Image,  FlatList, TouchableOpacity,
         Text, StyleSheet } from 'react-native';



export default class MealList extends React.Component{

    state = {
        mealList : [],
    }
    async componentDidMount(){
        try {
            const MealApiCall = await fetch('http://192.168.1.5:8000/api/meals/');
            const meals = await MealApiCall.json();
            this.setState({mealList:meals});
        }
        catch(err){
            console.log("Error fetching data", err);

        }
    }

    renderItem(data) {
        return <TouchableOpacity>
                    <View style={styles.listItemContainer}>
                        <Text style={styles.pokeItemHeader}>{data.item.name}</Text>
                        
                    </View> 
                </TouchableOpacity>
    }
    render() {
        const { mealList } = this.state;

            return <FlatList 
                    data={mealList}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.name} 
                    />
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listItemContainer: {
    borderStyle: 'solid',
    borderColor: '#fff',
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
    },
    mealItemHeader: {  
    color: '#fff',
    fontSize: 24,
    },
});
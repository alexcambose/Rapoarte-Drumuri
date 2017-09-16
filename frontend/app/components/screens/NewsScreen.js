import React from 'react';
import { View } from "react-native";
import NewsScreenStyle from "../../styles/screens/News";
import NewsList from "../NewsList";

class NewsScreen extends React.Component{
    constructor(){
        super();
    }
    onItemPress(index){
        this.props.navigation.navigate('newsItem', {index});
    }
    render(){
        return (
            <View style={NewsScreenStyle.view}>
                <NewsList onItemPress={index => this.onItemPress(index)}/>
            </View>
        );
    }
}


export default NewsScreen;
import React from 'react';
import PropTypes from 'proptypes';
import { Text, TouchableNativeFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const buttonSize = 30;

class CLikeButton extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        const { onPress, text, highlighted } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={()=>onPress()}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{flex: 1, flexDirection: 'row', height:buttonSize, alignItems:'center', justifyContent:'center'}}>
                    <Icon name={highlighted ? "thumbs-up" : "thumbs-o-up" } color="#666" size={16}/>
                    <Text style={{marginLeft: 6}}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

CLikeButton.proptypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string,
    highlighted: PropTypes.bool
};

export default CLikeButton;
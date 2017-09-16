import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Proptypes from 'proptypes';
import { Text, TouchableHighlight, View } from "react-native";
import CActionButtonStyle from '../../styles/core/CActionButton';
class CActionButton extends React.Component{
    render(){
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={CActionButtonStyle.view}
                underlayColor={CActionButtonStyle.$activeColor}
            >
                <View >
                    <Text style={CActionButtonStyle.text}><Icon size={CActionButtonStyle.$iconSize} name={this.props.iconName}/></Text>
                </View>
            </TouchableHighlight>
        );
    }
}

CActionButton.defaultProps = {
    iconName: 'add'
};

CActionButton.proptypes = {
    onPress: Proptypes.func.isRequired,
};

export default CActionButton;
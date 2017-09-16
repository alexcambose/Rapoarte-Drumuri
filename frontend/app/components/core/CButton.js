import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import PropTypes from 'proptypes';
import CButtonStyle from '../../styles/core/CButton';

class CButton extends React.Component{
    render(){
        if(this.props.visible)
            return(
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={CButtonStyle.view}>
                        <Text style={CButtonStyle.text}>{this.props.label}</Text>
                        <View style={CButtonStyle.iconView}>{this.props.icon}</View>
                    </View>
                </TouchableNativeFeedback>
            );
        else return null;
    }
}
CButton.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    icon: PropTypes.object,
};
CButton.defaultProps = {
    visible: true,
};
export default CButton;
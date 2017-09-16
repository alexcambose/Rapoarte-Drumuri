import React from 'react';
import { Keyboard, View } from 'react-native';
import PropTypes from 'proptypes';


class CHideOnKeyboardView extends React.Component{
    constructor(){
        super();
        this.state = {
            keyboardVisible: false
        }
    }
    componentWillMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>this.setState({keyboardVisible:true}));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>this.setState({keyboardVisible:false}));
    }
    componentWillUnmount(){
        this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener.remove();
    }
    render(){
        if( (!this.state.keyboardVisible && !this.props.inverse) || (this.state.keyboardVisible && this.props.inverse))
            return(
                <View {...this.props}>
                    {this.props.children}
                </View>
            );
        else return null;
    }
}
CHideOnKeyboardView.propTypes = {
    inverse: PropTypes.bool
};
export default CHideOnKeyboardView;
import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'proptypes';
import CTextInputStyle from '../../styles/core/CTextInput';
import CText from "./CText";

class CTextInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.initialValue || '',
        };
    }
    componentWillReceiveProps(nextProps){

    }
    onChangeText(value){
        //check if current length is smaller than maxLength or just set state if maxlength isn't set
        if(value.length <= this.props.maxLength || !this.props.maxLength){
            if(this.props.ucfirst) value = value[0].toUpperCase() + value.slice(1);
            this.setState({value});
            if(this.props.onValueChange) this.props.onValueChange(value);
        }

    }
    onEndEditing(){
        if(this.props.onEndEditing) this.props.onEndEditing(this.state.value);
    }
    render(){
        const { errorText, maxLength } = this.props;
        const left = maxLength - this.state.value.length;
        return(
            <View style={CTextInputStyle.view}>
                <TextInput
                    {...this.props}
                    value={this.state.value}
                    style={[this.props.style, (errorText ? CTextInputStyle.errorInput : {})]}
                    onChangeText={value=>this.onChangeText(value)}
                    onEndEditing={()=>this.onEndEditing()}

                />
                {errorText ?
                    <CText error>{errorText}</CText>
                : null}
                {maxLength ?
                    <View style={CTextInputStyle.maxLengthView}>
                        {this.state.value.length ?
                            <CText error={left === 0} color={CTextInputStyle.$maxLengthTextColor}>
                                {left}
                                {left > 19 ? ' de' : ''}
                                {' caractere ramase'}
                            </CText>
                            :
                            <View>
                                {!this.props.hideMaxLengthLabel ? <CText color={CTextInputStyle.$maxLengthTextColor}>
                                    Maximum {maxLength} de caractere
                                </CText> : null}
                            </View>
                        }
                    </View>
                : null}
            </View>
        );
    }
}
CTextInput.propTypes = {
    onEndEditing: PropTypes.func,
    onValueChange: PropTypes.func,
    errorText: PropTypes.string,
    maxLength: PropTypes.number,
    maxLengthColor: PropTypes.string,
    hideMaxLengthLabel: PropTypes.bool,
    ucfirst: PropTypes.bool,
    initialValue: PropTypes.string,
};
export default CTextInput;
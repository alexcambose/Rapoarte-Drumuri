import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'proptypes';
import CTextStyle from "../../styles/core/CText";



class CText extends React.Component{
    render(){
        const bold = (this.props.bold ? {fontWeight: '700'} : {});
        const center = (this.props.center ? {textAlign: 'center'} : {});
        const italic = (this.props.italic ? {fontStyle: 'italic'} : {});
        const accentColor = (this.props.accentColor ? CTextStyle.accentColor : {});
        const primaryColor = (this.props.primaryColor ? CTextStyle.primaryColor : {});
        const secondaryColor = (this.props.secondaryColor ? CTextStyle.secondaryColor : {});
        const error = (this.props.error ? CTextStyle.error : {});
        if(this.props.visible)
            return(
               <Text style={[(this.props.color ? {color: this.props.color} : {}),italic, center, bold, accentColor,  primaryColor, secondaryColor, error,]}  {...this.props}  >
                   {this.props.children}
               </Text>
            );
        else return null;
    }
}
CText.defaultProps = {
    visible: true
};
CText.propTypes = {
    color: PropTypes.string,
    center: PropTypes.bool,
    bold: PropTypes.bool,
    accentColor: PropTypes.bool,
    primaryColor: PropTypes.bool,
    secondaryColor: PropTypes.bool,
    error: PropTypes.bool,
    visible: PropTypes.bool,
};
export default CText;
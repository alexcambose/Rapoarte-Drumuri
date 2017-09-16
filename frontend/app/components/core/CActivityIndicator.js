import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'proptypes';
import CActivityIndicatorStyle from '../../styles/core/CActivityIndicator';

class CActivityIndicator extends React.Component{
    render(){
        if(this.props.visible)
            return(
                <View style={CActivityIndicatorStyle.view}>
                    <ActivityIndicator animating={this.props.visible} size={CActivityIndicatorStyle.$size} color={CActivityIndicatorStyle.$color}/>
                </View>
            );
        else return null;
    }
}
CActivityIndicator.propTypes = {
    visible: PropTypes.bool
};
CActivityIndicator.defaultProps = {
    visible: true,
};
export default CActivityIndicator;
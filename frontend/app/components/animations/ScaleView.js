import React from 'react';
import { Animated, Easing } from 'react-native';

class ScaleView extends React.Component{
    state = {
        scale: new Animated.Value(0)
    };

    componentDidMount(){
        Animated.timing(
            this.state.scale,
            {
                toValue: 1,
                easing: Easing.elastic(1),
                duration: 500,
            }
        ).start();
    }

    render(){
        let { scale } = this.state;
        return (
            <Animated.View style={ [this.props.style, {transform: [{scale}],}] }>
                {this.props.children}
            </Animated.View>
        );
    }
}



export default ScaleView;
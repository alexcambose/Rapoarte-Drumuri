import React from 'react';
import { Image, View, TouchableOpacity, StatusBar } from 'react-native';
import AuthScreenStyle from '../../../styles/screens/Auth'
import LoginForm from "../../forms/LoginForm";
import { CText } from "../../core";
import CHideOnKeyboardView from "../../core/CHideOnKeyboardView";

import { NavigationActions } from 'react-navigation'

class LoginScreen extends React.Component{
    constructor(){
        super();
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
    }
    home(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'SignedIn'})
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={AuthScreenStyle.view}>
                <View style={AuthScreenStyle.logoContainer}>
                    <Image
                        style={AuthScreenStyle.logo}
                        source={require('../../../images/logo.png')}
                    />
                </View>
                <View style={AuthScreenStyle.formContainer}>
                    <LoginForm onSuccess={() => this.home()}/>
                </View>
                    <CHideOnKeyboardView style={AuthScreenStyle.footerContainer}>
                        <TouchableOpacity
                            onPress={()=>navigate('Register')}
                        >
                            <View>
                                <CText secondaryColor>
                                    Nu ai cont ? <CText bold accentColor>Creeaza.</CText>
                                </CText>
                            </View>
                        </TouchableOpacity>
                    </CHideOnKeyboardView>
            </View>

        );
    }
}

export default LoginScreen;
import React from 'react';
import { Image, ScrollView, View, TouchableOpacity } from 'react-native';
import AuthScreenStyle from '../../../styles/screens/Auth'
import RegisterForm from "../../forms/RegisterForm";


class RegisterScreen extends React.Component{

    constructor(){
        super();
    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={AuthScreenStyle.view}>
                <View style={AuthScreenStyle.logoContainer}>
                    <Image
                        style={AuthScreenStyle.logo}
                        source={require('../../../images/logo.png')}
                    />
                </View>
                <View style={AuthScreenStyle.formContainer}>
                    <RegisterForm onSuccess={() => this.props.navigation.navigate('Login')}/>
                </View>
            </ScrollView>
        );
    }
}

export default RegisterScreen;
import React from 'react';
import validate from 'validate.js';
import PropTypes from 'proptypes';
import AuthStyle from '../../styles/screens/Auth';
import { View } from 'react-native';
import { CButton, CTextInput, CActivityIndicator, CText } from "../core";
import auth from '../../utils/auth';
import constants from '../../constants';

class LoginForm extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            validationErrors: [],
            formError: '',
            loading: false,
        };
    }
    isValid(){
        const campul_email = this.state.email;
        const campul_parola = this.state.password;

        validate.validators.presence.options = {message: constants.validate.presence};
        validate.validators.email.options = {message: constants.validate.email};

        let errors = validate({campul_email, campul_parola}, {
            campul_email: {presence: true, email: true},
            campul_parola: {presence: true}
        });

        this.setState({validationErrors: (errors ? errors : {})}); //hasOwnProperty will fail because the error var will be undefined

        return !errors;
    }
    handleLogin(){
        if(this.isValid()){

            this.setState({loading: true});

            auth.login(this.state.email, this.state.password)
                .then(user=>{
                    this.props.onSuccess();
                    this.setState({loading: false})
                })
                .catch(err=>{
                    this.setState({loading: false, formError: err})
                });
        }
    }
    render(){
        const { validationErrors, formError } = this.state;
        return (
            <View>
                <CTextInput
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.email}
                    onValueChange={email => this.setState({email})}
                    autoCorrect={false}
                    placeholder="Email"
                    errorText={validationErrors.hasOwnProperty('campul_email') ? validationErrors.campul_email[0] : ''}
                />
                <CTextInput
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.password}
                    onValueChange={(password) => this.setState({password})}
                    placeholder="Parola"
                    errorText={validationErrors.hasOwnProperty('campul_parola') ? validationErrors.campul_parola[0] : ''}
                    secureTextEntry
                />
                <CButton
                    label="Autentificare"
                    onPress={this.handleLogin.bind(this)}
                    visible={!this.state.loading}
                />
                <CActivityIndicator visible={this.state.loading}/>

                <CText visible={!!formError} error >{formError}</CText>
            </View>
        );
    }
}

LoginForm.propTypes = {
    onSuccess: PropTypes.func.isRequired
};

export default LoginForm;
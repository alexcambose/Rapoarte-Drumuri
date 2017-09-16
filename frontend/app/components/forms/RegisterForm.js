import React from 'react';
import { View, Alert } from "react-native";
import { CTextInput, CButton, CText } from "../core/index";
import AuthStyle from "../../styles/screens/Auth";
import validate from 'validate.js';
import constants from '../../constants';
import auth from '../../utils/auth';
import CActivityIndicator from "../core/CActivityIndicator";

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fetching:false,
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cpassword: '',
            validationErrors: {},
        }
    }
    check(){
        const campul_nume_utilizator = this.state.username;
        const campul_email = this.state.email;
        const campul_nume = this.state.last_name;
        const campul_prenume = this.state.first_name;
        const campul_parola = this.state.password;
        const campul_confirma_parola = this.state.cpassword;

        validate.validators.presence.options = {message: constants.validate.presence};
        validate.validators.email.options = {message: constants.validate.email};
        validate.validators.equality.options = {message: constants.validate.equality};
        validate.validators.length.options = {tooShort: constants.validate.length.tooShort};


        let errors = validate({campul_nume_utilizator, campul_email, campul_nume, campul_prenume, campul_parola, campul_confirma_parola}, {
            campul_nume_utilizator : {presence: true},
            campul_email : {presence: true, email: true},
            campul_nume : {presence: true},
            campul_prenume : {presence: true},
            campul_parola: {presence: true, length: {minimum: 6}},
            campul_confirma_parola: {presence: true, equality: 'campul_parola'},
        });

        this.setState({validationErrors: (errors ? errors : {})}); //hasOwnProperty will fail because the error var will be undefined

        return !errors;
    }
    handleRegister(){
        if(this.check()){
            this.setState({fetching: true});
            auth.register(this.state)
                .then(res =>{
                    this.setState({fetching: false});
                    if(!res.success) this.setState({validationErrors: {form: res.message}});
                    else Alert.alert('Succes', this.state.first_name + ', contul tau a fost creat!', [{text: 'Ok', onPress: () => this.props.onSuccess()}]);
                }).catch(err => alert(err));
        }
    }
    render() {
        const { validationErrors, fetching } = this.state;
        return (
            <View>
                <CTextInput
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.username}
                    maxLength={16}
                    hideMaxLengthLabel
                    onValueChange={username => this.setState({username})}
                    autoCorrect={false}
                    placeholder="Nume utilizator"
                    errorText={validationErrors.hasOwnProperty('campul_nume_utilizator') ? validationErrors.campul_nume_utilizator[0] : ''}
                />
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
                    initialValue={this.state.first_name}
                    onValueChange={first_name => this.setState({first_name})}
                    autoCorrect={false}
                    maxLength={20}
                    hideMaxLengthLabel
                    ucfirst
                    autoCapitalize="words"
                    placeholder="Prenume"
                    errorText={validationErrors.hasOwnProperty('campul_nume') ? validationErrors.campul_nume[0] : ''}
                />
                <CTextInput
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.last_name}
                    onValueChange={last_name => this.setState({last_name})}
                    autoCorrect={false}
                    maxLength={20}
                    hideMaxLengthLabel
                    ucfirst
                    autoCapitalize="words"
                    placeholder="Nume"
                    errorText={validationErrors.hasOwnProperty('campul_prenume') ? validationErrors.campul_prenume[0] : ''}
                />
                <CTextInput
                    secureTextEntry
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.password}
                    onValueChange={password => this.setState({password})}
                    autoCorrect={false}
                    placeholder="Parola"
                    errorText={validationErrors.hasOwnProperty('campul_parola') ? validationErrors.campul_parola[0] : ''}
                />
                <CTextInput
                    secureTextEntry
                    style={AuthStyle.input}
                    placeholderTextColor={AuthStyle.$placeholderTextColor}
                    underlineColorAndroid={AuthStyle.$underlineColorAndroid}
                    initialValue={this.state.cpassword}
                    onValueChange={cpassword => this.setState({cpassword})}
                    autoCorrect={false}
                    placeholder="Confirma parola"
                    errorText={validationErrors.hasOwnProperty('campul_confirma_parola') ? validationErrors.campul_confirma_parola[0] : ''}
                />

                <CText error>{validationErrors.hasOwnProperty('form') ? validationErrors.form : ''}</CText>

                {fetching ? <CActivityIndicator/> : <CButton
                    label="Inregistrare"
                    onPress={this.handleRegister.bind(this)}
                /> }
            </View>
        );
    }
}

export default RegisterForm;
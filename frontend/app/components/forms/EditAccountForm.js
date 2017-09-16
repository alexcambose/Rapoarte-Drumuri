import React from 'react';
import { View, Alert } from "react-native";
import EditAccountFormStyle from "../../styles/screens/EditAccount";
import { CText,CTextInput, CButton, CActivityIndicator } from "../core";
import UserStore from '../../stores/UserStore';
import validate from 'validate.js';
import constants from '../../constants';
import { saveProfile } from "../../utils/func";
import { updateUser } from "../../actions";
//TODO test force refresh for production
class EditAccountForm extends React.Component{
    constructor(){
        super();
        const { username, first_name, last_name, email } = UserStore.get();
        this.state = {
            fetching: false,
            username,
            first_name,
            last_name,
            email,
            validationErrors: {},
        };
    }
    check(){
        const campul_nume_utilizator = this.state.username;
        const campul_email = this.state.email;
        const campul_nume = this.state.last_name;
        const campul_prenume = this.state.first_name;

        validate.validators.presence.options = {message: constants.validate.presence};
        validate.validators.email.options = {message: constants.validate.email};


        let errors = validate({campul_nume_utilizator, campul_email, campul_nume, campul_prenume}, {
            campul_nume_utilizator : {presence: true},
            campul_email : {presence: true, email: true},
            campul_nume : {presence: true},
            campul_prenume : {presence: true},
        });

        this.setState({validationErrors: (errors ? errors : {})}); //hasOwnProperty will fail because the error var will be undefined

        return !errors;
    }
    save(){
        if(this.check()){
            this.setState({fetching: true});
            saveProfile(this.state, 'account')
                .then(res => {
                    this.setState({fetching: false});
                    if(!res.success) this.setState({validationErrors: {form: res.message}});
                    else{
                        const { username, first_name, last_name, email } = this.state;
                        updateUser({ username, first_name, last_name, email });
                        Alert.alert('Succes', 'Informatiile au fost salvate');
                    }
                })

        }
    }

    render(){
        const { fetching, username, first_name, last_name, email, validationErrors } = this.state;
            return (
            <View>
                <CText color={EditAccountFormStyle.$textColor} >Nume Utilizator</CText>
                <CTextInput
                    onEndEditing={username => this.setState({username})}
                    initialValue={username}
                    errorText={validationErrors.hasOwnProperty('campul_nume_utilizator') ? validationErrors.campul_nume_utilizator[0] : ''}
                    maxLength={16}
                />
                <CText color={EditAccountFormStyle.$textColor} >Email</CText>
                <CTextInput
                    onEndEditing={email => this.setState({email})}
                    initialValue={email}
                    errorText={validationErrors.hasOwnProperty('campul_email') ? validationErrors.campul_email[0] : ''}

                />
                <CText color={EditAccountFormStyle.$textColor} >Nume</CText>
                <CTextInput
                    onEndEditing={last_name => this.setState({last_name})}
                    initialValue={last_name}
                    maxLength={20}
                    errorText={validationErrors.hasOwnProperty('campul_nume') ? validationErrors.campul_nume[0] : ''}

                />
                <CText color={EditAccountFormStyle.$textColor} >Prenume</CText>
                <CTextInput
                    onEndEditing={first_name => this.setState({first_name})}
                    initialValue={first_name}
                    maxLength={20}
                    errorText={validationErrors.hasOwnProperty('campul_prenume') ? validationErrors.campul_prenume[0] : ''}

                />
                <CText error>{validationErrors.hasOwnProperty('form') ? validationErrors.form : ''}</CText>

                {fetching ? <CActivityIndicator/> : <CButton label="Salveaza" onPress={()=>this.save()}/> }


            </View>
        );
    }
}

export default EditAccountForm;
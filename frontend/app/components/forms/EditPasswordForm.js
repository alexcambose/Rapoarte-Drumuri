import React from 'react';
import { Alert, View } from "react-native";
import EditAccountFormStyle from "../../styles/screens/EditAccount";
import { CText, CTextInput, CButton} from "../core";
import validate from 'validate.js';
import constants from '../../constants';
import { saveProfile } from "../../utils/func";
import CActivityIndicator from "../core/CActivityIndicator";

class EditPasswordForm extends React.Component{
    constructor(){
        super();
        this.state = {
            fetching: false,
            oldPass: '',
            newPass: '',
            cNewPass: '',
            validationErrors: {},
        };
    }
    check(){
        const campul_parola_actuala = this.state.oldPass;
        const campul_parola_noua = this.state.newPass;
        const campul_confirma_parola_noua = this.state.cNewPass;

        validate.validators.presence.options = {message: constants.validate.presence};
        validate.validators.equality.options = {message: constants.validate.equality};
        validate.validators.length.options = {tooShort: constants.validate.length.tooShort};
        let errors = validate({campul_parola_actuala, campul_parola_noua, campul_confirma_parola_noua}, {
            campul_parola_actuala: {presence: true},
            campul_parola_noua: {presence: true, length: {minimum: 6}},
            campul_confirma_parola_noua: {presence: true, equality: 'campul_parola_noua'},
        });

        this.setState({validationErrors: (errors ? errors : {})}); //hasOwnProperty will fail because the error var will be undefined

        return !errors;
    }
    savePassword(){
        if(this.check()){
            this.setState({fetching: true});
            saveProfile(this.state,'password')
                .then(res => {
                    this.setState({fetching: false});
                    if(!res.success) this.setState({validationErrors: {form: res.message}});
                    else Alert.alert('Succes', 'Parola a fost actualizata!');
                });
        }
    }

    render(){
        const { oldPass, newPass, cNewPass, validationErrors, fetching } = this.state;
        return (
            <View>

                <CText color={EditAccountFormStyle.$textColor} >Parola actuala</CText>
                <CTextInput
                    secureTextEntry
                    onEndEditing={oldPass => this.setState({oldPass})}
                    initialValue={oldPass}
                    maxLength={16}
                    errorText={validationErrors.hasOwnProperty('campul_parola_actuala') ? validationErrors.campul_parola_actuala[0] : ''}
                />
                <CText color={EditAccountFormStyle.$textColor} >Parola noua</CText>
                <CTextInput
                    secureTextEntry
                    onEndEditing={newPass => this.setState({newPass})}
                    initialValue={newPass}
                    maxLength={16}
                    errorText={validationErrors.hasOwnProperty('campul_parola_noua') ? validationErrors.campul_parola_noua[0] : ''}
                />
                <CText color={EditAccountFormStyle.$textColor} >Confirma parola noua</CText>
                <CTextInput
                    secureTextEntry
                    onEndEditing={cNewPass => this.setState({cNewPass})}
                    initialValue={cNewPass}
                    maxLength={16}
                    errorText={validationErrors.hasOwnProperty('campul_confirma_parola_noua') ? validationErrors.campul_confirma_parola_noua[0] : ''}
                />
                <CText error>{validationErrors.hasOwnProperty('form') ? validationErrors.form : ''}</CText>
                {fetching ? <CActivityIndicator/> : <CButton label="Salveaza parola" onPress={()=>this.savePassword()}/> }
            </View>
        );
    }
}

export default EditPasswordForm;
import React from 'react';
import PropTypes from 'proptypes';
import { CTextInput, CActivityIndicator } from "../core";
import { View } from "react-native";
import { sendComment } from '../../utils/func';
import CButton from "../core/CButton";
import validate from 'validate.js';
import constants from '../../constants';

class CommentForm extends React.Component{
    constructor(){
        super();
        this.state = {
            content: '',
            fetching: false,
            validationErrors: {},
        };
    }
    send(){
        const { content } = this.state;

        if(this.valid()){
            this.setState({fetching: true});
            sendComment(content, this.props.report_id)
                .then(res=>res.json())
                .then(res=>{
                    this.setState({fetching: false, content: ''});
                    if(res.success && this.props.onSaved) this.props.onSaved();
                })
                .catch(err=>{
                    this.setState({fetching: false});
                    alert(err);
                });
        }

    }
    valid(){
        const campul_comentariu = this.state.content;

        validate.validators.presence.options = {message: constants.validate.presence};
        let errors = validate({campul_comentariu}, {
            campul_comentariu: {presence: true},
        });

        this.setState({validationErrors: (errors ? errors : {})}); //hasOwnProperty will fail because the error var will be undefined

        return !errors;
    }

    render(){
        const { validationErrors } = this.state;
        return (
            <View>
                <CTextInput
                    placeholder="Scrie un comentariu"
                    maxLength={300}
                    multiline
                    onValueChange={content=>this.setState({content})}
                    numberOfLines={4}
                    errorText={validationErrors.hasOwnProperty('campul_comentariu') ? validationErrors.campul_comentariu[0] : ''}
                />
                {this.state.fetching ?
                    <CActivityIndicator/> :
                    <CButton label="Trimite" onPress={()=>this.send()}/>
                }
            </View>
        );
    }
}

CommentForm.proptypes = {
    report_id: PropTypes.number.isRequired,
    onSaved: PropTypes.func
};

export default CommentForm;
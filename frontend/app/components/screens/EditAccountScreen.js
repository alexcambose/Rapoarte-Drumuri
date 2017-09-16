import React from 'react';
import { ScrollView } from "react-native";
import EditAccountForm from "../forms/EditAccountForm";
import EditPasswordForm from "../forms/EditPasswordForm";
import EditAccountStyle from "../../styles/screens/EditAccount";
import CViewSeparator from "../core/CViewSeparator";

class EditAccountScreen extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return (
            <ScrollView style={EditAccountStyle.view}>
                <EditAccountForm/>

                <CViewSeparator/>

                <EditPasswordForm/>

            </ScrollView>
        );
    }
}

export default EditAccountScreen;
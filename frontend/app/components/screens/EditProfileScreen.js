import React from 'react';
import { ScrollView } from "react-native";
import EditProfileForm from "../forms/EditProfileForm";

class EditProfileScreen extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }
    render(){
        return (
            <ScrollView>
                <EditProfileForm/>
            </ScrollView>
        );
    }
}

export default EditProfileScreen;
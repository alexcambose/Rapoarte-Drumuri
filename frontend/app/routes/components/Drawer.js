import React from 'react';
import { Image, ScrollView, Text, View } from "react-native";
import { DrawerItems } from "react-navigation";
import DrawerStyle from '../../styles/routes/Drawer';
import constants from '../../constants';
import { CText } from "../../components/core/index";
import UserStore from '../../stores/UserStore';

class Drawer extends React.Component{
    constructor(){
        super();
        this.state = {
            user: false
        };
    }
    setUser = () => {
        this.setState({user: UserStore.get()});
    };
    componentWillMount(){
        this.setUser();
        UserStore.on('change', this.setUser.bind(this));
    }
    componentWillUnmount(){
        // UserStore.removeListener('change', this.setUser());
    }
    render(){
        const { first_name, last_name,email, profile_image } = this.state.user;



        return (
            <View style={DrawerStyle.container}>
                <View style={DrawerStyle.header}>
                    <View style={DrawerStyle.imageContainer}>
                        <Image source={{uri: constants.SERVER_ROOT + profile_image}} style={DrawerStyle.image}/>

                    </View>
                    <View style={DrawerStyle.nameContainer}>
                        <CText style={DrawerStyle.name}>{first_name + ' ' + last_name}</CText>
                        <CText style={DrawerStyle.email}>{email}</CText>
                    </View>

                </View>
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>
            </View>
        );
    }
}
export default Drawer;
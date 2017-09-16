import React from 'react';
import { StackNavigator } from 'react-navigation';
import StackStyle from '../styles/routes/Stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from "../components/screens/ProfileScreen";
import EditProfile from "./components/EditProfileTab";

export default StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions:({ navigation, screenProps }) => ({
            title: 'Profilul meu',
            headerLeft: <Icon name="menu" style={{marginLeft: 8}} size={30} color={StackStyle.$iconColor}  onPress={() => navigation.navigate('DrawerOpen')} />
        })
    },
    editProfile: {
        screen: EditProfile,
        navigationOptions:{
            title: 'Editeaza profilul'
        }
    }
},{
    navigationOptions: {
        headerStyle: StackStyle.header,
        headerTitleStyle: StackStyle.title,
        headerTintColor: StackStyle.$iconColor,
    }
});

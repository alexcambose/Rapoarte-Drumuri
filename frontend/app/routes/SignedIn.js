import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "./components/Drawer";
import DrawerStyle from '../styles/routes/Drawer';

import Home from "./Reports";

import LogoutScreen from "../components/screens/auth/LogoutScreen";
import Profile from "./Profile";
import About from "./About";
import News from "./News";

const drawer = DrawerNavigator({
    Profile: {
        screen: Profile,
        navigationOptions:{
            drawerLabel: 'Profilul meu',
            drawerIcon: ({ tintColor }) => <MIcon name="account" size={DrawerStyle.$iconSize} color={tintColor} />,
        }
    },
    Home:{
        screen: Home,
        navigationOptions:{
            drawerLabel: 'Rapoarte drumuri',
            drawerIcon: ({ tintColor }) => <MIcon name="road-variant" size={DrawerStyle.$iconSize} color={tintColor} />,
        }
    },
    News:{
        screen: News,
        navigationOptions:{
            drawerLabel: 'Stiri diverse',
            drawerIcon: ({ tintColor }) => <MIcon name="newspaper" size={DrawerStyle.$iconSize} color={tintColor} />,
        }
    },
    About: {
        screen: About,
        navigationOptions:{
            drawerLabel: 'Despre',
            drawerIcon: ({ tintColor }) => <MIcon name="help" size={DrawerStyle.$iconSize} color={tintColor} />,
        }
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions: {
            drawerLabel: 'Deconectare',
            drawerIcon: ({ tintColor }) => <EIcon name="log-out" size={DrawerStyle.$iconSize} color={tintColor} />,
        }
    },
},{
    contentComponent: props =><Drawer {...props}/>,
    contentOptions: {
        inactiveTintColor: DrawerStyle.$inactiveColor,
        activeTintColor: DrawerStyle.$activeColor,
        activeBackgroundColor: DrawerStyle.$activeBackgroundColor,
    },
    initialRouteName: 'Home',

});

export default drawer;
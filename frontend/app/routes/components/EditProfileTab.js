import React from 'react';
import TabStyle from "../../styles/routes/Tab";

import { TabBarBottom, TabNavigator } from "react-navigation";

import EditProfileScreen from "../../components/screens/EditProfileScreen";
import EditAccountScreen from "../../components/screens/EditAccountScreen";

import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default TabNavigator({
    PersonalInfo: {
        screen: EditProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Despre tine',
            tabBarIcon: ({focused})=><FIcon name="info-circle" size={TabStyle.$iconSize} color={focused ? TabStyle.$activeColor : TabStyle.$inactiveColor}/>
        }
    },
    AccountInfo: {
        screen: EditAccountScreen,
        navigationOptions: {
            tabBarLabel: 'Contul tau',
            tabBarIcon: ({focused})=><MIcon name="account-settings-variant" size={TabStyle.$iconSize} color={focused ? TabStyle.$activeColor : TabStyle.$inactiveColor}/>
        }
    },
},{
    tabBarComponent:TabBarBottom,
    tabBarPosition: 'bottom',

    tabBarOptions: {
        activeTintColor: TabStyle.$activeColor,
        inactiveTintColor: TabStyle.$inactiveColor,
        labelStyle: {
            fontSize: TabStyle.$labelFontSize,
        },
        style: {
            backgroundColor: TabStyle.$bgColor,

        },
    }

});
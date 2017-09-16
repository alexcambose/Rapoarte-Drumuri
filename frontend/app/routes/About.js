import React from 'react';
import { StackNavigator } from 'react-navigation';
import StackStyle from '../styles/routes/Stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import AboutScreen from "../components/screens/AboutScreen";

export default StackNavigator({
    About: {
        screen: AboutScreen,
        navigationOptions:({ navigation, screenProps }) => ({
            title: 'Despre',
            headerLeft: <Icon name="menu" style={{marginLeft: 8}} size={30} color={StackStyle.$iconColor}  onPress={() => navigation.navigate('DrawerOpen')} />
        })
    },
},{
    navigationOptions: {
        headerStyle: StackStyle.header,
        headerTitleStyle: StackStyle.title,
        headerTintColor: StackStyle.$iconColor,
    }
});

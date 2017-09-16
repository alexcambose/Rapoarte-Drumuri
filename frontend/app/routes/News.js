import React from 'react';
import { StackNavigator } from 'react-navigation';
import StackStyle from '../styles/routes/Stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NewsScreen from "../components/screens/NewsScreen";
import NewsItemScreen from "../components/screens/NewsItemScreen";

export default StackNavigator({
    News: {
        screen: NewsScreen,
        navigationOptions:({ navigation, screenProps }) => ({
            title: 'Stiri diverse',
            headerLeft: <Icon name="menu" style={{marginLeft: 8}} size={30} color={StackStyle.$iconColor}  onPress={() => navigation.navigate('DrawerOpen')} />
        })
    },
    newsItem: {
        screen: NewsItemScreen,
    },
},{
    navigationOptions: {
        headerStyle: StackStyle.header,
        headerTitleStyle: StackStyle.title,
        headerTintColor: StackStyle.$iconColor,
    }
});

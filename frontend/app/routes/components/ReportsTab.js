import React from 'react';
import { TabBarBottom, TabNavigator } from "react-navigation";
import ReportsScreen from "../../components/screens/ReportsScreen";
import ReportsSearch from "../../components/screens/ReportsSearch";
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import TabStyle from "../../styles/routes/Tab";
import MyReportsScreen from "../../components/screens/MyReportsScreen";

export default TabNavigator({
    Home: {
        screen: ReportsScreen,
        navigationOptions:{
            tabBarLabel: 'Rapoarte',
            tabBarIcon: ({focused})=><Icon name="md-list" size={TabStyle.$iconSize} color={focused ? TabStyle.$activeColor : TabStyle.$inactiveColor}/>
        }
    },
    MyReports: {
        screen: MyReportsScreen,
        navigationOptions: {
            tabBarLabel: 'Rapoartele mele',
            tabBarIcon: ({focused})=><EIcon name="add-to-list" size={TabStyle.$iconSize} color={focused ? TabStyle.$activeColor : TabStyle.$inactiveColor}/>
        }
    },
    Search: {
        screen: ReportsSearch,
        navigationOptions: {
            tabBarLabel: 'Cauta Rapoarte',
            tabBarIcon: ({focused})=><Icon name="md-search" size={TabStyle.$iconSize} color={focused ? TabStyle.$activeColor : TabStyle.$inactiveColor}/>
        }
    },
}, {
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

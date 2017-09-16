import React from 'react';
import { StackNavigator } from 'react-navigation';
import StackStyle from '../styles/routes/Stack';
import AddReportScreen from "../components/screens/AddReportScreen";
import ReportView from "../components/screens/ReportView";
import ReportsTab from "./components/ReportsTab";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from "../components/screens/ProfileScreen";


export default StackNavigator({
    Reports: {
        screen: ReportsTab,
        navigationOptions:({ navigation, screenProps }) => ({
            title: 'Rapoarte drumuri',
            headerLeft: <Icon name="menu" style={{marginLeft: 8}} size={30} color={StackStyle.$iconColor}  onPress={() => navigation.navigate('DrawerOpen')} />
        })
    },
    addReport: {
        screen: AddReportScreen,
        navigationOptions:{
            title: 'Raporteaza drum'
        }
    },
    viewReport: {
        screen: ReportView,
    },
    viewProfile: {
        screen: ProfileScreen,
    },
},{
    navigationOptions: {
        headerStyle: StackStyle.header,
        headerTitleStyle: StackStyle.title,
        headerTintColor: StackStyle.$iconColor,
    }
});

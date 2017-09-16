import React from 'react';
import { View, StatusBar } from "react-native";
import ReportsScreenStyle from '../../styles/screens/Reports';
import { CActionButton } from "../core";
import ReportsList from "../ReportsList";

class ReportsScreen extends React.Component{

    componentDidMount(){
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(0,0,0,.5)');
        StatusBar.setBarStyle('light-content');
    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={ReportsScreenStyle.view}>

                <ReportsList onItemPress={item => navigate('viewReport', {item})}/>
                <CActionButton label="asdasd" onPress={()=>navigate('addReport')}/>
            </View>
        );
    }
}

export default ReportsScreen;
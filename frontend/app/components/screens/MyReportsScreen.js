import React from 'react';
import { View } from "react-native";
import ReportsList from "../ReportsList";
import ReportsScreenStyle from "../../styles/ReportCommentsStyle";
import UserStore from '../../stores/UserStore';


class MyReportsScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            _id: ''
        }
    }
    componentDidMount(){
        this.setState({_id: UserStore.get()._id});
    }
    render(){
        const { navigate } = this.props.navigation;
        const { _id } = this.state;
        if(!_id) return null;
        return (
            <View style={ReportsScreenStyle.view}>

                <ReportsList user_id={_id} onItemPress={item => navigate('viewReport', {item})}/>


            </View>
        );
    }
}

export default MyReportsScreen;
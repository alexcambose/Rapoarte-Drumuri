import React from 'react';
import { View } from "react-native";
import ReportSearchStyle from '../../styles/screens/ReportSearch';
import { CTextInput, CText, CHideOnKeyboardView } from "../core/";
import _ from 'lodash';
import ReportsList from "../ReportsList";

class ReportsSearch extends React.Component{
    constructor(){
        super();
        this.state = {
            query: '',
        }
    }

   setQueryValue = _.debounce((query)=>{
        this.setState({query});
   },200);

    render(){
        return (
            <View style={ReportSearchStyle.view}>
                <CTextInput
                    placeholder="Cauta..."
                    onValueChange={query=>this.setQueryValue(query)}
                />
                <ReportsList
                    style={ReportSearchStyle.list}
                    search={this.state.query}
                    initialRefresh={false}
                />
            </View>
        );
    }
}

export default ReportsSearch;
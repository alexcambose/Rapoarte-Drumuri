import React from 'react';
import Proptypes from 'proptypes';
import { getReports, formatDate, severityToRgb } from "../utils/func";
import ReportsListStyle from '../styles/ReportsList';
import { FlatList, Image, TouchableNativeFeedback, View } from "react-native";
import { CText } from "./core";

const images = {
    stricat: require("../images/stricat.png"),
    reparatie: require("../images/reparatie.png"),
    periculos: require("../images/periculos.png"),
    inchis: require("../images/inchis.png"),
};

const limit = 12;

class ReportsList extends React.Component{
    constructor(){
        super();
        this.state = {
            reports: [],
            fetching: false,
            skip: 0,
        };
    }

    componentDidMount(){
        if(this.props.initialRefresh) this.refreshItems();
    }

    componentWillReceiveProps(nextProps){
        //if the next search value is different than the current value and not empty
        if(nextProps.search !== this.props.search && nextProps.search !== '')
            this.refreshItems(false, nextProps.search);
        //if search is empty reset all so it's not going to show all items
        if(nextProps.search === '') this.resetItems();
    }

    resetItems(){
        this.setState({skip: 0, reports: []});
    }

    refreshItems(append = false, search = ''){
        let skip = this.state.skip;
        const user_id = this.props.user_id || '';
        /*
            if it's not appending that means it's the first time so
            skip and limit must have default values
         */
        if(!append) {
            skip = 0; //manually set these vars because setState is async :<
            this.resetItems() //set the state
        }

        this.setState({fetching: true});
        getReports(skip, limit, search, user_id)
            .then(res=>res.json())
            .then(reports=>{
                if(append)
                    this.setState({reports: [...this.state.reports, ...reports]});
                else
                    this.setState({reports});
                this.setState({fetching: false, skip: skip + limit});
            })
            .catch(err=>{
                alert(err);
                this.setState({fetching: false});
            })
    }
    handleOnEndReached(){

        if(!this.props.initialRefresh && !this.state.reports.length) return;
        if(this.props.search) return;

        this.refreshItems(true);
    }
    render(){
        const { reports, fetching } = this.state;
        return (
            <FlatList
                data={reports}
                onRefresh={()=>this.refreshItems()}
                refreshing={fetching}
                ListEmptyComponent={<View style={ReportsListStyle.noReportsView}><CText>Nici un raport</CText></View>}
                onEndReached={() => this.handleOnEndReached()}
                onEndReachedThreshold={.01}
                keyExtractor={item => item._id}
                renderItem={({item, separators}) => (
                    <TouchableNativeFeedback
                        onPress={() => this.props.onItemPress(item)}
                        background={TouchableNativeFeedback.SelectableBackground()} >
                        <View style={ReportsListStyle.view}>
                            <View style={ReportsListStyle.heading}>
                                <Image source={images[item.type]} style={ReportsListStyle.image}/>
                                <CText style={ReportsListStyle.title}>{item.location}</CText>
                            </View>
                            <CText style={ReportsListStyle.description}>{item.title}</CText>
                            <View style={ReportsListStyle.metaView}>
                                <View style={[ReportsListStyle.severityIndicator, {backgroundColor: severityToRgb(item.severity)}]}/>
                                <CText style={ReportsListStyle.dateText}>{formatDate(item.created_at, true)}</CText>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                )
                }
                style={this.props.style}
            />
        );
    }
}

ReportsList.defaultProps = {
    initialRefresh: true,
};

ReportsList.proptypes = {
    search: Proptypes.string,
    style: Proptypes.object,
    user_id: Proptypes.string,
    onItemPress: Proptypes.func.isRequired,
    initialRefresh: Proptypes.boolean
};

export default ReportsList;
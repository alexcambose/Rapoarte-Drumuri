import React from 'react';
import PropTypes from 'proptypes';
import { Image,Alert, ScrollView,ToastAndroid, TouchableNativeFeedback, View } from "react-native";
import { CText } from "../core";
import { deleteReport, formatDate } from "../../utils/func";
import constants from '../../constants';
import ReportViewStyle from "../../styles/screens/ReportView";
import UserCard from "../UserCard";
import ReportComments from "../ReportComments";
import UserStore from '../../stores/UserStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const labels = {
    reparatie: 'Drum in reparatie',
    inchis: 'Drum inchis',
    stricat: 'Drum stricat',
    periculos: 'Drum periculos'
};

class ReportView extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: labels[navigation.state.params.item.type],
        ...(navigation.state.params.myReport ?
            {headerRight:
                <TouchableNativeFeedback
                    onPress={()=>{navigation.state.params.deleteReport(navigation); }}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{width: 40, height: 40, marginRight: 6, justifyContent:'center', alignItems:'center'}}>
                        <Icon name="delete" size={24} color="#ff0a00"/>
                    </View>
                </TouchableNativeFeedback>
            } : {})
    });
    constructor(props){
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
            myReport: false,
        };
    }

    componentDidMount(){
        const _id = UserStore.get()._id;
        this.setState({myReport: (_id === this.state.item.user_id)},()=>
            this.props.navigation.setParams({myReport: (_id === this.state.item.user_id)})
        ); //sets myReport to true if state item id is my id,


        this.props.navigation.setParams({deleteReport: this.deleteReport});
    }

    deleteReport(navigation){
        Alert.alert('Sterge', 'Esti sigur ca vrei sa stergi acest raport ?',
            [
                {text: 'Da', onPress: () => {
                    deleteReport(this.item._id)
                        .then(res=>res.json())
                        .then(res=>{
                            ToastAndroid.show('Raportul a fost sters !',ToastAndroid.SHORT);
                            navigation.navigate('Home');
                        })
                        .catch(err=>alert(err))
                }},
                {text: 'Anuleaza', onPress: () => {}, style: 'cancel'},
            ]);
    }

    render(){
        const { item } = this.state;

        const images = item.images.map((e,i)=>
            <Image
                style={{width: this.state.layoutWidth, height: this.state.layoutWidth,  margin: 4,}}
                source={{uri: constants.SERVER_ROOT+e.uri}}
                key={i}
            />
        );
        return (
            <View onLayout={e => this.setState({layoutWidth: e.nativeEvent.layout.width})}>
                <ScrollView style={ReportViewStyle.view}>

                    <CText style={ReportViewStyle.title}>{item.title}</CText>

                    <CText style={ReportViewStyle.description}>{item.description}</CText>
                    {item.images.length ?
                        <ScrollView
                        horizontal
                        >
                            {images}
                        </ScrollView>
                    : null}

                    <CText style={ReportViewStyle.location}>
                        Locatia:
                        <CText bold> {item.location}</CText>
                    </CText>
                    <CText style={ReportViewStyle.date}>
                        Data:
                        <CText bold> {formatDate(item.created_at)}</CText>
                    </CText>

                    <UserCard navigation={this.props.navigation} user_id={item.user_id}/>
                    <ReportComments navigation={this.props.navigation} report_id={item._id}/>

                </ScrollView>
            </View>
        );
    }
}

ReportView.propTypes = {
};

export default ReportView;
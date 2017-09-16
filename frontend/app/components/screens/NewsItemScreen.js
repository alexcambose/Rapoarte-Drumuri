import React from 'react';
import { Button, Image, ScrollView, View,Linking } from "react-native";
import NewsStore from '../../stores/NewsStore';
import NewsItemScreenStyle from '../../styles/screens/NewsItem';
import { CText } from "../core/index";
import { formatDate } from "../../utils/func";

class NewsItemScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.title,
    });
    constructor(props){
        super(props);
        const item =  NewsStore.get()[props.navigation.state.params.index];
        console.log(item);
        this.state = {
            item,
            viewWidth: 0,
        };
    }
    componentDidMount(){
        this.props.navigation.setParams({title: this.state.item.category[0]});
    }
    _onLayout(e){
        console.log(e.nativeEvent);
        this.setState({viewWidth:e.nativeEvent.layout.width});
    }
    openUrl(){
        const url = this.state.item.link[0];

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Nu se poate deschide linkul: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => alert(err));
    }
    render(){
        const { item } = this.state;
        const pubDate = formatDate(new Date(Date.parse(item.pubDate[0])));
        const lastUpdate = formatDate(new Date(Date.parse(item.lastUpdate[0])));
        return (
            <View onLayout={e=>this._onLayout(e)} style={NewsItemScreenStyle.view}>
                <ScrollView style={NewsItemScreenStyle.scrollView}>
                    <CText style={NewsItemScreenStyle.title}>{item.title[0]}</CText>
                    <Image source={{uri: item.enclosure[0].$.url + '?width=1000'}} style={[NewsItemScreenStyle.image, {width: this.state.viewWidth}]}/>
                    <CText style={NewsItemScreenStyle.description}>{item.description[0].trim()}</CText>

                    <View style={NewsItemScreenStyle.footerView}>
                        <CText>Data publicarii: {pubDate}</CText>
                        <CText>Ultima actualizare: {lastUpdate}</CText>
                    </View>
                    <Button title="Citeste in continuare..." onPress={()=>this.openUrl()}/>
                </ScrollView>
            </View>
        );

    }
}


export default NewsItemScreen;

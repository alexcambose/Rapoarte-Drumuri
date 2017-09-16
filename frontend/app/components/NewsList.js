import React from 'react';
import PropTypes from 'proptypes';
import { FlatList, Image, TouchableNativeFeedback, View } from "react-native";
import ReportsListStyle from "../styles/ReportsList";
import NewsListStyle from "../styles/NewsList";
import { CText } from "./core/index";
import { formatDate } from "../utils/func";
import NewsStore from '../stores/NewsStore';
import { refreshNews } from "../actions";

class NewsList extends React.Component{
    constructor(){
        super();
        this.state = {
            news: [],
            fetching: false,
        };
    }

    setNews = () => this.setState({news: NewsStore.get(), fetching: false});
    setFetching = () => this.setState({fetching: true});
    componentDidMount(){
        NewsStore.on('change', this.setNews.bind(this));
        NewsStore.on('fetching', this.setFetching.bind(this));
        refreshNews();
    }

    render(){
        const { news, fetching } = this.state;

        return (
                <FlatList
                    data={news}
                    onRefresh={()=>refreshNews()}
                    refreshing={fetching}
                    ListEmptyComponent={<View style={ReportsListStyle.noReportsView}><CText>Nici o stire</CText></View>}
                    ListFooterComponent={news.length ? <View style={NewsListStyle.listFooterView}><CText bold>Sfarsit</CText></View> : null}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index, separators}) => (
                        <TouchableNativeFeedback
                            onPress={() => this.props.onItemPress(index)}
                            background={TouchableNativeFeedback.SelectableBackground()} >
                            <View style={NewsListStyle.view}>
                                <View style={NewsListStyle.main}>
                                    <Image source={{uri: item.enclosure[0].$.url + '?width=300'}} style={NewsListStyle.image}/>


                                    <View style={NewsListStyle.textView}>
                                        <CText style={NewsListStyle.title}>{item.title[0]}</CText>
                                        <View style={NewsListStyle.footerView}>
                                            <CText style={NewsListStyle.category}>{item.category[0]}</CText>
                                            <CText style={NewsListStyle.date}>{formatDate(new Date(Date.parse(item.pubDate[0])),true)}</CText>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </TouchableNativeFeedback>
                    )
                    }
                />
        );
    }
}
NewsList.propTypes = {
    onItemPress: PropTypes.func.isRequired,
};

export default NewsList;
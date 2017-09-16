import React from 'react';
import PropTypes from 'proptypes';
import CDetailsStyle from '../../styles/core/CDetails';
import { View } from "react-native";
import { CText } from "./index";

class CDetails extends React.Component{
    render(){
        let { data } = this.props;
        console.log(data);
        if(this.props.filter) data = data.filter(e => e.content);

        const details = data.map((e,i) =>
            <View key={i} style={[CDetailsStyle.detailView, (i === data.length-1 ? {borderBottomWidth: 0} : {})]}>
                <View style={CDetailsStyle.iconView}>
                    <e.iconObject name={e.iconName} size={30}/>
                </View>
                <View style={CDetailsStyle.textView}>
                    <CText style={CDetailsStyle.contentText}>{e.content}</CText>
                </View>
            </View>
        );
        return (
            <View style={CDetailsStyle.view}>
                {details}
            </View>
        );
    }
}

/*
Format:
[
    {
        content: String,
        iconObject: Object,
        iconName: String,
    }
]
 */
CDetails.proptypes = {
    data: PropTypes.array.isRequired,
    filter: PropTypes.bool, //if true, if the content value from item object is empty, ignore it and don't render
};

CDetails.defaultProps = {
    filter: true,
};
export default CDetails;
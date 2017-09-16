import React from 'react';
import PropTypes from 'proptypes';
import _ from 'lodash';
import CLocationPickerStyle from '../../styles/core/CLocationPicker';
import {
    ActivityIndicator, FlatList, Alert, Modal, Switch, Text, TextInput, View,
    TouchableNativeFeedback
} from "react-native";
import { autocomplete, reverseGeocoding } from "../../utils/google";
import { getLocation } from "../../utils/func";

import { CButton } from "./index";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CText from "./CText";

class CLocationPicker extends React.Component{
    constructor(){
        super();
        this.state = {
            query: '',
            visible: false,
            fetching: false,
            locations: [],
            gpsStatus: '',
            useGps: false,
        };
    }
    onChangeText(query){
        this.setState({query});
        this.fetch();
    }
    fetch = _.debounce(()=>{
        this.setState({fetching: true});
        autocomplete(this.state.query)
            .then(res=>res.json())
            .then(res=>{
                console.log(res.predictions);
                this.setState({locations: res.predictions, fetching: false})
            })
            .catch(err=> {
                this.setState({fetching: false});
                alert(JSON.stringify(err));
            });
    },500);

    selectItem(content){
        console.log('asdasdad')
        this.props.onSave(content);
        this.setState({visible: false});
    }

    setGps(val){
        this.setState({useGps: val, });
        if(val){
            this.setState({gpsStatus:'(se asteapta coordonatele...)'});
            getLocation()
                .then(res=>{
                    this.setState({gpsStatus: '(se asteapta numele locatiei...)'});
                    return reverseGeocoding(res.coords.latitude, res.coords.longitude)
                })
                .then(res=>res.json())
                .then(res=>{
                    this.setState({gpsStatus: ''});
                    const address = res.results[0].formatted_address;
                    this.props.onSave(address);
                    Alert.alert('Adresa a fost gasita', address);
                })
                .catch(err=>{
                    //check if the switch is still on and then display the error msg
                    if(this.state.useGps) Alert.alert('Eroare', `Locatia nu a putut fi stabilita (${err.message})`)
                });
        } else this.setState({gpsStatus:''}); //reset label

    }

    _renderItem({item}){
        return (
            <TouchableNativeFeedback
                onPress={()=>this.selectItem(item.description)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={CLocationPickerStyle.autocompleteItemView}>
                    <Text style={CLocationPickerStyle.autocompleteText}>{item.description}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render(){
        const { query, locations, visible, fetching } = this.state;

        return (
            <View style={CLocationPickerStyle.view}>
                <View style={CLocationPickerStyle.uiView}>
                    {!this.state.useGps ?
                        <View style={CLocationPickerStyle.uiButtonView}>
                           <CButton
                                label="Selecteaza locatia"
                                icon={<Icon name="location-on" size={16}/>}
                                onPress={()=>this.setState({visible: true})}
                            />
                        </View>
                    : null }
                    <View style={CLocationPickerStyle.uiSwitchView}>
                        <Text>Utilizeaza GPS <Text>{this.state.gpsStatus}</Text></Text>
                        <Switch
                            value={this.state.useGps}
                            onValueChange={this.setGps.bind(this)}
                        />
                    </View>
                </View>
                <CText error>{this.props.errorText}</CText>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={visible}
                    onRequestClose={() => this.setState({visible: false})}
                >
                    <View style={CLocationPickerStyle.modalView}>
                        <View style={CLocationPickerStyle.textInputView}>
                            <TextInput
                                autoFocus
                                value={query}
                                onChangeText={value=>this.onChangeText(value)}
                                placeholder="Cauta... "
                                style={{flexGrow: 1}}
                            />
                            {fetching ?
                                <ActivityIndicator size={CLocationPickerStyle.$activityIndicatorSize} style={CLocationPickerStyle.activityIndicator}/>
                            : null}
                        </View>
                        {query && !locations.length ? <View style={{alignItems:'center'}}><Text>Nu s-au gasit sugestii</Text></View> : null }
                        <FlatList
                            data={locations}
                            extraData={this.state}
                            keyExtractor={(e,i)=>e.id}
                            renderItem={this._renderItem.bind(this)}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

CLocationPicker.proptypes = {
    onSave: PropTypes.func.isRequired,
    errorText: PropTypes.string,
};

export default CLocationPicker;
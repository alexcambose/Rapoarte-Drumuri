import React from 'react';
import validate from 'validate.js';
import {
    View, Picker, ActivityIndicator, ScrollView, Slider, TouchableOpacity, Text, Modal,
    Image
} from "react-native";
import AddReportScreenStyle from '../../styles/screens/AddReport';
import { CButton,CViewSeparator, CImagePicker, CText, CTextInput, CLocationPicker }  from "../core";
import constants from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sendReport, severityToRgb } from "../../utils/func";

class AddReportScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            type: 'stricat',
            severity: 5,
            images: [],
            location: '',
            errors: {},
            query:'',
            fetching: false,
        };
    }

    setImages(images){
        this.setState({images});
    }

    isValid(){
        const campul_titlu = this.state.title;
        const campul_descriere = this.state.description;
        const campul_locatie = this.state.location;

        validate.validators.presence.options = {message: constants.validate.presence};

        let errors = validate({campul_titlu, campul_descriere, campul_locatie}, {
            campul_titlu: {presence: true},
            campul_descriere: {presence: true},
            campul_locatie: {presence: true},
        });


        this.setState({errors: errors ? errors : {}});
        return !errors;
    }

    report(){
        if(this.isValid()){
            this.setState({fetching: true});
            sendReport(this.state)
                .then(res=>{
                    alert('Raportul al fost inregistrat!');
                    this.props.navigation.navigate('Reports');
                    this.setState({fetching: false});
                })
                .catch(err=>{
                    alert('Eroare!');
                    this.setState({fetching: false});
                });
            console.log(this.state);
        }
    }

    render(){
        const { title, description, type, severity, location, errors, fetching } = this.state;
        return (
            <ScrollView style={AddReportScreenStyle.view}>
                <CTextInput
                    onEndEditing={title=>this.setState({title})}
                    initialValue={title}
                    maxLength={40}
                    autoCapitalize={'sentences'}
                    placeholder="Titlu"
                    placeholderTextColor={AddReportScreenStyle.$placeholderTextColor}
                    underlineColorAndroid={AddReportScreenStyle.$inputUnderline}
                    errorText={errors.hasOwnProperty('campul_titlu') ? errors.campul_titlu[0] : ''}
                />
                <CTextInput
                    onEndEditing={description=>this.setState({description})}
                    initialValue={description}
                    maxLength={400}
                    autoCapitalize={'sentences'}
                    placeholder="Descriere"
                    multiline={true}
                    placeholderTextColor={AddReportScreenStyle.$placeholderTextColor}
                    underlineColorAndroid={AddReportScreenStyle.$inputUnderline}
                    style={{height: 100}}
                    errorText={errors.hasOwnProperty('campul_descriere') ? errors.campul_descriere[0] : ''}
                />

                <CText color={AddReportScreenStyle.$textColor} >Tip</CText>
                <Picker
                    selectedValue={type}
                    onValueChange={itemValue => this.setState({type: itemValue})}
                    prompt="Tip"
                >
                    <Picker.Item label="Drum stricat" value="stricat" />
                    <Picker.Item label="Drum inchis" value="inchis" />
                    <Picker.Item label="Drum in reparatie" value="reparatie" />
                    <Picker.Item label="Drum periculos" value="periculos" />
                </Picker>

                <View style={AddReportScreenStyle.pickerInfo}>
                    <View style={AddReportScreenStyle.pickerInfoItem}>
                        <CText style={AddReportScreenStyle.pickerInfoText}>Stricat </CText>
                        <Image source={require('../../images/stricat.png')} style={AddReportScreenStyle.pickerInfoImage}/>
                    </View>
                    <View style={AddReportScreenStyle.pickerInfoItem}>
                        <CText style={AddReportScreenStyle.pickerInfoText}>Inchis </CText>
                        <Image source={require('../../images/inchis.png')} style={AddReportScreenStyle.pickerInfoImage}/>
                    </View>
                    <View style={AddReportScreenStyle.pickerInfoItem}>
                        <CText style={AddReportScreenStyle.pickerInfoText}>In reparatie </CText>
                        <Image source={require('../../images/reparatie.png')} style={AddReportScreenStyle.pickerInfoImage}/>
                    </View>
                    <View style={AddReportScreenStyle.pickerInfoItem}>
                        <CText style={AddReportScreenStyle.pickerInfoText}>Periculos </CText>
                        <Image source={require('../../images/periculos.png')} style={AddReportScreenStyle.pickerInfoImage}/>
                    </View>
                </View>

                <CText color={AddReportScreenStyle.$textColor} >Gravitate: {severity}</CText>
                <Slider
                    value={severity}
                    onValueChange={severity=>this.setState({severity})}
                    minimumValue={1}
                    step={1}
                    thumbTintColor={severityToRgb(severity)}
                    maximumValue={10}
                />

                <CText color={AddReportScreenStyle.$textColor} >Locatia: {location}</CText>
                <CLocationPicker
                    errorText={errors.hasOwnProperty('campul_locatie') ? errors.campul_locatie[0] : ''}
                    onSave={location => this.setState({location})}
                />
                <CViewSeparator/>
                <CText color={AddReportScreenStyle.$textColor}>Imagini (optional)</CText>

                <CImagePicker
                    maxLength={2}
                    onSave={images=>this.setImages(images)}
                />
                {fetching ? <ActivityIndicator/> : <CButton
                    label="Raporteaza"
                    icon={<Icon name="send" size={16}/>}
                    onPress={()=>this.report()}
                /> }
            </ScrollView>
        );
    }
}

export default AddReportScreen;
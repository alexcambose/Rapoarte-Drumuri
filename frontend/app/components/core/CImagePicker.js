import React from 'react';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Proptypes from 'proptypes';
import CImagePickerStyle from '../../styles/core/CImagePicker';
import { Image, View, ScrollView, TouchableNativeFeedback } from "react-native";
import { CText, CButton, CSingleImagePicker } from "./";
import { convertToHumanSize } from '../../utils/func';

class CImagePicker extends React.Component{
    constructor(){
        super();
        this.state = {
            images: [],
        };
    }
    showImagePicker(){
        CSingleImagePicker(image => {
            let { images } = this.state;
            images.push(image);
            this.props.onSave(images);
            this.setState({images});
        });
    }

    deleteImage(i){
        let { images } = this.state;
        images.splice(i,1);

        this.props.onSave(images);
        this.setState({images});
    }

    render(){
        const { maxLength } = this.props;
        const { images } = this.state;
        const _images = images.map((e,i)=>{
            return (
                <View key={i} style={CImagePickerStyle.imageView}>
                    <View style={{width: 64, height: 64}}>
                        <Image source={{uri: e.uri}} style={{width: 64, height: 64}}/>
                    </View>

                    <ScrollView horizontal>
                        <View style={CImagePickerStyle.detailsView}>
                            <CText color={CImagePickerStyle.$textColor}>{e.fileName}</CText>
                            <CText color={CImagePickerStyle.$textColor}>{convertToHumanSize(e.fileSize)}</CText>
                        </View>
                    </ScrollView>


                    <TouchableNativeFeedback
                        onPress={()=>this.deleteImage(i)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={CImagePickerStyle.iconView}>
                            <Icon name="delete" size={CImagePickerStyle.$deleteIconSize}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        });
        return (
            <View>
                {_images}
                {maxLength && images.length?
                    <View style={CImagePickerStyle.lengthView}>
                        <CText error={maxLength === images.length} color={CImagePickerStyle.$textColor}>{maxLength-images.length} imagini ramase</CText>
                    </View>
                : null}
                {maxLength !== images.length ?
                    <CButton
                        icon={<Icon name="add-a-photo" size={CImagePickerStyle.$addImageIconSize}/>}
                        label="Selecteaza imagine"
                        onPress={()=>this.showImagePicker()}/>
                : null}

            </View>
        );
    }
}

CImagePicker.proptypes = {
    onSave: Proptypes.func.isRequired,
    maxLength: Proptypes.number,
};

export default CImagePicker;
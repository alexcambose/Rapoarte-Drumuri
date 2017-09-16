import React from 'react';
import PropTypes from 'proptypes';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { CText, CButton, CSingleImagePicker, CDetails } from "./core/";
import ProfileStyle from '../styles/ProfileStyle';
import constants from "../constants";
import UserStore from '../stores/UserStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import ScaleView from "./animations/ScaleView";
import { changeUserImage, formatDate } from "../utils/func";
import { setUser } from '../actions';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isMe: false,
            user: props.user,
            changingImage: false,
        };
    }


    setUser = () => {
        this.setState({user: UserStore.get()});
    };
    componentWillMount(){
        const isMe = (this.props.user._id === UserStore.get()._id);
        this.setState({isMe});
        if(isMe) {
            this.setUser();
            UserStore.on('change', this.setUser.bind(this));
        }
    }


    changeProfileImage(){
        CSingleImagePicker(image => {
            this.setState({changingImage: true});
            changeUserImage(image)
                .then(res => res.json())
                .then(res => {
                    this.setState({changingImage: false});

                    setUser({...UserStore.get(), profile_image: res.image});
                });
        });
    }

    render(){

        const { isMe, changingImage, user } = this.state;
        const birthday = (user.birthday ? formatDate(new Date(user.birthday.year, user.birthday.month-1, user.birthday.day)) : null);
        const userDetails = [
            {content: user.car, iconObject: Icon, iconName: 'car'},
            {content: user.city, iconObject: Icon, iconName: 'city'},
            {content: user.address, iconObject: FIcon, iconName: 'address-card'},
            {content: user.email, iconObject: Icon, iconName: 'email'},
            {content: user.phone, iconObject: Icon, iconName: 'phone'},
            {content: birthday, iconObject: FIcon, iconName: 'birthday-cake'},
            {content: formatDate(user.created_at), iconObject: Icon, iconName: 'timetable'},
        ];
        return (
            <ScrollView>
                <View style={ProfileStyle.imageView}>
                    <Image source={{uri: constants.SERVER_ROOT + user.profile_image}} style={ProfileStyle.image}/>
                    {isMe ?
                        <ScaleView style={ProfileStyle.changeProfileImageView}>
                            <TouchableOpacity onPress={() => this.changeProfileImage()}>
                                {changingImage ? <ActivityIndicator/>
                                    :
                                <Icon name="plus" size={26} color={ProfileStyle.$changeProfileIconColor} style={ProfileStyle.changeProfileImageIcon}/> }
                            </TouchableOpacity>
                        </ScaleView>
                    : null}
                </View>
                <CText style={ProfileStyle.nameText}>{user.first_name + ' ' + user.last_name}</CText>
                <CText style={ProfileStyle.usernameText}>{user.username}</CText>

                {isMe ? <CButton onPress={()=>this.props.navigation.navigate('editProfile')} label="Editeaza" icon={<FIcon name="edit" size={16}/>} /> : null }

                <View style={ProfileStyle.detailsView}>
                    <CDetails data={userDetails}/>
                </View>

            </ScrollView>
        );
    }

}


Profile.proptypes = {
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object,
};

export default Profile;

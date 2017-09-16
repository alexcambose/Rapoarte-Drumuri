import React from 'react';
import PropTypes from 'proptypes';
import { getUserData } from '../utils/func';
import { Image, TouchableOpacity, View } from "react-native";
import { CText,CLikeButton } from "./core";
import constants from '../constants';
import UserCardStyle from "../styles/UserCardStyle";
import CActivityIndicator from "./core/CActivityIndicator";
import UserStore from '../stores/UserStore';

class UserCard extends React.Component{
    constructor(){
        super();
        this.state = {
            user: {},
            isMe: false,
            fetching: false,
        };
    }

    componentDidMount(){
        this.setState({fetching: true});
        getUserData(this.props.user_id)
            .then(res=>res.json())
            .then(user => this.setState({user, fetching: false}))
            .catch(err => {
                alert(err);
                this.setState({fetching: false});
            });

        this.setState({isMe: (UserStore.get()._id === this.props.user_id) });
    }

    navigateToUser(){
        const { user } = this.state;
        if(this.state.isMe)
            this.props.navigation.navigate('Profile', {user});
        else
            this.props.navigation.navigate('viewProfile', {user});
    }

    render(){
        const { user, fetching, isMe } = this.state;
        const { small, date, message, enableLike,likeIsSent, likePressed,likeCount, likeParam } = this.props;

        if(fetching) return <CActivityIndicator/>;
        return (
            <View style={UserCardStyle.view}>
                <View style={UserCardStyle.imageView}>
                    <TouchableOpacity onPress={()=>this.navigateToUser()}>
                        <Image source={{uri: constants.SERVER_ROOT + user.profile_image}} style={[UserCardStyle.image, small ? UserCardStyle.image_small : {}, isMe ? UserCardStyle.image_me : {}]}/>
                    </TouchableOpacity>
                </View>
                <View style={UserCardStyle.detailsView}>
                    <View style={UserCardStyle.nameView}>
                        <CText style={[UserCardStyle.nameText, small ? UserCardStyle.nameText_small : {}]}>{user.first_name + ' ' + user.last_name}</CText>
                        <CText style={UserCardStyle.dateText}>{date}</CText>
                    </View>
                    <CText
                        style={UserCardStyle.message}
                        textBreakStrategy="balanced" >
                        {message}
                    </CText>

                    {enableLike ? <CLikeButton
                        text={likeCount}
                        highlighted={likeIsSent(likeParam)}
                        onPress={()=> likePressed(likeParam)}
                    /> : null }

                </View>
            </View>
        );
    }
}

UserCard.proptypes = {
    user_id: PropTypes.number.isRequired,
    navigation: PropTypes.object.isRequired,
    message: PropTypes.string,
    date: PropTypes.string,
    small: PropTypes.bool,
    likeParam: PropTypes.string, //the param that will be passed to like functions
    enableLike: PropTypes.bool,
    likePressed: PropTypes.func,
    likeIsSent: PropTypes.func,
    likeCount: PropTypes.string,
};

export default UserCard;
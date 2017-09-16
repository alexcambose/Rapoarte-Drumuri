import React from 'react';
import PropTypes from 'proptypes';
import { View } from "react-native";
import { getUserData } from "../../utils/func";
import CActivityIndicator from "../core/CActivityIndicator";
import auth from '../../utils/auth';
import Profile from "../Profile";
import ProfileStyle from '../../styles/screens/Profile';
import UserStore from '../../stores/UserStore';

class ProfileScreen extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) =>
        (navigation.state.params ? {title: navigation.state.params.user.username} : {});

    constructor(){
        super();

        this.state = {
            fetching: false,
            user: {},
        };
    }

    componentDidMount() {
        this.setState({fetching: true});
        let user_id = ''; //if user id is empty in the query the server will respond with the logged in account user id
        const { state } = this.props.navigation;
        if(state.params && state.params.user)
            user_id = state.params.user._id;

        getUserData(user_id)
            .then(user=>user.json())
            .then(user => {
                this.setState({user, fetching: false});

            })
            .catch(err => {
                alert(err);
                this.setState({fetching: false});
            });
    }

    render(){
        if(this.state.fetching) return <CActivityIndicator/>;
        return (
            <View style={ProfileStyle.view}>
                <Profile navigation={this.props.navigation} user={this.state.user} />
            </View>
        );
    }
}

ProfileScreen.proptypes = {
    user_id: PropTypes.string.isRequired,
};

export default ProfileScreen;
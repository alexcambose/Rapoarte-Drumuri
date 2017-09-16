import React from 'react';
import PropTypes from 'proptypes';
import { getReportComments, formatDate, likeComment, unlikeComment } from '../utils/func';
import { CText } from "./core";
import ReportCommentsStyle from '../styles/ReportCommentsStyle';
import { View } from "react-native";
import CommentForm from "./forms/CommentForm";
import UserCard from "./UserCard";
import UserStore from '../stores/UserStore';

class ReportComments extends React.Component{
    constructor(){
        super();
        this.state = {
            myId: '',
            comments: [],
            fetching: false,
        };
    }

    componentDidMount(){
        this.setState({myId: UserStore.get()._id});
        this.fetchComments();
    }

    fetchComments(){
        this.setState({fetching: true});
        getReportComments(this.props.report_id)
            .then(res=>res.json())
            .then(comments => {
                this.setState({comments, fetching: false});
            })
            .catch(err=>{
                alert(err);
                this.setState({fetching: false});
            });
    }

    sendLike(e){
        if(this.likeIsSent(e))
            unlikeComment(e._id).then(()=>this.fetchComments());
        else
            likeComment(e._id).then(()=>this.fetchComments());

    }
    likeIsSent(e){
        for(let like of e.useful)
            if(like.user_id === this.state.myId)
                return true;
        return false;
    }
    render(){
        const { comments } = this.state;

        const comm = comments.map(e =>
                <UserCard
                    navigation={this.props.navigation}
                    user_id={e.user_id}
                    date={formatDate(e.created_at, false, true)}
                    message={e.content}
                    key={e._id}
                    likePressed={e => this.sendLike(e)}
                    likeIsSent={e => this.likeIsSent(e)}
                    likeParam={e}
                    likeCount={e.useful.length}
                    enableLike
                    small
                />
        );
        return (
            <View>
                <CText style={ReportCommentsStyle.title}>Comentarii • {comments.length}</CText>
                <CommentForm report_id={this.props.report_id} onSaved={()=>this.fetchComments()}/>
                {comm}
            </View>
        );
    }
}

ReportComments.proptypes = {
    report_id: PropTypes.number.isRequired,
    navigation: PropTypes.number.isRequired,
};

export default ReportComments;
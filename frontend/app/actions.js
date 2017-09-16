import dispatcher from './dispatcher';
import UserStore from './stores/UserStore';
import { parseString } from 'react-native-xml2js';
import constants from './constants';

export function setUser(user){
    dispatcher.dispatch({type:'USER_SET', payload: user});
}
export function updateUser(data){
    dispatcher.dispatch({type:'USER_SET', payload: {...UserStore.get(), ...data}});
}

export function refreshNews(){
    dispatcher.dispatch({type: 'NEWS_FETCHING'});
    fetch(constants.rssNewsUrl)
        .then(res => res.text())
        .then(res => {
            parseString(res, (err, result) => {
                dispatcher.dispatch({type: 'NEWS_SET', payload: result.rss.channel[0].item});
            })
        })
        .catch(err => alert(err));
}
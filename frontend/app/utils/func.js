import constants from './../constants';
import auth from './auth';
import { queryfy } from 'queryfy';
import Moment from 'moment';
import 'moment/locale/ro';

export const convertToHumanSize= b=>{
    if(b/1000 > 1000){
        return (b/1000/1000 * 100).toFixed(2) / 100 + ' MB';
    }else{ //kilobytes
        return (b/1000).toFixed(2) + ' KB';
    }
};
export const severityToRgb = severity => {
    severity = parseInt(severity);
    return 'rgb('+(25*severity).toString()+', '+(250 - 25*severity).toString()+', 0)';
};
export const formatDate = ( date, ago = false, short = false) =>{
    Moment.locale('ro');
    if(ago) return Moment(date).fromNow();
    if(short) return Moment(date).format('Do.MM.YYYY, H:mm');
    return Moment(date).format('Do MMMM YYYY, H:mm');
};

export const getUserData = async id => {
    const token = await auth.getToken();
    return fetch(queryfy(constants.SERVER_ADDR + 'user',{
        id,
        token,
    }), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const changeUserImage = async image => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'user/image', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: JSON.stringify(image),
            token,
        })
    });
};

export const getReportComments = async report_id => {
    const token = await auth.getToken();
    return fetch(queryfy(constants.SERVER_ADDR + 'comments',{
        report_id,
        token,
    }), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const getLocation = ()=>{
    return new Promise((resolve, reject)=>{
        const options = {
            enableHighAccuracy: true,
            timeout: 20000, //20 secs
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(pos=>{
            resolve(pos);
        }, err=>{
            reject(err)
        }, options);
    });
};

export const sendReport = async ({title, description, severity, type, location, images}) => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'report',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            severity,
            type,
            location,
            images: JSON.stringify(images),
            token
        }),
    });
};

export const deleteReport = async id => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'report',{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            token
        })
    });
};

export const likeComment = async id => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'comments/like',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            token
        })
    });
};

export const unlikeComment = async id => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'comments/like',{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
            id,
            token
        })
    });
};

export const getReports = async (skip,limit,search,user_id)=>{
    const token = await auth.getToken();
    return fetch(queryfy(constants.SERVER_ADDR + 'report', {
        skip,
        limit,
        search,
        user_id: user_id || '',
        token
    }), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const sendComment = async (content, report_id) => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'comments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content,
            report_id,
            token
        })
    });
};
export const saveProfile = async (data, type) => {
    const token = await auth.getToken();
    return fetch(constants.SERVER_ADDR + 'user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data,
            type,
            token
        })
    }).then(res=>res.json());
};
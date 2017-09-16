import { queryfy } from 'queryfy';
import constants from '../constants';

export const autocomplete = input =>{
    return fetch(queryfy(constants.googlePlaceSearch, {
        key: constants.googleAPIkey,
        input,
        language: constants.googleLang
    }), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
};
export const reverseGeocoding = (lat, lng) => {
    return fetch(queryfy(constants.googleReverseGeocoding, {
            key: constants.googleMapsGeocodingAPIkey,
            latlng: lat + ',' + lng,
            language: constants.googleLang
        })
    );
};
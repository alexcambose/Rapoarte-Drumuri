import { AsyncStorage } from 'react-native';
import constants from '../constants';
import { setUser } from '../actions';
class Auth{
    register({username, email, first_name, last_name, password}){
        return fetch(constants.SERVER_ADDR + 'register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                username, email, first_name, last_name, password
            })
        }).then(res => res.json());
    }
    login(email, password){
        const data = {
            email, password
        };
        return new Promise((resolve,reject)=>{
            fetch(constants.SERVER_ADDR + 'authenticate',{
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify(data)
            })
                .then(res=>res.json()) //json style
                .then(resJson=>{
                    if(resJson.success){ //login successful
                        AsyncStorage.setItem('user', JSON.stringify(resJson.user));
                        AsyncStorage.setItem('token', resJson.token);

                        setUser(resJson.user); //set user in flux
                        resolve(resJson.user);
                    }else{ //login failed
                        reject(constants.validationErrors.auth_invalid_credentials)
                    }
                })
                .catch(err=>{
                    //some connection error
                    reject(constants.validationErrors.auth_err_server);
                });
        });

    }
    logout(){
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
    }
    async getUser(){
        return JSON.parse(await AsyncStorage.getItem('user'));
    }
    async getToken(){
        return await AsyncStorage.getItem('token');
    }
    async isAuthenticated(){
        return !!await AsyncStorage.getItem('user');
    }
}
export default new Auth();
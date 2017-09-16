import React from 'react';
import { View, StatusBar } from "react-native";
import auth from './utils/auth';
import UserStore from './stores/UserStore';
import createRootNavigator from './routes/index';


class App extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            signedIn: false,
            fetching: true
        }
    }
    componentDidMount(){
        auth.getUser()
            .then(res=>{
                this.setState({signedIn:res, fetching:false});
                if(res) {

                }
                UserStore.set(res);
            });
    }
    render() {
        if(this.state.fetching) return null;
        const Layout = createRootNavigator(this.state.signedIn);
        return (
            <View style={{flex: 1}}>
                <Layout/>
            </View>
        );
    }
}
export default App;
import { StackNavigator } from 'react-navigation';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import LoginScreen from "../components/screens/auth/LoginScreen";
import RegisterScreen from "../components/screens/auth/RegisterScreen";

export default (signedIn) => StackNavigator({
        SignedIn: {
            screen: SignedIn,
            header: null
        },
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                title: 'Login',
                header: null
            }
        },
        Register: {
            screen: RegisterScreen,
            navigationOptions:{
                title: 'Register',
                header: null
            }
        }
    },
    {
        headerMode: 'none',
        initialRouteName: signedIn ? 'SignedIn' : 'Login'
    }
);
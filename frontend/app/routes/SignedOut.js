import { StackNavigator } from 'react-navigation';
import LoginScreen from "../components/screens/auth/LoginScreen";
import RegisterScreen from "../components/screens/auth/RegisterScreen";

export default StackNavigator({
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
});
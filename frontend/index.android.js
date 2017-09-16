import Reactotron from 'reactotron-react-native'

Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!


import { AppRegistry } from 'react-native';
import App from './app/App';



AppRegistry.registerComponent('App', () => App);

import React from 'react';
import { Modal,BackAndroid, Text, TouchableNativeFeedback, View } from "react-native";
import EStylesheet from 'react-native-extended-stylesheet';
import auth from '../../../utils/auth';
const Button = (props) => {
    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={style.button}>
                <Text style={style.buttonText}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

// class LogoutScreen extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             visible: false,
//         };
//     }
//     yes(){
//         BackAndroid.exitApp();
//     }
//     no(){
//         this.props.navigation.goBack();
//         this.setState({visible: false});
//
//     }
//     render(){
//         return (
//             <Modal
//                 animationType='none'
//                 visible={this.state.visible}
//             >
//                 <View style={style.view}>
//                     <Text style={style.text}>Esti sigur ca vrei sa te deconectezi ?</Text>
//                     <View style={style.buttonContainer}>
//                         <Button onPress={this.yes.bind(this)} style={style.button} title="Da"/>
//                         <Button onPress={this.no.bind(this)} style={style.button} title="Nu"/>
//                     </View>
//                 </View>
//             </Modal>
//         );
//     }
// }

class LogoutScreen extends React.Component{
    render(){
        auth.logout();
        BackAndroid.exitApp();
        return null;
    }
}

const style = EStylesheet.create({
    view: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    buttonContainer:{
        flexDirection: 'row',
    },
    button: {
        width: 60,
        height: 30,
        justifyContent:'center',
        alignItems:'center',
        margin: 6,
        backgroundColor: '$primaryColor'
    },
    buttonText:{
        color: '$primaryColorText'
    },
});

export default LogoutScreen;
import EStyleSheet from 'react-native-extended-stylesheet';
import '../common';
export default EStyleSheet.create({
    $statusBarBg: '$primaryColorDark',
    $placeholderTextColor: 'rgba(255,255,255,.4)',
    $underlineColorAndroid: 'transparent',
    view: {
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: '$primaryColorDark',
        padding: '$padding'
    },
    viewContent: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        justifyContent:'flex-end',
        alignItems: 'center',
        marginTop: '$marginTop',
        flexGrow: 1
    },
    logo: {
      height: 120,
      width: 120,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    input: {
        width: '100%',
        color: '#fff',
        padding: 6,
        backgroundColor: 'rgba(255,255,255,.1)',
        marginTop: '$marginTop'
    },
    formContainer: {
        marginBottom:20,
    }
});

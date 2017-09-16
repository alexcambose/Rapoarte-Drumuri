import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $activityIndicatorSize: 30,
    view: {
    },
    touchableView:{
        width: '100%',
    },
    modalView: {
        flex: 1,
        margin: '$viewMargin',
    },
    textInputView: {
        padding: 4,
        flexDirection:'row',
    },
    autocompleteItemView: {
        padding: 12,
    },
    autocompleteText:{
        color: 'black',
    },
    activityIndicator:{
        width: '$activityIndicatorSize',
    },
    uiView: {
        flexDirection:'row',
    },
    uiButtonView: {
        flexGrow: 1,

    },
    uiSwitchView: {
        flexGrow:2,
        justifyContent:'center',
        alignItems:'center'
    }
});

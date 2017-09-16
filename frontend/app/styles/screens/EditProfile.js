import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $textColor: '$darkTextColor',
    view: {
        marginLeft: '$viewMargin',
        marginRight: '$viewMargin',
        marginBottom: '$viewMargin',
    },
    birthdayView: {
        flexDirection:'row',
        justifyContent:'center',

    },
    birthdayTextView: {
        flexGrow: 1,
        justifyContent:'center',

    },
    birthdayButtonView: {
        flexGrow: 4,
    },
});
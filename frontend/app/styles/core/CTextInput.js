import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    $maxLengthTextColor: 'gray',
    view: {
        width: '100%',
    },
    errorInput: {
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '$errorColor',
    },
    maxLengthView: {
        flexDirection: 'column',
        alignItems:'flex-end',
    },
});

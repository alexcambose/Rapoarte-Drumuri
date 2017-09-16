import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
export default EStyleSheet.create({
    view: {
        paddingVertical: 8,
        // alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        marginTop: '$marginTop',
        backgroundColor: '$accentColor',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
    },
    iconView: {
        marginLeft: 6,
    },
});

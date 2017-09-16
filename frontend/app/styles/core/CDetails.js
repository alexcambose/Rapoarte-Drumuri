import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
    },
    detailView: {
        width: '75%',
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor: '#c7c7c7',
    },
    iconView: {
        marginRight: 10,
    },
    textView: {
        flex:1,
        justifyContent: 'center',
    },
    contentText: {

    },
});
import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    view: {
        paddingTop:5,
        paddingBottom:5,
    },
    main: {
        flexDirection:'row',
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontWeight:'bold',
    },
    textView: {
        flex: 1,
        marginLeft: 4,
    },
    footerView: {
        marginTop: 4,
        flexDirection:'row',
    },
    category: {
        flexGrow: 1,
        fontStyle: 'italic',
        fontSize: 12,
    },
    date: {
        fontStyle: 'italic',
        fontSize: 12,
        alignSelf:'flex-end',
    },
    listFooterView: {
        alignItems:'center',
        padding: 10,
    },
});

import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    view: {
        flexDirection:'row',
        marginTop:10,
    },
    imageView: {
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#d6d6d6',
        borderWidth:1,
    },
    image_small: {
        width: 40,
        height: 40,
    },
    image_me: {
        borderColor: '#909090',
    },
    detailsView: {
        justifyContent:'center',
        marginLeft: 10,
        flex: 1
    },
    nameText: {
        fontSize: 18,
        fontWeight:'bold'
    },
    nameView: {
        flexDirection:'row',
        justifyContent: 'space-between',

    },
    nameText_small: {
        fontSize:14,
    },
    message: {
        fontSize: 14,
    },
    dateText: {
        fontSize: 11,
        fontStyle: 'italic',
    },

});

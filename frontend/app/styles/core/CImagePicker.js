import EStylesheet from 'react-native-extended-stylesheet';
export default EStylesheet.create({
    $textColor: '$darkTextColor',
    $deleteIconSize: 44,
    $addImageIconSize: 16,
    imageView: {
        padding: 4,
        elevation: 0,
        borderColor: '$accentColor',
        borderWidth:1,
        borderStyle:'solid',
        margin: 4,
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    detailsView: {
        justifyContent:'center',
        flexGrow: 1,
        paddingLeft: 2,
        paddingRight: 2,

    },
    iconView: {
        width: 44,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    lengthView:{
        alignItems: 'flex-end',
    },
});

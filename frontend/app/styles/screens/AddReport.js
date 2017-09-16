import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $inputUnderline: '$accentColor',
    $placeholderTextColor: '$darkTextColor',
    $textColor: '$darkTextColor',
    view: {
        flex: 1,
        margin: '$viewMargin',
   },
    picker: {
        borderBottomColor: '$inputUnderline',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    pickerInfo: {
        flexDirection:'row',
        justifyContent:'space-around'
    },
    pickerInfoItem: {
        // alignItems:'center',
        flexDirection:'row',
    },
    pickerInfoImage: {
        width: 16,
        height: 16,
    },
    pickerInfoText: {
        fontSize: 10,
    },
});
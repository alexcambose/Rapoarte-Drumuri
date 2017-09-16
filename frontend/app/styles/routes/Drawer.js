import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import '../common';
export default EStyleSheet.create({
    $iconSize: 26,
    $activeColor: '$accentTextColorLight',
    $inactiveColor: '$primaryColorText',
    $activeBackgroundColor: '$primaryColor',
    container: {
        flex: 1,

        backgroundColor: '$primaryColorDark'
    },
    item:{

    },
    header:{
        height: 180,
        paddingLeft: 16,
        backgroundColor: '$accentColorDark',
    },
    nameContainer: {
        height: 56,
        justifyContent:'center'
    },
    name: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
    },
    email: {
        color: '#fff',
    },
    imageContainer: {
        flex: 1,
        justifyContent:'flex-end'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 999
    },
});

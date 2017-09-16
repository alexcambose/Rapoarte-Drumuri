import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $activeColor: '$accentColor',
    $iconSize: 24,
    view: {
        width: 56,
        height: 56,
        borderRadius: 999,
        backgroundColor: '$primaryColor',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 20,
        position: 'absolute',
        bottom: 6,
        right: 6,
    },
    text: {
        color: 'white'
    },
});
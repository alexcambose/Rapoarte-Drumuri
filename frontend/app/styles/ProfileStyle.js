import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $changeProfileIconColor: '$primaryColor',
    view: {

    },
    imageView: {
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '$primaryColor',
    },
    changeProfileImageView: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '$primaryColor',
        borderRadius:999,
        padding: 2,
    },
    changeProfileImageIcon: {
        backgroundColor: 'white',
        borderRadius:999,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    usernameText: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 10.
    },
    detailsView: {
        marginTop: 10,
    },
});
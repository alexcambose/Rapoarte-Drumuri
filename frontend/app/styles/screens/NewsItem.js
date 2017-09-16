import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    view: {
        marginLeft: '$viewMargin',
        marginRight: '$viewMargin',
    },
    scrollView: {
        marginBottom: '$viewMargin',
    },
    title: {
        fontSize: 20,
        fontWeight:'bold',
    },
    description: {
        fontSize: 16,
    },
    image: {
        height: 200,
    },
    footerView: {
        marginTop: 4,
        marginBottom: 4,
    },
});
import EStylesheet from 'react-native-extended-stylesheet';

export default EStylesheet.create({
    $panelImageSize: 40,
    $severityIndicatorSize: 18,
    view: {
        padding: 4,
        paddingBottom: 6,
        paddingTop: 6,
        borderBottomColor:'rgba(0,0,0,.05)',
        borderBottomWidth:1,
    },
    title: {
        marginLeft: 10,
        fontSize: 20,
        flex:1,
    },
    description: {
        fontSize: 16,
        fontWeight:'bold'
    },
    heading: {
        flexDirection:'row',
        alignItems:'center'
    },
    metaView: {
        flex:1,
        padding: 4,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    dateText: {
        fontStyle: 'italic',
        fontSize: 12,
        alignSelf:'flex-end',
    },
    severityIndicator: {
        width: '$severityIndicatorSize',
        height: '$severityIndicatorSize',
        elevation: 5,
        borderRadius: 99,
    },
    image: {
        width: '$panelImageSize',
        height: '$panelImageSize',
    },
    noReportsView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
    },
});
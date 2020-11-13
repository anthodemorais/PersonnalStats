import colors from '../styles/colors'

export default {
    container: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        backgroundColor: colors.bgColor,
        height: '100%'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        width: 200,
        backgroundColor: colors.mainColor,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    text: {
        fontSize: 16,
        // color: '#2e2e2d',
        color: '#ffffff',
    },
    link: {
        color: colors.mainColor,
        fontWeight: "bold",
        fontSize: 16
    }
}
import colors from '../styles/colors'

export default {
    container: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgColor,
        height: '100%',
        width: '100%',
    },
    input: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: colors.secondaryColor,
    },
    button: {
        width: '60%',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: colors.mainColor,
    },
    buttonTitle: {
        color: colors.tertiaryColor,
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
        color: colors.mainColor,
    },
    link: {
        color: colors.mainColor,
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: 'underline',
    }
}
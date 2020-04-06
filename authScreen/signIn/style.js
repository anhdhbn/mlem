import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    linear: {
        flex: 1,
        justifyContent: 'center'
    },
    mlem: {
        color: 'yellow',
        fontWeight:'bold',
        fontSize:50
    },
    fbWay:{
        backgroundColor:'#1253DC',
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius:8,
        flexDirection:'row'
    },
    ggWay:{
        backgroundColor:'#FFFFFF',
         marginBottom:40,
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius:8,
        flexDirection:'row'
    },
    imgFBGG:{
        width: 20,
        height:20,
        marginRight:20
    },
    textInput: {

        fontSize: 13,
        paddingTop: 3,
        paddingBottom: 3,
        width: 200,
        color: 'white',

    },
    viewInput: {
        justifyContent: 'center',
        width: 200,
        borderWidth: 0.5,
        borderRadius: 10,
        height: 40,
        marginTop: 10,
        backgroundColor: '#461321',
        flexDirection: 'row',
        overflow: "hidden"
    },
    image:{
        width: 8,
        height:8, 
        padding:8,
        margin: 10,
        marginLeft:45
    },
    submitBtn: {
        justifyContent: 'center',
        width: 200,
        borderWidth: 0.5,
        borderRadius: 10,
        height: 40,
        marginTop: 10,
        backgroundColor: '#8A0130',
        alignItems: 'center'
    },
    line: {
        width: 100,
        borderWidth: 0.4,
        borderColor: '#adaaaa',
        marginTop: 10,
        marginBottom: 15,
    },
    textDecoration: {
        textDecorationLine: 'underline',
        color: 'white',
        fontSize: 12
    },
    textBtnSubmit: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        marginLeft: 60,
        marginTop: 10,
        marginBottom: 30
    }
})
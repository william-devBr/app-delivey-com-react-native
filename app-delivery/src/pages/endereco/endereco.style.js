import { COLORS, FONT_SIZE } from "../../utils/constants";

export const styles = {
    container : {
        flex: 1,
        alignItems :"center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:COLORS.white,
    },
     inputGroup : {
        width : "100%",
        flexDirection :"row",
        gap: 7,
        marginBottom : 20,
    },
    w70 : {
        flex: 3
    },
    w30 : {
        flex: 2
    },
     w40 : {
        flex: 1
    },
    errorArea : {
          flexDirection : "row",
          justifyContent: "space-between",
          padding : 8

    },
    
    error : {
        color : COLORS.primary_button,
        fontSize : FONT_SIZE.small
    }, 
    header : {
        marginTop: 40,
        marginBottom: 40,
    },
    footer : {
        position:"fixed",
        bottom: 40,
    },
    picker : {
        height :40,
        padding: 5,
        backgroundColor : COLORS.light_gray,
        borderRadius: 5,
        borderColor : COLORS.gray,
        borderWidth: 1
    }
}
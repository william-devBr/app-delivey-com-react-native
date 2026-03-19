import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = {
    container : {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor:COLORS.white,
    },
    header : {
        marginBottom: 40,
    },
    inputGroup : {
     width: "100%",
     marginBottom : 10,
    },
    error : {
     color : COLORS.primary_button,
     fontSize : FONT_SIZE.small
    }, 
    footer : {
        position:"absolute",
        bottom: 70,
    }
}
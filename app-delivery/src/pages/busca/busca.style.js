import {COLORS , FONT_SIZE, FONT_FAMILY} from "../../utils/constants.js"

export const styles = {
    container : {
        flex: 1,
        width : "100%",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:15,
    },

    emptyText :{
        textAlign: "center",
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.medium,
        color:COLORS.dark_gray
    }
}
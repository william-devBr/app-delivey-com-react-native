import { COLORS, FONT_SIZE } from "../../utils/constants";

export const styles = {
    container : {
        flex: 1,
        marginTop: 50,
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor:COLORS.white,
    },
      inputGroup : {
          width: "100%",
    },
    error : {
        color : COLORS.primary_button,
        fontSize : FONT_SIZE.small
    }, 
    header : {
        marginBottom: 40,
    },
    footer : {
        marginTop: 50,
        marginBottom: 70,
    }
}
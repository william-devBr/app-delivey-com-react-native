import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = { 
    button : {
        width: '100%',
        backgroundColor: COLORS.primary_button,
        color: COLORS.white,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText : {
        color: COLORS.white,
        fontSize: FONT_SIZE.medium,
        fontWeight: "bold",
    },
    loadingButton :{
        opacity : 0.5
    }
}
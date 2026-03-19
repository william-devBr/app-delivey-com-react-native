import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = {
    container : {
        paddingLeft: 20,
        paddingRight: 20
    },

    cardOption : {

        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent :"space-between",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.medium_gray
    },
    location : {
        flex: 1,
        paddingLeft: 8,
       
    },
    locationIcon : {
     color: COLORS.dark_gray,
     fontSize: 40
    },

    addressTitle : {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.medium
    },
    addressDescription : {
        color: COLORS.gray,
        fontSize: FONT_SIZE.medium
    },
    arrowRightIcon : {
        color:  COLORS.dark_gray,
        fontSize: 25
    }
}
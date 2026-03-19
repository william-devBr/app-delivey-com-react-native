import { COLORS, FONT_SIZE } from "../../utils/constants"
import Endereco from "../endereco/endereco"

export const styles = {
    container : {
        flex :1,
        paddingRight : 30,
        paddingLeft : 30,
        backgroundColor : COLORS.light_gray
    },
    areaView : {
         marginTop: 20,
         alignItems: "center",
         justifyContent : "center",
         marginBottom: 10
    },

    areaIcon : {
       
         backgroundColor : "#80EF80",
         width: 100,
         height :100,
         borderRadius : "100%",
         alignItems: "center",
         justifyContent :"center",
         opacity : 0.5
    },
    checkIcon : {
        color : "green",
        fontSize : 40,
        fontWeight :"bold"
    },
    textSuccess : {
       fontSize : 22,
       fontWeight : "bold",
       textAlign :"center",
       marginBottom : 10
    },

    cardArea : {
        backgroundColor : "#FFF",
        width : "100%",
        padding: 8,
        justifyContent : "center",
        alignItems : "center",
        marginTop: 30,
        borderRadius : 5,
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        
    },

    titleTempo : {
        fontWeight: 500
    },
    tempoEntrega : {
        fontWeight :"bold",
        fontSize : FONT_SIZE.xlarge
    },
    item : {
        flex: 1,
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        padding: 8,
        marginTop:10,
        marginBottom: 10,
    },
      imgContainer : {
    
      width : 75,
      height : 75,
      overflow : 'hidden',
      borderRadius : 8,
        
    },
    thumbItem : {
        width: "100%",
        height: 75,
       
    },
    cardContainer : {
        width: "100%",
        flexShrink: 1,
        gap: 2,
        flexDirection :"row",
        alignItems :"center",
       
    },
    total : {
      color: COLORS.dark_gray,
      fontWeight: "bold",
      flexShrink: 1,
     
    },
    itemContainer : {
       flex: 1,
        flexShrink: 1,
        fontWeight : 600,
        fontSize :FONT_SIZE.small,
        

    },
    descriptionContainer : {
       fontWeight : 600,
        color: COLORS.gray,
        fontSize : FONT_SIZE.small
    },
    endereco : {
        color: COLORS.dark_gray,
        marginTop: 10
    }
   
}
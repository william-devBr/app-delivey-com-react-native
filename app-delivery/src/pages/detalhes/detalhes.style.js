import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = {
    container : {
        flex: 1,
      
    },
    cardArea : {
          marginTop:20,
          marginBottom: 40,
          paddingLeft: 8,
          paddingRight: 8
    },
    card : {
        flex: 1,
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop : 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.medium_gray

    },
    imgContainer : {
      width : 80,
      height : 80,
      overflow : 'hidden',
       borderRadius : 8
    },
    thumbItem : {
        width: "100%",
        height: 75,
       
    },
     textArea :  {
         flex: 1,
         flexDirection : "column",
         rowGap : "10%",
         paddingLeft: 15
     },
     cardTitle : {
         color : COLORS.dark_gray,
         fontSize: FONT_SIZE.medium
     },
     cardDescription : {
        color : COLORS.gray,
         fontSize: FONT_SIZE.medium
     },
     cardPrice : {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.medium
     }
     ,
     detalhes : {
         backgroundColor:COLORS.light_gray,
         paddingLeft: 8,
          paddingRight: 8,
         width:"100%",
         height: 150,
         justifyContent: "center",
         bottom: 0,
    
     },
     detalheFooter : {
      
         flexDirection: "row",
         justifyContent : "space-between",

     },
     footerArea : {
       
        marginTop:15,
         rowGap : "10%"
     },
     footerText : {
         
         color:COLORS.dark_gray,
         fontSize: FONT_SIZE.medium
     },
     footerNums : {
         textAlign:"right",
         paddingRight: 5,
         fontSize: FONT_SIZE.medium,
         color:COLORS.dark_gray
     }
     

}
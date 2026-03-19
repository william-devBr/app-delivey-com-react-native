import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = {
    container : {
        overflow: 'hidden',
        paddingLeft:15,
        paddingRight:15
    },
     header : {
        width:"100%",
        height:200,
    }, 
    thumb : {
        width :"100%",
        height:"100%",
    },

    title :{
        paddingTop: 8,
        paddingBottom:8,
        color:COLORS.dark_gray,
        fontWeight: "bold",
        fontSize:FONT_SIZE.large
     },
    description: {
        color:COLORS.gray,
        marginBottom:8,
        fontSize:FONT_SIZE.medium
     },
    price: {
         paddingBottom:8,
        color:COLORS.dark_gray,
        fontWeight: "bold",
        fontSize:FONT_SIZE.large
    },
    textArea :  {
        borderColor:COLORS.medium_gray,
         borderWidth:1,
         padding:5,
         marginTop:10,
         borderRadius: 4,
        backgroundColor: COLORS.light_gray,
        minHeight:120,
        verticalAlign:"top"
        },
        quantityIcon : {
    
            fontSize: 40,
            color:COLORS.dark_gray
        },
        quantityNumber : {
            fontSize: 30,
            padding: 8,
            color:COLORS.dark_gray
        },
         areaBack : {
         position:"absolute",
          width: 40, 
          height : 40,
         top: 30,
         left: 30,
         zIndex : 2,
         backgroundColor : "#000",
        opacity: 0.5,
         borderRadius: "100%",
         alignItems:"center",
         justifyContent : "center",
     },

    btnBack : {
        fontSize: FONT_SIZE.xlarge,
        zIndex: 8,
        color: "#FFF",
        fontWeight :"bold"
    },
    vlTotal : {
        fontSize:FONT_SIZE.xlarge,
        fontWeight:600,
        color:COLORS.dark_gray
    }

}
import { COLORS, FONT_SIZE } from "../../utils/constants";


export const styles = {
    container : {
        flex: 1,
        paddingLeft: 15,
        paddingRight : 15,
        backgroundColor:COLORS.light_gray
    },
  
    card : {
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding : 10,
        borderRadius : 5,
        backgroundColor : "#FFF",
        boxShadow : "1px 1px 2px rgba(0,0,0,0.1)",
        marginTop : 15

    },
      cardArea : {
          marginTop:20,
          marginBottom: 40
    },
    thumb : {
        width: 75,
        height: 75,
        borderRadius : 8
    },
     textArea :  {
         flex: 1,
         flexDirection : "column",
         marginLeft: 10
     },
     cardTitle : {
         fontSize: FONT_SIZE.medium
     },
     cardDescription : {
        color : COLORS.gray,
         fontSize: FONT_SIZE.small
        
     },
     cardPrice : {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.medium
     },
     titleDelivery :  {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.normal,
        marginTop: 20,
         marginBottom: 10
     },
     detalhes : {
        
         backgroundColor: COLORS.white,
         borderRadius: 10,
         padding: 15,
         
     },
     detalheFooter : {
        
         flexDirection: "row",
         justifyContent : "space-between",
     },
     footerArea : {
        marginTop:15,
        rowGap : "10%",
        marginBottom : 10
     },
     footerText : {
         color:COLORS.dark_gray,
         fontSize: FONT_SIZE.medium
     },
     footerNums : {
         textAlign:"right",
         fontSize: FONT_SIZE.medium,
         color:COLORS.dark_gray
     },
     total : {
        fontWeight : "bold",
        fontSize: FONT_SIZE.large,
     },
     labelEndereco : {
        color:COLORS.gray,
        fontSize : FONT_SIZE.small
     },

     containerModal : {
       width : "100%"
     },

    /** modal */
    headerModal : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    },
    headerModalTitle : {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

    },
    paymentTitle :{
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.normal,
        marginTop: 20,
        marginBottom: 10,
       
    },
    paymentMethod : {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        marginBottom: 10
    },
   
    paymentMethodText : {
        marginLeft: 10,
        fontSize: FONT_SIZE.medium,
    }


}
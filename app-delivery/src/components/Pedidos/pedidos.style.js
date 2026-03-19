import { COLORS, FONT_SIZE } from "../../utils/constants";

export const styles = {
    
    container : {
        
            paddingLeft:15,
            paddingRight: 15,
            marginBottom:10,
            justifyContent: "space-between",
            flexDirection: "row"
    },

       pedido : {
         flex:1,
          gap: 1,
          paddingLeft: 10
    },
    reference : {
    
      flexDirection: "row",
      justifyContent :"space-between",
    },
    estabelecimento : {
        color:COLORS.dark_gray,
        fontSize: FONT_SIZE.medium
    },

    valorPedido : {
        width: "30%",
        color: COLORS.gray,
          fontSize: FONT_SIZE.medium
    },
    dataPedido : {
       
        color: COLORS.gray,
          fontSize: FONT_SIZE.small
    },
    logo : {
        width:75,
        height: 75,
        borderRadius:100
    },


    entregue : {
       
        color: COLORS.green,
        fontSize: FONT_SIZE.small
    },
    pending : {
        color: COLORS.gray,
        fontSize: FONT_SIZE.small
    },
    cancelado : {
        color: COLORS.primary_button,
        fontSize: FONT_SIZE.small
    },

    saiu : {
         fontSize: FONT_SIZE.small,
         color:COLORS.dark_gray
    },
    icon : {
        paddingRight : 3
    }

 

}
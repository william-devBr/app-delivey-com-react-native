    import { COLORS, FONT_SIZE } from "../../utils/constants";
    
    export const styles = {
    
    restaurants : {
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:10,
    },
    labels: {
         alignItems:"start",
         flex:1,
         padding:8
    },
    thumb : {
       width:75,
       height:75,
       borderRadius: 100
    },
    labelRestaurants : {
      fontSize:FONT_SIZE.medium,
      color:COLORS.dark_gray,
      marginBottom:5
    },
    address : {
        color:COLORS.gray,
        fontSize:FONT_SIZE.small
    },
    icon  : {
       color:COLORS.dark_gray
    },
    iconFavorite : {
         color:COLORS.primary_button
    },
    textStatus : {
        color: COLORS.gray,
        fontSize : 12
    }
}
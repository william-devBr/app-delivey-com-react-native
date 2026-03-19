import { COLORS, FONT_SIZE } from "../../utils/constants"


export const styles = {
    container : {
        flex: 1
    },

    header : {
        width:"100%",
        height: 200
    }, 
    thumb : {
        width :"100%",
        height:"100%",
    },
     areaBack : {
         position:"absolute",
          width: 40, 
          height : 40,
         top: 30,
         left: 30,
         zIndex : 1,
         backgroundColor : "#000",
         opacity: 0.5,
         borderRadius: "100%",
         alignItems:"center",
         justifyContent : "center"
     },

    btnBack : {
        
       fontSize:FONT_SIZE.xlarge,
        color:"#FFF"
       
    },

    subHeader : {
        paddingLeft: 20,
        paddingRight  : 20,
        paddingTop: 20,
        paddingBottom: 20,
       
    },
    title : {
          fontSize:FONT_SIZE.large,
          color:COLORS.dark_gray,
          marginBottom: 5
    }, 
    taxaEntrega: {
          fontSize:FONT_SIZE.small,
          color:COLORS.dark_gray
    },
    address :  {
        paddingLeft: 20,
        paddingRight  : 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection : "row",
        alignItems : "center",
        backgroundColor: COLORS.light_gray
    },
    addressText : {
       fontSize:FONT_SIZE.small,
       color:COLORS.dark_gray
    },
    locationArea : {
        width : 45,
        height : 45,
        backgroundColor: "#FFF",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginRight : 5
    },
    
    iconLocation : {
        fontSize: FONT_SIZE.large,
        color: COLORS.gray
    },
    opcoes: {
        flexDirection :"row",
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom : 20,

    },
    opcaoArea : {
       
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 5,
        paddingTop: 5,
        borderWidth : 1,
        borderColor : "gray",
        borderRadius : 10,
        alignItems:"center",
        marginLeft: 20

    },
    categorias : {
        paddingLeft: 20,
        paddingRight  : 20,
        paddingBottom: 10,
    },
    categoriaArea : {
       
        
    },
    categoriaTitle: {
        color: COLORS.dark_gray,
        textTransform:"capitalize",
        marginBottom: 10,
        marginTop: 20,
        fontWeight: "bold"
    },
     cardArea : {
        flex: 1,
          marginTop:20,
          marginBottom: 20
    },
    card : {
        flex: 1,
        width : "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.medium_gray

    },
    imgContainer : {
      width : 100,
      height : 80,
      overflow : 'hidden',
       borderRadius : 8
    },
    thumbItem : {
        width: "100%",
        height: 75,
       
    },
    icone : {
        width: 50,
        height: 50,
        borderRadius : 100,
        borderWidth: 1,
        borderColor: COLORS.gray
    },
     textArea :  {
         flex: 1,
         flexDirection : "column",
         rowGap : "5%",
         paddingLeft: 15
     },
     cardTitle : {
         color : COLORS.dark_gray,
         fontSize: FONT_SIZE.small,
         fontWeight : 500
     },
     cardDescription : {
        color : COLORS.gray,
         fontSize: FONT_SIZE.small
     },
     cardPrice : {
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.medium
     },
       icon  : {
       color:COLORS.dark_gray
    },
    iconFavorite : {
         color:COLORS.primary_button
    },
    fontSmall : {
        fontSmall : FONT_SIZE.small
    }
     
}
import { COLORS } from "../../utils/constants";

export const styles = {
    container : {
        
    },
    badges : {
        position:"absolute",
        top:-5,
        right:-10,
        backgroundColor:"red",
        color:"white",
        width:20,
        borderRadius:10,
        textAlign:"center",
    },
    header : {
        paddingTop: 10,
        marginBottom: 10,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
      
      
    },
    headerLabel : {
       color: COLORS.gray,
       fontSize: 10,
       marginBottom: 5,
       fontFamily: "sans-serif",
       fontWeight:'bold'
    },
    subHeader : {
        marginTop:5,
        marginBottom: 5
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

}
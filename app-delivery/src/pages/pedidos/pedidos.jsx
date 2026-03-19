
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, ActivityIndicator } from "react-native";
import PedidoComponent from "../../components/Pedidos/pedidos";
import http from "../../server/index";


export default function Pedidos(props) {

     const [pedidos, setPedidos] = useState([]);
     const [updatedScreen, setUpdatedScreen] = useState(false);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);

     const onRefresh = useCallback(async()=> {

         setUpdatedScreen(true);
         await  fetchData()
         setTimeout(()=> setUpdatedScreen(false), 2000)
         
     },[])

    const openPedido = ( id )=> { props.navigation.navigate('detalhe',{ id }) }

    async function fetchData() {

        try {
             const { data } = await http.get(`pedidos`);
                console.log(data)
             if(data.statusCode === 200) {
                    setPedidos(data.pedidos);
            }
            setLoading(false);
        } catch (error) {
              console.log(error?.response)
            setLoading(false);
            setError('Ocorreu um erro, tente novamente')
        
        }
            
           
    }

    useEffect(()=> { fetchData() },[]);
    
     if(error) return <Text style={{textAlign : "center", marginTop: 40}}>{error}</Text>;
     /** loading da página **/
      if (loading) return <ActivityIndicator color={"blue"}/>; 
  
    return (

         <View style={{marginTop: 30, flex:1}}>
           
            <FlatList 
            refreshControl={
                <RefreshControl refreshing={updatedScreen} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} tintColor={"#689F38"}/>
            }
             data = {pedidos}
             keyExtractor={(item)=> item.id}
             showsHorizontalScrollIndicator={false}
             renderItem={({item})=> {
                return <PedidoComponent pedido={item} onPress={()=> openPedido(item.id)} />
             } }

              ListEmptyComponent={()=> {
                         return <Text style={{textAlign:"center", color:"gray",fontSize:20, opacity:0.3}}>Não existem pedidos feitos.</Text>
            }}
            
            />
           
         </View>
    )
}

import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import http from "../../server";
import { styles } from "./detalhes.style";
import { formatDate } from "../../helpers/date";

/**
 * Página onde mostra os detalhes do pedido
 * @return;
 */

   

export default function Detalhes(props) {

    const [pedido, setPedido] = useState({});
    const [itens, setItens] = useState({itens : []})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { id } = props.route.params;


     async function fetchData () {
             
               try {
                 
                const { data } = await http.get(`pedidos/${id}`)
                    console.log(data)
                     setPedido(data)   
                     setItens(data.itens)

               } catch (error) {
                  console.log(error?.response.data)
                   setError('Ocorreu um erro ao tentar carregar...')
                  
               }
               finally {
                   setLoading(false);
               }
    }
  
    useEffect(()=> {

       fetchData();
       
    },[])

    /** traz o subtotal sem a taxa de entrega */
  const subTotal = useMemo(()=> itens.itens.reduce((acc, item) => acc + (item.total_item || 0), 0),[itens])
  const Total = useMemo(()=> pedido.vl_taxa_entrega ? parseFloat(subTotal) + parseFloat(pedido.vl_taxa_entrega) : 'Grátis',[itens])
  /** em caso de erro */
  if(error) return <Text style={{textAlign : "center", marginTop: 40}}>{error}</Text>;
 /** loading da página **/
  if (loading) return <ActivityIndicator color={"blue"}/>; 

    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{color: "gray",paddingLeft: 8}}>Pedido Nº  {pedido.itens.numero_pedido}</Text>
                <Text style={{ paddingLeft: 8,paddingRight: 8}}>{formatDate(pedido.itens.created_at)}</Text>
            </View>
         
            <FlatList 
            style={styles.cardArea}
            data={itens.itens}
            keyExtractor={(item,index)=> index}
            renderItem={({item})=> { 
                return <View style={styles.card}>
                    
                        <View style={styles.imgContainer}>
                          <Image source={{uri : item.img }} style={styles.thumbItem} resizeMode="cover" />
                        </View>
                            <View style={styles.textArea}>
                                 <Text style={styles.cardTitle}>{item.quantidade}x {item.nome}</Text>
                                  <Text style={styles.cardDescription}>{item.obs}</Text>
                            </View>
                            <Text style={styles.cardPrice}>{new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(item.total_item)}</Text>
                            
                       </View>
             }}
            />
            
        
            <View style={styles.detalhes}>
                <Text style={{fontSize:18, color: "gray", fontWeight: "bold"}}>Detalhes dos valores</Text>
             <View style={styles.detalheFooter}>
                <View style={styles.footerArea}>
                    <Text style={styles.footerText}>sub-total</Text>
                    <Text style={styles.footerText}>Taxa de entrega</Text>
                    <Text style={styles.footerText}>Total</Text>
                    </View>

                    <View style={styles.footerArea}>
                    <Text style={styles.footerNums}>
                         {new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(subTotal)}
                    </Text>
                    <Text style={styles.footerNums}>{pedido.vl_taxa_entrega || 'Grátis'}</Text>
                    <Text style={styles.footerNums}>{Total}</Text>
                    </View>
                </View>
            </View>
        </View>
    )

}
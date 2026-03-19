
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../helpers/date.js";
import { styles } from "./pedidos.style";


export default function PedidoComponent(props) {

    const {pedido, onPress} = props;


    const getStatusStyle = (status) => {
        
        switch(status) {

            case 3 :
                return styles.entregue;
            case  0 : 
                return styles.pending;
            case 2 : 
                return styles.cancelado;

            case 1 : 
                return styles.saiu
        }
    }

    const getStatusText = (status) => {

        switch(status) {

            case 3 : return <View style={[getStatusStyle(status), styles.status]}>
                                     
                                     <Text>Entregue</Text>
                                     </View>;
            case 0 : return <View style={[getStatusStyle(status), styles.status]}>
                                
                                    <Text>aguardando...</Text>
                                    </View>
            case 2 : return <View style={[getStatusStyle(status), styles.status]}>
                                      
                                      <Text>Cancelado</Text>
                                     </View>
            case 1 : return <View style={[getStatusStyle(status), styles.status]}>
                                     
                                      <Text>seu pedido está a caminho</Text>
                                      </View>
             
        }
    }

      return(
         
            <TouchableOpacity onPress={()=> onPress()}>
                <View style={styles.container}>
                <Image source={{ uri : pedido.icone }} style={styles.logo} />
                 <View style={styles.pedido} >
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.estabelecimento}>{pedido.nome}</Text>
                        <Text>Qtd. no pedido ({pedido.total_itens})</Text>
                    </View>
                    <View style={styles.reference}>
                        <Text style={styles.valorPedido}>
                            { 
                            new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(pedido.valor_pedido)
                            }
                        </Text>
                        <Text style={styles.dataPedido}>{formatDate(pedido.created_at)}</Text>
                        
                    </View>
                    <View>
                        <Text style={getStatusStyle(pedido.status_pedido)}> {getStatusText(pedido.status_pedido)}</Text>
                        
                    </View>
                </View>
                  </View>
             </TouchableOpacity>
       


      )
}
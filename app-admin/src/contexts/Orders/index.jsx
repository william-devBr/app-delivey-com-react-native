/***
 * 
 * ORDER CONTEXT
 */

import { createContext, useState , useEffect, useContext} from "react";
import { RestauranteContext } from "../Restaurante";
import http from '../../services/http';
import { socket } from '../../socket';

const OrderContext  = createContext();


const OrderProvider = ({children})=> {

    const {restaurante} = useContext(RestauranteContext);
    const [pedidos, setPedidos] = useState([]);
    const [pagination, setPagination] = useState(0);
    const [loadingPedido, setLoadingPedido] = useState(true)

   const loadPedidos = async()=> {

        const id = restaurante.restaurante_id;
        
        try {
            const { data } = await http.get(`/admin/${id}/pedidos`);
                setPedidos(data.result)
                setPagination(data.paginas)
        } catch (error) {
            console.log(error?.response)
        }finally {
            setLoadingPedido(false);
        }
   }

   useEffect(()=> {
      if(!restaurante.restaurante_id) return;
    
       /** entra na sala */
       socket.emit('join_restaurante', restaurante.restaurante_id);

       /** ouvinte de pedidos */
       socket.on('novo_pedido', (novoPedido)=> {
            setPedidos((prev)=> [novoPedido, ...prev]);
            alert('chegou um novo pedido ')
            console.log(novoPedido);
       });

        /** limpar ao fechar ou deslogar */
       return ()=> {
          socket.off('novo_pedido')
       }


   },[restaurante.restaurante_id])
    
    return <OrderContext.Provider value={{pedidos, setPedidos,
                                          loadPedidos, pagination, loadingPedido}}>
         {children}
      </OrderContext.Provider>
}

export {OrderContext, OrderProvider}
import http from "../../services/http";
import { dataConverter } from '../../helpers/helper';
import styles from "./style.module.css"
import { useContext } from "react";
import { OrderContext } from "../../contexts/Orders";


export default function Pedido(props) {

      const { setPedidos } = useContext(OrderContext);

       const statusText = (status) => {
    
          switch(status) {
             case 0 : return "aceitar";
             case 1 : return "preparando...";
             case 2 : return "pronto";
             case 3 : return "em rota de entrega";
             default : return "cancelado"
          }
       }
    
       const aceitePedido = async(pedido)=> {

            
           const payload = {
             numero_pedido : pedido,
             status: 1
           }
           try {
                const {data} = await http.put('/pedidos/status',  {payload});

                if(data.message === 'success') {
                      setPedidos((prev)=> 
                       prev.map((atual) =>
                        atual.numero_pedido === pedido ? {...atual, status_pedido : payload.status} : atual
                     ))
                }
           } catch (error) {
              console.log(error?.response?.data)
           }
       }


return (

     <div className={styles.cardContainer}>
         <div>{props.item.numero_pedido}</div>
        <div>
        <span>{props.item.name}</span>
        <div style={{color: "gray"}}>
            {props.item.endereco[0].rua}, {props.item.endereco[0].numero} - {props.item.endereco[0]?.complemento}
        </div>   
        </div>
        <div>{dataConverter(props.item.created_at)}</div>
        <div>
        {props.item.status_pedido === 0 
        ? 
            <button onClick={()=> aceitePedido(props.item.numero_pedido)} className={styles.btnStatus}> {statusText(props.item.status_pedido)}</button>
        : statusText(props.item.status_pedido)
        }
      </div>
</div>
)

}
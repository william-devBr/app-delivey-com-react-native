import { useContext, useEffect, useState } from 'react';
import {RestauranteContext} from "../../contexts/Restaurante/index"
import { OrderContext } from '../../contexts/Orders';
import http from '../../services/http';
import Pedido from '../../components/Pedido';
import styles from './style.module.css';


export default function Home() {

   
 const {pedidos,setPedidos, loadPedidos, pagination, loadingPedido} = useContext(OrderContext);
 const {restaurante} = useContext(RestauranteContext);
 const [paginaAtual, setPaginaAtual] = useState(1);
 const [loading, setLoading] = useState(false);

 const pedidosPorPagina = async(pagina) => {

    const id = restaurante.restaurante_id;
    setLoading(true);
      try {
            const { data } = await http.get(`/admin/${id}/pedidos`,{
                params : {page : pagina}
            });
                setPedidos(data.result)
                setPaginaAtual(pagina)
      } catch (error) {
          console.log(error?.response?.data)
      }
      finally {
         setLoading(false);
      }
 }


  useEffect(()=> { 
        setTimeout(()=> loadPedidos(), 3000)   
 }, []);//carrega os pedidos

  if(loading || loadingPedido) return <div style={{display : 'flex', alignItems:'center', justifyContent : 'center',marginTop: 150}}>Aguarde...</div>

     return(
     
        <div className={styles.container}>
             <div>
                <h1>Pedidos de Hoje</h1>
                <p>Acompanhamento em tempo real de operação comercial.</p>
             </div>

             <div className={styles.cardContainer}>
               <h3>Atividades recentes</h3>
               <div className={styles.pedidosContainer} aria-hidden="true">
                  {
                     pedidos.length > 0
                     
                     ?  pedidos.map((item, index)=> (
                           <Pedido key={index} item={item}/>
                     ))
                     
                     : <div>Não há pedidos registrados</div>
                  }
                      
               </div>
             </div>

             <div>
               <div className={styles.listPages}>
                 {Array.from({length : pagination}, (_, i)=> {
                      const pagina = i + 1;

                      return (
                         <button onClick={()=> pedidosPorPagina(pagina)}
                          className={paginaAtual === pagina ? styles.activePage : ' ' }>
                           {pagina}
                           </button>
                        )
                 })}
               </div>
            </div>

        </div>
       
            
     )
}


import {RestauranteContext} from '../../contexts/Restaurante';
import { useContext, useState, useEffect } from 'react';
import { priceConverter } from '../../helpers/helper';
import http from '../../services/http';
import styles from "./style.module.css";


export default function Produtos() {

   const { restaurante } = useContext(RestauranteContext);
   const [produtos, setProdutos] = useState([]);
   const [loading, setLoading] = useState(true);
    
   const loadProdutos = async()=> {

      try {
            const { data } = await http.get(`/produtos/${restaurante.restaurante_id}`)
            setProdutos(data.produtos)
      } catch (error) {
         console.log(error?.response?.data)
      }
      finally {
        setLoading(false);
      }
   }

   const inativarProduto = async(produto) => {

       try {
          const {data} =   await http.put(`/produtos/${produto.produto_id}/restaurante/${restaurante.restaurante_id}`, {active : !produto.active});
            console.log(data)
            setProdutos((prev)=>
            prev.map((item)=> (
                item.produto_id === produto.produto_id ? {...item, active : !produto.active} : item
            )))

       } catch (error) {
         console.log(error?.response?.data)
       }

        
   }

   useEffect(()=> {
      loadProdutos();
   },[])

   if(loading) return <div>Carregando...</div>

    return (
        <div className={styles.container}>
            <h1>Produtos</h1>
            <div className={styles.cardContainer}>
                 {produtos.length ? (
                    produtos.map((item, index)=> (
                        <div className={`${styles.flex} ${styles.spaceBetween} ${styles.itemsCenter}`} key={index}>
                            <div className={`${styles.flex}  ${styles.itemsCenter} `}>
                              <img className={`${styles.thumb}`}  src={item.imgurl} />
                                <span className={`${styles.textDarkGray} ${styles.fontBold}`}>{item.name}</span> 
                            </div>

                            <div className={`${styles.itemsCenter} ${styles.flex} ${styles.description}`}>
                                 <span className={`${styles.textSmall} ${styles.textMediumGray}`}>{item.description}</span>
                            </div>

                            <div>
                                {priceConverter(item.price)}
                            </div>

                            <div className={`${styles.flex}  ${styles.width100}`}>
                                <button 
                                   onClick={()=> inativarProduto(item)} // Função que chamará sua API
                                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                    item.active ? 'bg-green-500' : 'bg-gray-300'
                               }`}
                          >  
                            <span className="sr-only">Status do Produto</span>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                               item.active ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <div className={styles.ml5}>
                               <span className={styles.textMediumGray}> {item.active ? 'ativo' : 'inativo'} </span>
                          </div>
                        
                         </div>
                            
                         
                        </div>
                    ))
                 ) : 
                  <div>sem produtos cadastrados </div>
                 }
  
            </div>
        </div>
    )
}
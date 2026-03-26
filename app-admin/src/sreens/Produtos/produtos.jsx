
/** PRODUTOS PAHGE */
import {RestauranteContext} from '../../contexts/Restaurante';
import { useContext, useState, useEffect } from 'react';
import { priceConverter } from '../../helpers/helper';
import SearchIcon  from '@mui/icons-material/Search';
import  Modal from '../../components/Modal/modal'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import http from '../../services/http';
import styles from "./style.module.css";


export default function Produtos() {
  
  //HOOKS
   const { restaurante } = useContext(RestauranteContext);
   const [produtos, setProdutos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [paginaAtual, setPaginaAtual] = useState(1);
   const [pagination, setPagination] = useState(0);
   const [search, setSearch] = useState('');
 
  

   //FUNCTIONS
    
   const loadProdutos = async(pagina)=> {

      try {
            const { data } = await http.get(`/admin/${restaurante.restaurante_id}/produtos`,{
              params : {page : pagina}
            });
            setProdutos(data.result);
            setPagination(data.paginas)
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

   const inputSearch = async()=> {
      
       if(!search.length || search.length > 20) return;

       try {
              const { data } = await http.get(`/admin/produtos/${restaurante.restaurante_id}/produto?q=${search}`)

              if(data.result.length) {
                    setProdutos(data.result)
               }else {
                    setProdutos([])
               }

       } catch (error) {
        console.log(error?.response)
       }
   }

   const emptyInput = ()=> {
      if(search.length <= 1) {
         loadProdutos();
      }
   }

   


   useEffect(()=> {
     if(produtos.length) return;
      loadProdutos(paginaAtual);
   },[])

   if(loading) return <div>Carregando...</div>

    return (
     
          
        <div className={styles.container}>
          
            <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceBetween}`}>
                <h1>Produtos</h1>
                   <Modal title="Adicionar novo produto" />
                <div className={styles.inputArea}>
                   <input 
                    className={styles.input}
                    type="text" 
                    value={search} 
                    maxLength={20}
                    onKeyDown={emptyInput}
                    onChange={(text)=> setSearch(text.target.value)}
                   />
                   <button onClick={inputSearch}>
                    <SearchIcon color='primary' cursor='pointer' />
                   </button>
                </div>
            </div>

            <div className={styles.cardContainer}>
                 {produtos.length ? (
                    produtos.map((item, index)=> (
                        <div className={`${styles.cardItem}`} key={index}>
                            <div className={`${styles.flex} ${styles.flex1} ${styles.itemsCenter}`}>
                              <div className={styles.imgContainer}>
                                  <img className={`${styles.thumb}`}  src={item.imgurl} />
                              </div>
                            <div className={`${styles.ml5}`}>
                               <span className={`${styles.textDarkGray} ${styles.textMedium} ${styles.fontBold}`}>{item.name}</span> 
                            </div>
                             
                            </div>
 
                          
                            <div className={`${styles.itemsCenter} ${styles.description}`}>
                                 <span className={`${styles.textSmall} ${styles.textMediumGray}`}>{item.description}</span>
                            </div>
                        

                            <div className={styles.price}>
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
                  <div><Inventory2OutlinedIcon sx={{ fontSize: 50, color: '#ccc' }} />SEM RESULTADOS</div>
                 }
  
            </div>
            <div className={styles.listPages}>
                {Array.from({length : pagination}, (_, i)=> {
                    const pagina = i + 1;

              return (
                  <button onClick={()=> {
                    setPaginaAtual(pagina)
                    loadProdutos(pagina)
                  }}
                      className={paginaAtual === pagina ? styles.activePage : ' ' }>
                    {pagina}
                    </button>
                )
                })}
             </div>
             
        </div>
          
    )
}
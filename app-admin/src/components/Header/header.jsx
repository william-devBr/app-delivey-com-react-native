

import { useContext } from 'react'
import styles from './style.module.css'
import { RestauranteContext } from '../../contexts/Restaurante'



export default function Header(props) {

const {updateStatus} = useContext(RestauranteContext)
 
    return <div className={styles.hContainer}>
                 <div>
                   <span className={styles.title}>{props.restaurante.nome}.</span> 
                 </div>
                 <div className={styles.areaStatus}>

                    <div className={styles.areaToggle}>
                      <div>
                        <button 
                            onClick={()=> updateStatus()} // Função que chamará sua API
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                             props.aberto ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span className="sr-only">Status do Restaurante</span>
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                               props.aberto ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                      </div>
                      <span className={styles.titleStatus}> {props.aberto ? 'ABERTO' : 'FECHADO'} </span>
                    </div>

                    <div>
                        <img src={props.restaurante.icone} alt='' title='' />
                    </div>
                  
                 </div>

           </div>
}
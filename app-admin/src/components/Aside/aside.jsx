import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../contexts/User/index"
import { RestauranteContext } from '../../contexts/Restaurante';

import styles from './style.module.css';


export default function Aside() {

const location = useLocation();
const pathname = location.pathname;

const { setUser } = useContext(AuthContext)
const { aberto, updateStatus } = useContext(RestauranteContext);

const logout = ()=> {

     if(aberto) {
         updateStatus();
     }
    localStorage.removeItem('_u');
    setUser(null);

}

 return(
    <div>
        <nav className={styles.navContainer}>
            <ul>
                <li className={styles.linkContainer}>
                    <div className={pathname === '/' ? styles.linkActive : ''}>
                        <NavLink to={'/'}>INÍCIO</NavLink>
                     </div>
                </li>
                <li> 
                    <div className={pathname === '/produtos' ? styles.linkActive : ''}>
                      <NavLink to={'/produtos'}>PRODUTOS</NavLink>
                    </div>
                  
                </li>
                <li> 
                    <div className={pathname === '/categorias' ? styles.linkActive : ''}>
                      <NavLink to={'/categorias'}>CATEGORIAS</NavLink>
                    </div>
                  
                </li>

                 <li> 
                    <div>
                     <button onClick={logout}>SAIR</button>
                    </div>
                  
                </li>
            </ul>
        </nav>
    </div>

 )
}
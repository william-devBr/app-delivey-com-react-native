import Header from '../../components/Header/header';
import Aside from '../../components/Aside/aside';

import styles from './styles.module.css'
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import {RestauranteContext} from '../../contexts/Restaurante/index';
import http from '../../services/http';



export default function Layout() {

    const {restaurante, setRestaurante, aberto, setAberto} = useContext(RestauranteContext);

    const loadData = async()=> {

    try {
             /** carrega os dados do restaurante */
                const {data} = await http.get(`admin`);
                setRestaurante(data.result);
                setAberto(data.result.aberto)
                
        } catch (error) {
                console.log(error?.response)
        }
        finally {
            console.log('end')
        }

}


useEffect(()=> { loadData(); },[])

    
    return (
        <div>
        <div className={styles.layoutContainer}>
              <div className={styles.asideContainer}>
                <Aside/>
              </div>
              <div className={styles.headerContainer}>
                <Header restaurante={restaurante} aberto={aberto} setAberto={setAberto}/>
                <Outlet/>
              </div>
        </div>
     


        </div>
    )
}
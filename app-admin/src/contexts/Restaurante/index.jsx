/**
 * 
 * Restaurante contexto
 */
import { createContext, useState } from "react";
import http from "../../services/http";

const RestauranteContext = createContext();

function RestauranteProvider ({children}) {

    const [restaurante, setRestaurante] = useState({});
    const [aberto, setAberto] = useState(false); // state de restaurante aberto ou fechado

    const updateStatus = async()=> {
       
       const novoStatus = !aberto;

        try {
             await http.patch('/admin/status',{
              restaurant_id : restaurante.restaurante_id,
              status : novoStatus
            })
        } catch (error) {
            throw new Error(`Error: ${error?.response?.data}`)
        }

        setAberto(novoStatus)
    }

    return <RestauranteContext.Provider value={{restaurante, setRestaurante, aberto, setAberto, updateStatus}}>
             {children}
           </RestauranteContext.Provider>
}

export {RestauranteContext, RestauranteProvider}
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native'
import {styles} from "./restaurants.style";
import {MaterialIcons} from "@expo/vector-icons";
import { useState } from 'react';
import http from "../../server/index";

/**
 * RESTAURANTE COMPONENT CARD
 * @param {
 * } props 
 * @returns 
 */




export default function Restaurants(props) {

    const { onToggleFavorite } = props;

    const [favoriteIcon, setFavoriteIcon] = useState(props.icon);

   const getStatusFuncionamento = (horarios) => {
     
     if(!horarios || horarios.length === 0) return "Horário não disponível";

     const agora = new Date();

     const diaAtual = agora.getDay();
     const diaBusca = diaAtual === 0 ? 6 : diaAtual - 1;

     const hoje = horarios.find(h => h.dia_semana === diaBusca);

     if(!hoje || hoje.fechado) return "Fechado agora";

     const horaAtual = agora.getHours() + ":"+agora.getMinutes().toString().padStart(2, '0');

     if(horaAtual >= hoje.horario_abertura && horaAtual <= hoje.horario_fechamento) {
         return `Aberto até as ${hoje.horario_fechamento.slice(0,5)}h`;
     }else if(horaAtual < hoje.horario_abertura) {
         return  `Abre às ${hoje.horario_abertura.slice(0,5)}h`;
     }else {
        return `Fechado agora, abre às ${hoje.horario_abertura.slice(0,5)}h`;
     }

   }
 

    const handleFavorite = async ()=> {

    
         if( favoriteIcon === 'favorite' || favoriteIcon === 'delete' ) {
               console.log('desfavoritar')
               await http.delete(`restaurante/${props.id}/favoritar`)
                 setFavoriteIcon('favorite-outline');
         }else {
             console.log('favoritar')
              await http.post(`restaurante/${props.id}/favoritar`)
                setFavoriteIcon('favorite');

         }
         // 2. AVISA a tela pai que algo mudou
          if (onToggleFavorite) {
              onToggleFavorite(props.id);
          }
    
         
    }

    return (
          
         <TouchableOpacity style={[{flex:1}, !props.aberto  && {opacity : 0.3}]}
          onPress={()=> {  if(props.aberto) props.onPress(); }} >

            <View style={styles.restaurants}>
                
                <Image style={styles.thumb} source={{uri: props.imgUrl}} />
                
                <View style={styles.labels}>
                   {/**  <Text style={styles.textStatus}>{props.aberto ? 'aberto agora' : 'fechado'}</Text>*/}
                    <Text style={styles.labelRestaurants}>{props.name}</Text>
                    <View style={{flex:1, flexDirection: 'row', gap: 5}}>
                       <MaterialIcons name="delivery-dining" size={20} />
                       <Text>R$7,00</Text>
                       <Text>30 - 50min </Text>
                    </View>
                    <Text style={styles.address}>{getStatusFuncionamento(props.horarios)}</Text>
                </View>
               
                  {/** favoritar ou remover dos favoritos */}
                <Pressable onPress={handleFavorite}>
                   <MaterialIcons name={favoriteIcon} size={25} style={favoriteIcon === 'favorite' ? styles.iconFavorite : styles.icon} />
               </Pressable>
               <Text></Text>
            </View>
         </TouchableOpacity>
          
           
    )
}
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

    const [favoriteIcon, setFavoriteIcon] = useState(props.icon)

 

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
                    <Text style={styles.textStatus}>{props.aberto ? 'aberto agora' : 'fechado'}</Text>
                    <Text style={styles.labelRestaurants}>{props.name}</Text>
                    <Text style={styles.address}>{props?.address}</Text>
                </View>
               
                  {/** favoritar ou remover dos favoritos */}
                <Pressable onPress={handleFavorite}>
                   <MaterialIcons name={favoriteIcon} size={25} style={favoriteIcon === 'favorite' ? styles.iconFavorite : styles.icon} />
               </Pressable>

            </View>
         </TouchableOpacity>
          
           
    )
}
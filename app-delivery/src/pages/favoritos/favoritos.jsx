import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Restaurants from "../../components/Restaurants/Restaurants";
import http from "../../server/index";
import { styles } from "./favoritos.style";


export default function Favoritos(props){

  const [ restaurants, setRestaurants ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  function openCardapio(id){
      props.navigation.navigate('cardapio',{id});
  }

  const fetchData = async()=> {

    try {
          const { data } = await http.get(`usuarios/favoritos`);
          console.log(data)
              setRestaurants(data.resultados);

      } catch (error) {
        console.log(error.message)
              setError('ocorreu um erro, tente novamente')
      }finally{
               setLoading(false);
      }

  }

  const removerDaListaLocal = (idRemovido) => {
    setRestaurants(prev => prev.filter(restaurante => restaurante.restaurante_id !== idRemovido));
  };

  useEffect(()=> {
       fetchData();
  },[])



  /** em caso de erro */
  if(error) return <Text style={{textAlign : "center", marginTop: 40}}>{error}</Text>;
  /** loading da página **/
  if (loading) return <ActivityIndicator color={"blue"}/>; 
  
    return(<>
        <View style={styles.favoritos}>
          <FlatList 
          data={restaurants}
          keyExtractor={(item)=> item.restaurante_id}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> {
            return <Restaurants 
                    id={item.restaurante_id}
                     aberto={item.aberto}
                    name={item.nome}
                    address={item.endereco}
                    imgUrl={item.icone}
                    icon={'delete'}
                    onPress={()=> openCardapio(item.restaurante_id)}
                    onToggleFavorite={removerDaListaLocal}
                   />
          }}
          
            ListEmptyComponent={()=> {
                         return <Text style={{marginTop: 30,textAlign:"center", color:"gray",fontSize:20, opacity:0.3}}>Não existem favoritos adicionados.</Text>
              }}
          />

        
        </View>
          
        </>
    )
}
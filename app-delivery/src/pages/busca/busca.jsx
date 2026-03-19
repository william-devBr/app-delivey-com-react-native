import {View, Text, FlatList} from "react-native";
import { useState, useEffect } from "react";
import Restaurants from "../../components/Restaurants/Restaurants"
import {styles} from "./busca.style.js"
import http from "../../server/index";
import { ActivityIndicator } from "react-native-paper";

export default function Busca(props){

  const q = props.route.params.q;
  const idCategoria = props.route.params.idCategoria;

  const [loading, setLoading] = useState(true);
     

 const [filteredRestaurantes, setRestaurantes] = useState([])

 const openCardapio = (id)=> {
      props.navigation.navigate('cardapio', {id :  id })
  }

  const onRequestRestaurante = async()=> {

    try {

      const { data } = await http.get(`restaurante/busca`,{
            params : {
             q : q?.trim(),
             id_categoria : idCategoria
         }
      });

      if(data.statusCode===200 && data.resultado.length) {
          setRestaurantes(data.resultado)
      }
      
    } catch (error) {
       console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(()=> {

     onRequestRestaurante();
  }, []);

  if(loading) return <View style={{marginTop: 40}}><ActivityIndicator color="blue" /></View>

   
    return(<>
        <View style={styles.container}>
          <FlatList 
          data={filteredRestaurantes}
          keyExtractor={(item)=> item.restaurante_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=> {

            return <Restaurants 
                    aberto={item.aberto}
                    name={item.nome}
                    address={item.endereco}
                    imgUrl={item.icone}
                    icon={item.favorit === 'S' ? 'favorite' : 'favorite-outline'}
                    onPress={()=> openCardapio(item.restaurante_id)}

                   />
          }}
          
          ListEmptyComponent={()=> {
            return <Text style={styles.emptyText}>Não foram encontrados resultados para a sua busca.</Text>
          }}
          />

         <View style={{flex:1,alignItems: "center",justifyContent:"center", marginTop:40,marginBottom:40, heigth:200,}}>
              <Text style={{color:"#CCC"}}>isso é tudo por enquanto</Text>
            </View>
        
       
        </View>
          
        </>
    )
}
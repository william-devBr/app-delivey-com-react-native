import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TouchableHighlight, View } from "react-native";
import Button from "../../components/Button/button";
import { CartContext } from "../../contexts/ContextCart";
import http from "../../server/index";
import { styles } from "./cardapio.style";


export default function Cardapio(props) {


 const { id }   = props.route.params; 

 const { setTaxaEntrega } = useContext(CartContext);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

const scrollRef = useRef(null); //seta o REF para ir para a categoria quando clicado
const categoriasPosicoes = useRef({});
const [favoriteIcon, setFavoriteIcon] = useState('')


const [rest, setRest] = useState({
    restaurante: ' ',
    categorias: [],
    itens : [] 
});


/** 
 * função adiciona 
    ou remove favoritos
*/
const handleFavorite = async ()=> {


        if( favoriteIcon === 'S' ) {
             /**remove o restaurante dos favoritos do usuário */
            await http.delete(`restaurante/${id}/favoritar`);
            setFavoriteIcon('N');
        }else {
         /**adiciona o restaurante aos favoritos do usuário */
         await http.post(`restaurante/${id}/favoritar`)
         setFavoriteIcon('S');
        }
        
}

const handleItem = (item)=> {
    props.navigation.navigate('item',{data: item})
}

const irParaCategoria = (id) => {
  scrollRef.current?.scrollTo({
    y: categoriasPosicoes.current[id],
    animated: true,
  });
};

const  fetchData = async ()=> {

       try {

          const { data } = await http.get(`restaurante/${id}`);

          const  { itens }  = data;
        
         setRest({
            categorias : itens.categorias,
            restaurante : itens,
            itens : itens.produtos
        });

      setFavoriteIcon(itens.favorit);
      setTaxaEntrega(itens.vl_taxa_entrega)
        
       } catch (error) {
        setError(true)
       }
       finally {
         setLoading(false);
       }
        
}

/*** carrega a página do restaurante */
useEffect(()=> {
    fetchData();
},[])




if(loading) return <ActivityIndicator color="blue" />

/** error */
if(error) {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 40, paddingLeft: 40}}>
            <Text>Ocorreu um erro</Text>
            <Button title="voltar" onPress={()=> props.navigation.goBack()} />
        </View>
    )
}


    return (
          <ScrollView  showsVerticalScrollIndicator={false}  ref={scrollRef}>
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight style={styles.areaBack} onPress={props.navigation.goBack}>
                 <MaterialIcons name="arrow-back" style={styles.btnBack}  />
           </TouchableHighlight>
           
            <Image source={{uri : rest.restaurante.foto}} style={styles.thumb} resizeMode="cover" />
          </View>

          {/** nome, endereço, favoritar */}
          <View style={styles.subHeader}>

             <View>
 
             <View style={{alignItems: "center", flexDirection:"row", justifyContent:"space-between"}}>
                   <View style={{flexDirection:"row",alignItems:"center",gap: 5}}>
                     <Image style={styles.icone} source={{uri: rest.restaurante.icone}} />

                     <Text style={styles.title}>{rest.restaurante.nome}</Text>
                   

                   </View>
                    
                     {/** favoritar ou remover dos favoritos */}
                    <Pressable onPress={handleFavorite}>
                        <MaterialIcons name={favoriteIcon === 'S' ? 'favorite' : 'favorite-outline'} size={25} style={favoriteIcon === 'S' ? styles.iconFavorite : styles.icon} />
                    </Pressable>
             </View>

              <View style={{marginTop: 10,alignItems: "center", flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={styles.taxaEntrega}>pedido mínimo : R$10,00</Text>
                      <View> 
                       
                       <Text style={styles.taxaEntrega}>Taxa de entrega:  
                        {
                             rest.restaurante.vl_taxa_entrega < 1
                                 ? ' Grátis'
                                 :' ' +  new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format( rest.restaurante.vl_taxa_entrega)
                        }
                        </Text>
                      
                      </View>
              </View>

            </View>
             
          </View>
          {/**
           *   
           * 
           */}

          {/** endereço */}
          <View style={styles.address}>
            <View style={styles.locationArea}>
                 <MaterialIcons name="location-pin"  style={styles.iconLocation} />
            </View>
            
            <Text style={styles.addressText}>{rest.restaurante.endereco} - </Text>
            <Text style={styles.addressText}>{rest.restaurante.cidade}</Text>
          </View>

          {/** listage, de categorias */}
         <View style={{alignItems: "center", marginTop:10, paddingRight: 10}}>
            <ScrollView style={styles.opcoes} horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                rest.categorias.map((categoria,index)=> {
                return <TouchableHighlight
                            onPress={() => irParaCategoria(categoria.id)}
                            style={styles.opcaoArea} 
                            key={index}>
                          <Text>{categoria.nome}</Text>
                      </TouchableHighlight>
                })
              }
            </ScrollView>
         </View>
         

          {/** listagem de produtos */}
      
          <View style={styles.categorias}>
          
             <View style={styles.categoriaArea}>
            
                <View style={styles.cardArea}>
                {
                    rest.categorias.map((categoria, index)=>(

                          <View
                            onLayout={(event) => {
                                const { y } = event.nativeEvent.layout;
                                categoriasPosicoes.current[categoria.id] = y;
                                }}
                            key={index}
                          
                          > 
                           <Text style={styles.categoriaTitle}>{categoria.nome}</Text>

                           {
                           rest.itens.filter((produto)=>   produto.categoria_id === categoria.categoria_id )
                             .map((item, index)=> (
                               
                             <Pressable 
                                style={styles.card} 
                                key={index + 1}
                                onPress={()=> handleItem(item)}
                                >
                                   
                                    <View style={styles.imgContainer} >
                                           <Image source={{uri:item.imgurl}} style={styles.thumbItem} resizeMode="cover"  />
                                    </View>
                           
            
                                <View style={styles.textArea}>
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text style={styles.cardDescription}>{item.description}</Text>
                                </View>

                                <View>
                                    <Text style={styles.cardPrice}>
                                        { new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(item.price)}
                                    </Text>
                                </View>
                          </Pressable> 
                         
                             ))

                           }
                           
                          </View>
                    ))
                }
                   
               
                    
             </View>
          </View>
          </View>
          
    </View>
    </ScrollView>
    )
}
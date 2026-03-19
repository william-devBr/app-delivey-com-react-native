
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from "react-native";
import Banners from "../../components/Banners/banner";
import Categories from "../../components/Categories/categories";
import HomeHeader from "../../components/HomeHeader/home-header";
import Input from "../../components/Input/input";
import Restaurants from "../../components/Restaurants/Restaurants";
import http from "../../server/index";
import { styles } from "./home.style";


export default function Home(props) {


    const [search, setSearch] = useState("");
    const [restaurants, setRestaurantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [updatedScreen, setUpdatedScreen] = useState(false);

    const [categoria_restaurantes, setCategoriaRestaurantes] = useState([]); 

    const banners = []; // IMPLEMENTAR

 
    const handleSearch = (evt) => {
    
      if(search.trim().length > 0) {
        props.navigation.navigate('busca',{q : search})
        setSearch('')
      }
    }

    const handleCheckout = ()=> {
        props.navigation.navigate('checkout')
    }

    function openCardapio(id){
       props.navigation.navigate('cardapio',{id});
    }

    const fetchData = async()=> {

        try {
                const { data }  =  await http.get('restaurante');
                console.log(data)
                  setRestaurantes(data.restaurantes)

          } catch (error) {
            console.log(error.message)
               if(error.response.data.error) {
                  console.log(error.response?.data.error)
               }
                  setError('Não foi possível carregar os dados\n tente novamente mais tarde.')
          }
          finally {
          
             setLoading(false);
          }
          
    }

    const fetchCategorias = async()=> {
       /** lista as categorias principais */
       try {

           const { data } = await http.get('categoria');
      
           setCategoriaRestaurantes(data.result);
       } catch (error) {
         console.log(error.message)
       }
       finally {

       }
    }

    const onRefresh = useCallback(()=> {
       
        setRestaurantes([])
        setUpdatedScreen(true);
        fetchData()
        setTimeout(()=> setUpdatedScreen(false), 2000)
        
    },[])

   useEffect(()=> {

   fetchData();
   fetchCategorias();
  
   },[])



   /** em caso de erro */
  if(error) return <Text style={{textAlign : "center", marginTop: 40}}>{error}</Text>;

  if (loading) return <ActivityIndicator color={"blue"}/>; 
  

    return(
        <View style={styles.container}>
        
             <HomeHeader checkout={handleCheckout} />
             <ScrollView showsVerticalScrollIndicator={false}
               refreshControl={
                <RefreshControl refreshing={updatedScreen} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} tintColor={"#689F38"}/>
            }
             >
              {/** Input de busca */}
              <View>

                <Input 
                placeholder="O que vamos pedir hoje?"
                value={search}
                onChangeText={(text) => setSearch(text)}
                keyPress={handleSearch}
                iconName="search"
                keyType = "search"

                />
              </View>

       
            {/** Categorias */}
            <View>
               <Categories data={categoria_restaurantes} navigation={ props.navigation } />
            </View>
           
            {/** Banners */}
            <View>
              <Banners data={banners} />
            </View>
            
            <Text style={{fontWeight: '600', padding: 10}}>POPULARES</Text>
            <View style={{marginTop:20}}>
                
                 {
                  restaurants.map((restaurant,index)=>{
                    return <View key={index}>
                             <Restaurants 
                               id ={restaurant.restaurante_id}
                               aberto={restaurant.aberto}
                               name={restaurant.nome} 
                               address={restaurant?.endereco}
                               imgUrl={restaurant.icone}
                               icon = {restaurant.favorit === "S"  ? "favorite" : "favorite-outline"}
                               onPress={()=> openCardapio(restaurant.restaurante_id)}
                               />
                           </View>
                  })
                 }
              

            </View>

            <View style={{flex:1,alignItems: "center",justifyContent:"center", marginTop:40,marginBottom:40, heigth:200,}}>

              <Text style={{color:"#CCC"}}>isso é tudo por enquanto</Text>
                    
            </View>
            </ScrollView>
        
        </View>
    )
}
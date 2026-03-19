
/** 
 *  Concentra as páginas principais
 * @return;
 */

import Favoritos from "../../pages/favoritos/favoritos";
import Home from "../../pages/home/home";
import Pedidos from "../../pages/pedidos/pedidos";
import Perfil from "../../pages/perfil/perfil";
import { COLORS } from "../../utils/constants";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();


export default function Principal() {

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel : true,
            tabBarStyle : {
                justifyContent:"center",
                shadowColor: "transparent",
                elevation : 0,
                shadowOpacity: 0, // remove sombra no iOS
                shadowOffset: { width: 0, height: 0 }, // remove sombra no iOS
                shadowRadius: 0, // remove sombra no iOS
                padding: 0,
                paddingHorizontal: 0,
                paddingVertical: 0,
                margin: 0,
                borderTopWidth: 1, // remove borda superior se houver
                borderWidth: 0,
                height: 80, // ajuste conforme necessário

            }
        }} >
            <Tab.Screen name="home" component={Home}
             
             options={{
                title:"início",
                headerShown: false,
                tabBarIcon : ({focused})=> {
                    return <MaterialIcons name="home" style={{color:"gray",fontSize: 28,opacity : focused ? 1 : 0.3}} />
                }
             }} />

            <Tab.Screen name="favoritos" component={Favoritos}
            options={{
                title : "Favoritos",
                headerTitleAlign: "center",
                headerShadowVisible : false,
                 // HEADER PERSONALIZADO - Ajuste a altura aqui!
                headerStyle: {
                backgroundColor: '#FFF', // cor de fundo
                height: 70, // ← ALTURA DO HEADER (ajuste esse valor)
                // ou use elevation/sombra se quiser
                elevation: 0, // remove sombra no Android
                shadowOpacity: 0, // remove sombra no iOS
                borderBottomWidth: 1, // se quiser borda
                borderBottomColor: '#E0E0E0',
                },
                
                // Ajusta o título dentro do header
                headerTitleStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.dark_gray,
                },
                tabBarIcon : ({focused})=> {
                    return <MaterialIcons name="favorite" style={{color:"gray",fontSize: 28,opacity : focused ? 1 : 0.3}}  />
                }
            }}
            />

            <Tab.Screen name="pedidos" component={Pedidos}
             options ={{
                title : "Pedidos",
                headerTitleAlign : "center",
                headerShadowVisible : false,
                  // HEADER PERSONALIZADO - Ajuste a altura aqui!
                headerStyle: {
                backgroundColor: '#FFF', // cor de fundo
                height: 70, // ← ALTURA DO HEADER (ajuste esse valor)
                // ou use elevation/sombra se quiser
                elevation: 0, // remove sombra no Android
                shadowOpacity: 0, // remove sombra no iOS
                borderBottomWidth: 1, // se quiser borda
                borderBottomColor: '#E0E0E0',
                },
                
                // Ajusta o título dentro do header
                headerTitleStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.dark_gray,
                },
                tabBarIcon: ({focused})=> {
                    return <MaterialIcons name ="restaurant" style={{color:"gray",fontSize: 28,opacity : focused ? 1 : 0.3}}  />
                }
             }}
            />

            <Tab.Screen name="perfil" component={Perfil} 
            options={{
                title : "Minha conta",
                headerTitleAlign : "center",
                  // HEADER PERSONALIZADO - Ajuste a altura aqui!
                headerStyle: {
                backgroundColor: '#FFF', // cor de fundo
                height: 70, // ← ALTURA DO HEADER (ajuste esse valor)
                // ou use elevation/sombra se quiser
                elevation: 0, // remove sombra no Android
                shadowOpacity: 0, // remove sombra no iOS
                borderBottomWidth: 1, // se quiser borda
                borderBottomColor: '#E0E0E0',
                },
                
                // Ajusta o título dentro do header
                headerTitleStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.dark_gray,
                },
                tabBarIcon : ({focused})=> {
                    return <MaterialIcons name = "person" style={{color:"gray",fontSize: 28,opacity : focused ? 1 : 0.3}}  />
                }
            }}
            />

           </Tab.Navigator>

    )
}
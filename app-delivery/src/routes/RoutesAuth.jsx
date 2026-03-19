
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import { MyTheme } from "../ui/theme";

import Busca from "../pages/busca/busca.jsx";
import Cardapio from "../pages/cardapio/cardapio.jsx";
import Checkout from "../pages/checkout/checkout.jsx";
import Detalhe from "../pages/detalhes/detalhes.jsx";
import Item from "../pages/item/item.jsx";
import Principal from "../pages/principal/principal.jsx";
import Confirmacao from "../pages/confirmacao/confirmacao";
import MinhaConta from "../pages/conta/Conta";

import { useContext } from "react";
import { CartContext } from "../contexts/ContextCart";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../utils/constants";

const Stack = createNativeStackNavigator();

export default function RoutesAuth() {
  
   const { cart, clearCart } = useContext(CartContext)

return (

    <NavigationContainer theme={MyTheme}>

        <Stack.Navigator>
          

             <Stack.Screen name="principal" component={Principal} 
             
              options={{headerShown: false}}/>

             {/** página do restaurante */}
             <Stack.Screen name="cardapio" component={Cardapio} 
              options={{headerShown: false}}
             />

            {/** página detalhes do pedido */}
             <Stack.Screen name="detalhe" component={Detalhe} 
               options={{
                  headerShadowVisible : false,
                  title: "Detalhes do pedido",
                  headerTitleAlign : "center"
               }}
             />

              {/** página de busca por restaurante */}
             <Stack.Screen name="busca" component={Busca} 
               options={{
                  title: "Resultados da busca",
                  headerTitleAlign : "center"
               }}
             />

                {/** página do item / produto */}
             <Stack.Screen name="item" component={Item} 
               options={{
                  headerShown: false
               }}
             />

                 {/** página de finalizar o pedido */}
             <Stack.Screen name="checkout" component={Checkout} 
               options={{
                  headerShadowVisible: false,
                  title : "Finalizar pedido",
                  headerTitleAlign : "center",
                  presentation: 'modal',
                  animation : "slide_from_bottom" ,
                  headerRight : ()=> {
                    return cart.length >= 1 ? <Pressable onPress={clearCart}><Text style={{color:COLORS.primary_button, marginRight: 10}}>Limpar</Text></Pressable>:'';
                  }
               }}
             />

                {/** página de confirmação de envio do pedido */}
             <Stack.Screen name="confirmacao" component={Confirmacao} 
               options={{
                  title : "Status do pedido",
                  headerTitleAlign : "center"
               }}
             />

             
                {/** página de confirmação de envio do pedido */}
                <Stack.Screen name="conta" component={MinhaConta} 
                 options={{
                  title : "Meus dados",
                  headerTitleAlign : "center"
               }}
             />

            


        </Stack.Navigator>
    </NavigationContainer>
)

}
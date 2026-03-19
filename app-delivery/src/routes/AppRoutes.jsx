
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTheme } from "../ui/theme";

import Cadastro from "../pages/cadastro/cadastro";
import Endereco from "../pages/endereco/endereco";
import Login from "../pages/login/login";
import Welcome from "../pages/welcome/welcome";



/**
 * AppRoutes : Este componente define a estrutura de navegação do aplicativo.
 * Ele configura um stack navigator para gerenciar as telas de login, cadastro e endereço.
 * Cada tela tem estilos de cabeçalho personalizados para uma aparência consistente.
 */


const Stack = createNativeStackNavigator();



export default function AppRoutes() {
    return(

        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>

                {/** páginas sem autenticação */}
                   
                <Stack.Screen name="login" component={Login} 
                    options={{headerShown: false}}
                />

                <Stack.Screen name="cadastro" component={Cadastro}
                 options={{headerShown: false}}
                />
                
                <Stack.Screen name="endereco" component={Endereco} 
                options = {{
                    title : "voltar",
                    headerShown: true,
                    headerBackTitle: "Voltar",
                    headerBackImage: () => (
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    ),
                }}
                 />

                 <Stack.Screen name="welcome" component={Welcome} 
                        options = {{
                            title : "",
                            headerShown: false,
                 }}
                />

                 
            </Stack.Navigator>
        </NavigationContainer>
    )
}
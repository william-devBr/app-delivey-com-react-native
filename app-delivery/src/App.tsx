import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CartProvider } from "./contexts/ContextCart";
import { AuthProvider } from "./contexts/UserContext";
import Routes from "./routes/Routes";


/**
 * App: Componente principal do aplicativo.
 * @returns Componente de aplicativo.
 * 
 */



export default function App() { 

  

    return(
          <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
              <AuthProvider >
                <CartProvider>
                  <Routes />
                </CartProvider>
              </AuthProvider>
            </SafeAreaView>
          </SafeAreaProvider>
          
    
    
    )

}
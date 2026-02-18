import { View, Text } from "react-native";
import Header from "./components/Header/header";
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./pages/main";
import Footer from "./components/Footer/footer";
import AppRoutes from "./routes/AppRoutes";


export default function App() { 
    return(
        <SafeAreaProvider>
            <SafeAreaView>
                {/* <Header title="Meu Bairro" /> */}
                <AppRoutes />
                <Footer />
            </SafeAreaView>
       </SafeAreaProvider>

    )

}
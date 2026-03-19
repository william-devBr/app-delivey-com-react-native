import { View, Text, TouchableHighlight, Pressable} from "react-native"
import { styles } from "./perfil.style"
import { MaterialIcons } from "@expo/vector-icons";
import { setStorage } from "../../storage/storage";
import { AuthContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function Profile(props) {

  const { setUser } = useContext(AuthContext);

const logout = async()=> {
    try {
         
         await setStorage({})
         setUser({})
    } catch (error) {
      console.log('ocorreu um erro durante o logout ', error.message)
    }
}

    return(
          <View style={styles.container}>
            {/** endereço*/}
              <TouchableHighlight>
               <View style={styles.cardOption}>
                 <MaterialIcons name="location-on" style={styles.locationIcon} />
                  <View style={styles.location}>
                     <Text style={styles.addressTitle}>Endereço</Text>
                     <Text style={styles.addressDescription}>alterar endereço de entrega</Text>
                  </View>
                 <MaterialIcons name="arrow-forward-ios" style={styles.arrowRightIcon} />
               </View>
             </TouchableHighlight>

              {/**perfil*/}
              <TouchableHighlight onPress={()=> props.navigation.navigate('conta')}>
               <View style={styles.cardOption}>
                 <MaterialIcons name="person" style={styles.locationIcon} />
                  <View style={styles.location}>
                     <Text style={styles.addressTitle}>Meus dados</Text>
                     <Text style={styles.addressDescription}>informações da conta</Text>
                  </View>
                 <MaterialIcons name="arrow-forward-ios" style={styles.arrowRightIcon} />
               </View>
             </TouchableHighlight>

             {/**perfil*/}
              <Pressable onPress={logout}>
               <View style={styles.cardOption}>
                 <MaterialIcons name="logout" style={styles.locationIcon} />
                  <View style={styles.location}>
                     <Text style={styles.addressTitle}>Sair</Text>
                     <Text style={styles.addressDescription}>desconectar desse aparelho</Text>
                  </View>
                 <MaterialIcons name="arrow-forward-ios" style={styles.arrowRightIcon} />
               </View>
             </Pressable>

          </View>
    )
}
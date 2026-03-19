import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../utils/constants";
import { styles } from "./home-header.style";
import { useContext, useState } from "react";
import {CartContext} from "../../contexts/ContextCart";
import { AuthContext } from "../../contexts/UserContext";
import ModalComponent from "../Modal/Modal";
import FormEndereco from "../FormEndereco/FormEndereco";


 function UserEndereco(props){
   
const [visible, setVisible] = useState(false);


if(visible) {
    return  <ModalComponent visible={visible} onClose={()=> setVisible(false)}>
     
               <View style={styles.containerModal}>
               
                <View style={styles.headerModal}>
                    <Text style={styles.headerModalTitle}>Cadastrar novo endereço</Text>
                     <Pressable onPress={()=> {
                     setVisible(false);
                }}>
                   
                 <MaterialIcons name="close" size={24} color="#999" />
                </Pressable>
    
                </View>
    
              {/** form component endereco */}
               <FormEndereco  buttonTitle="Salvar novo endereço" />
    
             </View>
            </ModalComponent>
}

return props?.endereco !== undefined || props?.endereco !== '' 
? <Pressable onPress={()=> setVisible(true)}><View style={{flexDirection:"row",gap: 3, alignItems: "center"}}><MaterialIcons size={12} name="location-pin" color="red" /><Text style={{fontSize: 12, color:"#010101", fontWeight: 600}}>{props.endereco.length > 24 ? props.endereco.slice(0,22).concat('...') : props.endereco}</Text><MaterialIcons size={18} name="keyboard-arrow-down" color={'#C8C8C8'} /></View></Pressable>
: <Pressable onPress={()=> setVisible(true)}> <View style={{flexDirection:"row",gap: 3, alignItems: "center"}}><MaterialIcons size={12} name="location-pin" color="red" /><Text>informe seu endereço</Text><MaterialIcons size={18} name="keyboard-arrow-down" color={'#C8C8C8'} /></View></Pressable>
}
    

export default function HomeHeader(props) { 

    const { cart } = useContext(CartContext);
    const { user  } = useContext(AuthContext);

  


    return(
        <View style={styles.container}>
            <View style={styles.header}>
                 <View style={styles.subHeader}>
                    <Text style={styles.headerLabel}>RECEBER EM</Text>
                    <UserEndereco endereco={user.endereco} />
                </View>
               {/** Logo da loja */}
              <View style={{flexDirection: "row"}}>
               <Text style={{fontSize: 28, fontWeight: "900", color:"black"}}>FOODI</Text>
               <Text style={{fontSize: 30,fontWeight: "900", color:"tomato"}}>.</Text>
              </View>
            
                {/** carrrinho de compras */}
                <Pressable onPress={props.checkout}>
                    <Ionicons name="cart" size={30} color={COLORS.dark_gray}/>
                    <Text style={styles.badges}>{cart.length || '0'}</Text>
                </Pressable>   
            </View>        
        </View>
    )
}

/**
 * 
 * PÁGINA MINNHA CONTA
 * @readonly
 */
import { View, ActivityIndicator, Pressable , Text} from "react-native";
import Input from "../../components/Input/input.jsx";
import { styles } from "./style.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/UserContext.jsx";
import Button from "../../components/Button/button.jsx";
import http from "../../server/index.js"
import { getStorage, setStorage } from "../../storage/storage.js";
import {telephoneFormated} from "../../helpers/validation.js"



export default function MinhaConta() {

const [loading, setLoading] = useState(false)
const { user, setUser } = useContext(AuthContext);
const [values, setValues] = useState({});

const submitHandler = async()=> {
     if(values.telefone) {
        console.log(values.telefone.length)
     }
}

const handleInputChange = (field, value) => {
     setValues((prev)=>({
       ...prev,
       [field] : value
     }))
}

const loadDataUser = async()=> {

   const storage = await getStorage('user');

   try {

      const { data } = await http.get(`usuarios`);

        if(data.user.id !== storage.id_usuario) {
             await setStorage({});
             setUser({});
             return;
        }

    setValues({...user, nome : data.user.nome})
      
   } catch (error) {
        if(error.response?.data.error) {
             console.log(error)
        }
   }
   finally {
      setLoading(false);
   }
}

useEffect(()=> {loadDataUser()}, [])

if(loading) return <ActivityIndicator color="blue" />

return <View style={styles.container}>
    
      <Input label={"Nome"} 
      value={values.nome ?? 'falha ao carregar nome'}
      onChangeText = {(text)=> handleInputChange('nome', text)}
      />
      <Input label={"E-mail"} 
      value={values.email} 
      onChangeText={(text)=> handleInputChange('email', text)}
      />
      <Input label={"Celular"} 
      value={values.telefone ?? 'informe um telefone de contato'} 
      onChangeText={(text)=> handleInputChange('telefone', telephoneFormated(text))}
      />

     <Button 
        title={ loading ? <ActivityIndicator size="small" color="#FFF"  /> : "Salvar alterações"}
        onPress={submitHandler}
        loading={loading}
                                     
     />

     <Pressable style={styles.deleteAccount}>
      <Text>Excluir minha conta</Text>
     </Pressable>
        
    </View>

}
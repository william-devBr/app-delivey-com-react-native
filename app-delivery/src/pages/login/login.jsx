import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button/button";
import Header from "../../components/Header/header";
import Input from "../../components/Input/input";
import { AuthContext } from "../../contexts/UserContext";
import { validateEmail } from "../../helpers/validation";
import http from "../../server/index";
import { getStorage, setStorage } from "../../storage/storage";
import { styles } from "./login.style";

/**
 *  Página de login, onde o usuário pode inserir suas credenciais para acessar a aplicação.
 * 
 * @returns 
 */

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthContext)



   async function handleLogin() {

         const errors = { };

        if (!validateEmail(email)) {
            errors.email = "*E-mail inválido";
           // Alert.alert("E-mail inválido", "Por favor, insira um e-mail válido.");
          //  return;
        } 

        if(password.length === 0 || password.length > 50) {
             errors.senha = "*Preencha a senha corretamente.";
           
        }

        if(Object.keys(errors).length > 0) {
            return setError(errors);
        }

        const payload  = {email, password};
        setLoading(true)

        try {
                const { data } = await http.post(`auth/login`, payload)
             
                http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                const userData = await http.get(`usuarios`);
                
                data.endereco =  userData.data.user.endereco;

                 // salva os dados no storage
                await setStorage(data); 
                 //contexto de usu´rio
                setUser(data)
              

        } catch (error) {

                 console.log("ocorreu um erro " + error.message);
                 setError({login : 'Ocorreu um erro, tente novamente'});
                 await setStorage({})
                 setUser({})
        }
        finally {
                     setLoading(false);
                }


    }

    /** verifica se o usuário possui um token ao abrir a tela de login */
  async function LoadUser() {

      try{

        const user = await getStorage('user');
      
        if(user.token){
            http.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
           setUser(user); // user storage

        } else {
            setUser({});
            await setStorage({})
        }
         
      }catch(err){
       console.log('erro ao carregar dados do usuário ', err.message);
        setUser({});
            await setStorage({})

      }
  }

    if(Object.keys(error).length > 0) {
        setTimeout(()=> {
          setError({})
        }, 3500)
    }

    useEffect(()=> {
        LoadUser();
    },[])

    return (
        <KeyboardAvoidingView behavior="padding"  style={styles.container}>
            <View style={styles.header}>
               <Header title="Login" subtitle="Acesse sua conta" />
               {error.login && <Text style={styles.error}>{error.login}</Text>}
            </View>
           
           <View style={styles.inputGroup}>
             {error.email && <Text style={styles.error}>{error.email}</Text>}
            <Input
                label="E-mail"
                placeholder="Entre com seu e-mail"
                value={email}
                isPassword={false}
                onChangeText={(text) => setEmail(text)}
                iconName={''}

            />
           
           
            </View>

             <View style={styles.inputGroup}>
                 {error.senha && <Text style={styles.error}>{error.senha}</Text>}
             <Input
                label="Senha"
                placeholder="Entre com sua senha"
                value={password}
                isPassword={true}
                onChangeText={(text) => setPassword(text)}
                iconName={''}
                keyType = "text"
            />
            
            </View>
            
            <Button title={loading ? <ActivityIndicator size="small" color="#FFF"  /> : "Entrar"} 
            onPress={handleLogin}
            loading={loading}
            />

            <View style ={styles.footer}>
                <TouchableOpacity onPress={() => props.navigation.navigate("cadastro")}>
                    <Text>Não tem conta? Crie sua conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
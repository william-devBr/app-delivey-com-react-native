import { useState } from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import Button from "../../components/Button/button";
import Header from "../../components/Header/header";
import Input from "../../components/Input/input";
import { styles } from "./cadastro.style";
import { validateEmail } from "../../helpers/validation";
import http from "../../server/index";

/**
 *  Página de cadastro, onde o usuário pode inserir seus dados para criar uma conta.
 * @returns 
 */
export default function Cadastro(props) {

    const [user, setUser] = useState({

         nome : '',
         email : '',
         senha : '',
         senhaConfirm : ''
    })

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field,value)=> {

        setUser((prev)=>({
            ...prev,
             [field]  : value
        }))
    }

    const handleButtonContinue = async ()=> {

        const errors = {};

        if(!user.nome.trim().length) {
            errors.nome = "*preencha seu nome completo";
        }

         if(!validateEmail(user.email)) {
             errors.email = "*informe um e-mail válido";
         }

         if(user.senha.length < 6 || user.senha.length > 15) {
             errors.senha = "*sua senha precisa ter entre 6 ou 12 caracteres";
         }

          if(user.senha !== user.senhaConfirm) {
             errors.confirm = "*as senhas não conferem, verifique.";
         }

         if(Object.keys(errors).length > 0) {
             
            return setError(errors);
         }

         try {
             setLoading(true)
              const { data } = await http.post('auth/verification',{email: user.email});
             
               if(!data.ok) {
                     props.navigation.navigate("endereco", {user, setUser,  page:'signup'});
                     return;
               }

                setError({email : '*Já temos uma conta cadastrada com esse e-mail'});

         } catch (error) {
             console.log(error)
         }
         finally {
            setLoading(false);
         }

       // 
    }

 
    return (
        <ScrollView 
         showsVerticalScrollIndicator={false}
        >
        <View style={styles.container}>
            <View style={styles.header}>
               <Header title="Crie sua conta" subtitle="Preencha os dados abaixo para criar sua conta" />
            </View>
        
           <View style={styles.inputGroup}>
                <Input
                    label="Nome completo"
                    error={error.nome}
                    placeholder="Entre com seu nome completo"
                    value={user.nome}
                    onChangeText = {(value)=> handleInputChange("nome", value)}
                    isPassword={false}
                />
                
            </View>

             <View style={styles.inputGroup}>
              
                <Input
                    error={error.email}
                    label="E-mail"
                    placeholder="Entre com seu e-mail"
                    value={user.email}
                    onChangeText = {(value)=> handleInputChange("email", value)}
                    isPassword={false}
                />

                
             </View>

            <View style={styles.inputGroup}>
            <Input
                label="Crie uma senha"
                error={error.senha}
                placeholder="Crie uma senha para sua conta"
                value={user.senha}
                onChangeText = {(value)=> handleInputChange("senha", value)}
                isPassword={true}
            />
             
            </View>
         
            <View style={styles.inputGroup}>
                <Input
                    label="Confirme a senha"
                    error={error.confirm}
                    placeholder="Confirme a senha"
                    value={user.senhaConfirm}
                    onChangeText = {(value)=> handleInputChange("senhaConfirm", value)}
                    isPassword={true}
                />
                
            </View>

            {/** vai para a tela de endereço */}
            <Button 
             title="Continuar"
             loading={loading}
             onPress={handleButtonContinue} 
             size={20}
             icon="" />

               {/** volta para a tela de login */}
            <View style ={styles.footer}>
                <Pressable onPress={() => props.navigation.navigate("login")}>
                    <Text>Já possui conta? Faça login</Text>
                </Pressable>
            </View>
        </View>
        </ScrollView>
    )
}
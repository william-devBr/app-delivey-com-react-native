/**
 * Página de aviso que o cadastro foi feito
 * @readonly;
 */

import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles }  from "./welcome.style"
import Button from "../../components/Button/button";
import { useState } from "react";

export default function Welcome() {

    const [numbers, setNumbers] = useState({
        number1: '',
        number2 :'',
        number3 : '',
        number4 : ''
    })

    const [time, setTime] = useState(60);

    const handleChangeInput = (field, value) => {
        setNumbers((prev)=>({
            ...prev,
            [field] : value
        }))
    }

     /** permite apenas 1 número  no campo */
    const formatNumber = (num)=> {
          num = num.slice(0,1)
        return num
    }

    if(time !== 0) {
        setTimeout(()=>{
            setTime(time - 1)
        },1000)
    }

    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingLeft:20, paddingRight: 20}}>
            <View style={{marginBottom: 40}}>
                <MaterialIcons name={'check-circle-outline'} size={50} color="green" />
            </View>
            <Text style={{fontSize:20}}>Cadastro realizado com sucesso</Text>
            <Text>Enviamos um código de verificação pra seu e-mail</Text>
            <Text>insira o código abaixo: </Text>

            <View style={{flexDirection : "row", gap: 8, marginTop:20,alignItems: "center"}}>
                <TextInput
                  style={styles.textInput} 
                  value={numbers.number1}
                  onChangeText ={(value)=> handleChangeInput("number1", formatNumber(value))}
                  keyboardType="numeric"
                  />
                <TextInput
                   style={styles.textInput}
                   value={numbers.number2}
                   onChangeText ={(value)=> handleChangeInput("number2", formatNumber(value))}
                   keyboardType="numeric"
                  />
                <TextInput 
                   style={styles.textInput}
                   value={numbers.number3}
                   onChangeText ={(value)=> handleChangeInput("number3", formatNumber(value))}
                   keyboardType="numeric"
                 />
                <TextInput 
                   style={styles.textInput}
                   value={numbers.number4}
                   onChangeText ={(value)=> handleChangeInput("number4", formatNumber(value))}
                   keyboardType="numeric"
                  />
            </View>

            <View style={{marginTop: 10, flexDirection :"row", gap: 8}}>
                <Text>reenviar código em : {time}s</Text>
                {
                    time === 0 && <Pressable onPress={()=> setTime(60)}><Text>Reenviar</Text></Pressable>
                }
            </View>

            <View style={{width: "100%", marginTop: 40}}>

                <Button  title="Confirmar" />

            </View>
        </View>
    )
}
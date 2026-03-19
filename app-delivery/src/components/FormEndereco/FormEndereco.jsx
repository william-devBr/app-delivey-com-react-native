/**
 * 
 *  FORM COMPONENTE DE ENDERECO 
 * 
 * @readonly
 */
import { regexCep, validaNumero } from "../../helpers/validation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import * as Location from "expo-location";
import { useState, useContext } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import http from "../../server";
import Button from "../Button/button.jsx";
import Input from "../Input/input.jsx";
import { styles } from "./style.js";
import { AuthContext } from "../../contexts/UserContext";



export default function FormEndereco(props) {

    const { user, page } = props ; 
    const { setUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [onEditLocation, setEditLocaton] = useState(false);
    const [error, setError] = useState({});
    const [ufPicker, setUfPicker] = useState('')

    const [endereco, setEndereco] = useState({
        cep : '',
        rua : ' ',
        numero : ' ',
        complemento : ' ',
        bairro : ' ',
        cidade : ' '
    });

    const estados = [
        "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito federal","Espírito santo","Goiás",
        "Maranhão","Mato grosso","Mato grosso do sul","Minas gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí",
        "Rio de janeiro","Rio grande do norte","Rio grande do sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"
    ];


    const handleChange = (field, value)=> {
       
         setEndereco((prev)=>({
            ...prev,
            [field] : value
         }))
    }

     /** envio para primeiro cadastro */
     const handleSubmit = async ()=> {

        const errors = { };

        if((endereco?.rua?.trim()?.length ?? 0 ) < 5) {
             errors.rua = "*preencha seu endereço corretamente.";
        }

        if((endereco?.numero?.trim()?.length ?? 0) < 1) {
            errors.numero = "*Campo obrigatório";
        }

        if( (endereco?.cidade?.trim()?.length ?? 0) < 6 ){
             errors.cidade = "*campo cidade é obrigatório";
        }

        if((endereco?.bairro?.trim()?.length ?? 0) < 3 ) {
            errors.bairro = "*campo bairro é obrigatório.";
        }

         if((endereco?.cep?.trim()?.length ?? 0) < 8 ) {
            errors.cep = "*campo cep é obrigatório.";
        }
        if(ufPicker === " " ) {
            errors.uf = "* UF do estado.";
        }

        if(Object.keys(errors).length > 0 ) {
            return setError(errors)
        }

        setLoading(true);

        const payload = {
    
            endereco : endereco.rua.trim(),
            numero : endereco.numero,
            complemento : endereco?.complemento?.trim(),
            cidade : endereco.cidade.trim(),
            bairro : endereco.bairro.trim(),
            estado :ufPicker,
            cep : endereco.cep
        }

        if(page === 'signup') {

                     payload.user = user;

               try {
                    const { data } = await http.post(`usuarios/signup`, payload) // cadastro

                    if(!data.success) {
                        setError({endereco : data.message});
                        
                    }else {
                        props.navigation.navigate('welcome');
                    }
                        
                    } catch (error) {
                        console.log('ocorreu um erro ' + error.message)
                    }
                    finally {
                        setLoading(false);
                }
        } else {

           
          try {

             const { data } = await http.put('usuarios', payload);
             
            if(data.result.statusCode === 201) {
                setUser((prev)=> ({
                    ...prev,
                      endereco : payload.endereco
                }))
            }

            
          } catch (error) {
            console.log(error.message)
          }
          finally {
             setLoading(false);
          }


        }
    
      
    }
    //localização do usuário pelo botão minha localização
    const userLocation = async ()=> {
        if(onEditLocation) return;
        try {
          setEditLocaton(true);
            let { status } = await Location.requestForegroundPermissionsAsync();

         if(status !== 'granted') {
            Alert.alert('Precisamos da permissão para buscar a localização')
           return console.log('error: location not granted')
         }

         let location = await Location.getCurrentPositionAsync({});
         const {latitude, longitude} = location.coords;

         const response = await Location.reverseGeocodeAsync({latitude, longitude});

        if(response.length > 0) {

            const userEndereco = response[0];
             setEndereco((prev)=> ({
                     ...prev,
                     rua  :userEndereco.street,
                     cidade: userEndereco.district,
                     numero:userEndereco?.name,
                     cep: userEndereco?.postalCode,               
             }));

             setUfPicker(()=> userEndereco?.subregion)
         
        } else {
           Alert.alert('Não possível usar a sua localização')
        }

            
        } catch (error) {
             Alert.alert(error.message)
        }
        finally{
            setEditLocaton(false)
        }
         
         
    }

    return(

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
                      <Text style={{marginBottom: 15, textAlign: 'center', fontWeight: 'bold'}}>{props.title}</Text>
                      {/* Botão Localização */}
                        <Pressable style={styles.locationButton} onPress={ userLocation }>
                        <MaterialIcons name="explore" size={18} color="#f45d5d" />
                         <Text style={styles.locationText}>Usar minha localização</Text>
                        </Pressable>
        
                        {/* Campo CEP e UF*/}
                        <View style={[styles.row,{ justifyContent :"space-between", gap: 5}]}>
                            <View style={{flex: 1}}>
                                <View >
                                    
                                    <Input
                                        label="Cep"
                                        error={error.cep}
                                        placeholder="00000-000"
                                        value={endereco.cep}
                                        isPassword={false}
                                        onChangeText={(text) => handleChange('cep', regexCep(text))}
                                        iconName={''}

                                    />
                                
                                </View>
                            </View>


                            <View style={{flex: 1.5}}>
                                <View>
                                    <Text style={styles.label}>Estado</Text>
                                    { error.uf && <Text style={{fontSize: 12, color : 'red'}}>{error.uf} </Text>} 
                                <View style={styles.pickerContainer}>
                                    <Picker style={[styles.picker]}
                                    selectedValue={ufPicker}
                                    onValueChange={(value)=> setUfPicker(value)}
                                    >
                                    <Picker.Item label="Estado" value="" />
                                    {
                                        estados.map((uf, index)=> {
                                            return <Picker.Item key={index} label={uf} value={uf} />
                                        })
                                    }

                                    </Picker>
                                </View>
                                </View>
                            </View>

                       </View>

                        {/* Campo Rua */}
                
                        <Input
                            label="Rua"
                            error={error.rua}
                            placeholder="Nome da rua ou avenida"
                            value={endereco.rua}
                            isPassword={false}
                            onChangeText={(text) => handleChange('rua', text)}
                            iconName={''}

                        />
        
                {/* Linha Dupla: Número e Complemento */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    
                     <Input
                        label="Numero"
                        error={error.numero}
                        placeholder="Ex: 123"
                        value={endereco.numero}
                        isPassword={false}
                        onChangeText={(text) => handleChange('numero', validaNumero(text))}
                        iconName={''}

                        />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1.5 }]}>
                  
                     <Input
                        label="Compl."
                        placeholder="Apto, bloco...."
                        value={endereco?.complemento}
                        isPassword={false}
                        onChangeText={(text) => handleChange('complemento', text)}
                        iconName={''}

                        />
                  </View>
                </View>
        
                {/* Campo Bairro */}
               
                 <Input
                    label="Bairro"
                    error={error.bairro}
                    placeholder="Nome do bairro"
                    value={endereco.bairro}
                    isPassword={false}
                    onChangeText={(text) => handleChange('bairro', text)}
                    iconName={''}

                 />
        
                {/* Campo Cidade */}
              
                 <Input
                    label="Cidade"
                    error={error.cidade}
                    placeholder="Nome da cidade"
                    value={endereco.cidade}
                    isPassword={false}
                    onChangeText={(text) => handleChange('cidade', text)}
                    iconName={''}

                />
        
                {/* Botão Salvar */}
                <Button title={loading ? <ActivityIndicator size="small" color="#FFF"  /> : props.buttonTitle} onPress={handleSubmit} loading={loading} />
                
             </ScrollView>
    )
}
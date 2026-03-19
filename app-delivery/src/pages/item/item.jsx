import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Pressable, 
    ScrollView, Text, TextInput, TouchableHighlight, View, Platform } from "react-native";
import Button from "../../components/Button/button";
import { CartContext } from "../../contexts/ContextCart";
import { styles } from "./item.style.js";

/**
 * ITEM DO CARDÁPIO
 * @param {
 * } props 
 * @returns 
 */

 export default function Item (props) {

    const { data } = props.route.params;

    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(data.price)
    const [loading, setLoading] = useState(false);
    const [obs, setObs] = useState('');

     const { addItem } = useContext(CartContext);


    const addQuantity = ()=> {
        setQuantidade(quantidade + 1)
    }

    const removeQuantity = ()=> {
        if(quantidade <= 1) {
            setQuantidade(1);
            return;
        }
         setQuantidade(quantidade - 1)
    }

    const addToCart = () => {
        setLoading(true)
        
      const itemAdd = {
            produto_id : data.produto_id,
            name : data.name,
            imgurl : data.imgurl,
            quantidade : quantidade,
            valorItem : data.price,
            totalItem : (quantidade * parseFloat(data.price)),
            obs : obs

      }
     
       addItem(itemAdd, data.restaurante_id);
       setLoading(false)
       props.navigation.navigate('checkout');
    }



    useEffect(()=>{
        setTotal(quantidade * data.price)
    },[quantidade]);



    return(  

       
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
         
         <ScrollView>
                <View style={styles.header}>
                        <TouchableHighlight style={styles.areaBack} onPress={props.navigation.goBack}>
                                    <MaterialIcons name="arrow-back" style={styles.btnBack}  />
                        </TouchableHighlight>
                        
                        <Image source={{uri : data.imgurl }} style={styles.thumb} resizeMode="cover" />
                </View>
                
                
                <View style={styles.container}>
                    <View style={{marginBottom: 20}}>
                        <Text style={styles.title}>{data.name}</Text>
                        <Text style={styles.description}>{data.description}</Text>
                        <Text style={styles.price}>
                            { new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(data.price)}
                        </Text>
                    </View>
                </View>

            
                <View style={styles.container}>
                    <Text>Observações:</Text>
                    <TextInput 
                        onChangeText={(text)=> setObs(text)}
                        multiline={true}
                        numberOfLines={4}
                        maxLength={200}
                        style={styles.textArea}
                        placeholder={"máx. 200 caracteres"}
                        placeholderTextColor={"gray"}
                    />
                </View>
         </ScrollView>
         
               

        
                <View style={styles.container}>
                        <View style={{
                            flexDirection: "row",
                            alignItems:"center",
                            justifyContent: "space-between",
                            paddingTop:8,
                            marginRight: 30,
                            
                        }}>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Pressable onPress={removeQuantity}>
                                <MaterialIcons name="remove-circle-outline" style={styles.quantityIcon} />
                            </Pressable>
                            
                                <Text style={styles.quantityNumber}>{quantidade}</Text>
                            
                            <Pressable onPress={addQuantity}>
                                <MaterialIcons name="add-circle-outline" style={styles.quantityIcon} />
                            </Pressable>
                            </View>
                            <View>
                                <Text>Total do item</Text>
                                <Text style={styles.vlTotal}>{new Intl.NumberFormat("pt-BR",{style : "currency", currency : "BRL"}).format(total)}</Text>
                            </View>
                            
                            
                        </View>
                    <View>
                        <Button
                        onPress={addToCart}
                        title={ loading ? <ActivityIndicator size="small" color="#FFF"  /> : `Adicionar` } />
                    </View>
                    
                        
                </View>
        </KeyboardAvoidingView>
        
    )
}

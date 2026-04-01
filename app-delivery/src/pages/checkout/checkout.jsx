
/*** CHECKOUT
 * 
 * @readonly;
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import FormEndereco from "../..//components/FormEndereco/FormEndereco.jsx";
import Button from "../../components/Button/button.jsx";
import ModalComponent from "../../components/Modal/Modal";
import { CartContext } from "../../contexts/ContextCart.jsx";
import { AuthContext } from "../../contexts/UserContext";
import http from "../../server/index.js";
import { getStorage } from "../../storage/storage.js";
import { styles } from "./checkout.style.js";




export default function Checkout(props) {

 const { cart, taxaEntrega, ownerCart ={}, clearCart, paymentLabels } = useContext(CartContext);

 const { user } = useContext(AuthContext);

const [checked, setChecked] = useState('atual');
const [loading, setLoading] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [paymentMethod,setMethodPayment] = useState(false);


 const paymentSelect = (payment)=> {
    setMethodPayment(payment);
 } 

 const submitOrder = async() => {
     
      if(!paymentMethod) return Alert.alert('informe o tipo de pagamento');

       const { id_usuario } = await getStorage('user');
       
       const order = {
          cart,
          id_usuario,
          restaurante_id : ownerCart?.restaurante_id,
          taxaEntrega
       }

       setLoading(true)

       try {

        const { data } = await http.post('pedidos', {order})
         console.log(data)
          if(data.statusCode === 201) {

            clearCart();
            props.navigation.navigate('confirmacao',{cart, taxaEntrega, endereco: user.endereco });

        } 
        
       } catch (error) {
         console.log(error.message)
       } finally {
         setLoading(false)
       }
}

const  totalPedidos = cart.reduce((acc, item)=> {
       const valor = parseFloat(item.product.valorItem || 0);
       const quantidade =  item.product.quantidade || 0;
       return acc + (valor * quantidade);
}, 0);

if(modalVisible) {
    
    return <ModalComponent visible={modalVisible} onClose={()=> setModalVisible(false)}>
 
           <View style={styles.containerModal}>
           
            <View style={styles.headerModal}>
                <Text style={styles.headerModalTitle}>Cadastrar novo endereço</Text>
            
            <Pressable onPress={()=> {
                setModalVisible(false);
            }}>
               
             <MaterialIcons name="close" size={24} color="#999" />
            </Pressable>

            </View>

          {/** form component endereco */}
           <FormEndereco user={user} title="" buttonTitle="Salvar endereço" />

         </View>
        </ModalComponent>
}


if(!cart || cart.length === 0) {
 
     return <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 40, paddingLeft: 40}}>
               <Text>Seu carrinho está vazio!</Text>
               <Button title="voltar" onPress={()=> props.navigation.goBack()} />
           </View>
}


return (
      <ScrollView style={styles.container}>
        <View>
                  {cart.length > 0 && (    
                       <>
                        <View style={styles.cardArea}>
                            {cart.length > 0 && cart.map((item,index)=>{
                                    
                            return   <View style={styles.card} key={index}>
                                        <Image source={{uri : item.product.imgurl}} style={styles.thumb} />
                                        
                                            <View style={styles.textArea}>
                                                <Text style={styles.cardTitle}>{item.product.quantidade}x {item.product.name}</Text>
                                                <Text style={styles.cardDescription}>{item.product.obs}</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.cardPrice}>{new Intl.NumberFormat("pt-BR",{style: "currency", currency : "BRL"}).format(item.product.totalItem)}</Text>
                                            </View>
                                    </View>    
                            })}
                        </View>
               
        
                        <View style={styles.detalhes}>
                            <Text style={styles.titleDelivery}>RECEBER EM</Text>
                            <View style={{flexDirection: "row", justifyContent :"space-between"}}>
                            
                            <View style={{flexDirection :"row", alignItems : "center",flexShrink: 1}}>
                                    <RadioButton 
                                    onPress={()=> setChecked('atual')}
                                    status={checked === 'atual' ? 'checked' : 'unchecked' }
                                    />
                                <Text>{user.endereco ?? 'informar endereço'}</Text>
                            </View>
                            {!!user.endereco && 
                                <View style={{flexDirection :"row", alignItems : "center"}}>
                                    <RadioButton 
                                    onPress={()=> {
                                            setChecked('outro');
                                            setModalVisible(true)
                                    } }
                                    status={checked === 'outro' ? 'checked' : 'unchecked' }
                                    />
                                    <Text>Outro</Text>
                          
                                </View>
                              }
                            </View>

                            <Text style={styles.paymentTitle}>PAGAMENTO</Text>
                            <View>

                             {Object.entries(paymentLabels).map(([key, label])=> {
                                 const pay = paymentLabels[key];
                                 
                                 return <Pressable key={key} style={paymentMethod === label ? {...styles.paymentMethod, backgroundColor: '#ed5359', opacity: 0.8} : styles.paymentMethod} onPress={()=> paymentSelect(label)}>
                                           <MaterialIcons name={pay.icon} size={20} color={ paymentMethod === label ? '#fff' : 'black'} />
                                          <Text style={paymentMethod === label ? {...styles.paymentMethodText, color: '#fff'} : styles.paymentMethodText}>{pay.name}</Text>
                                        </Pressable>
                        })}

                          

                           
                            </View>

                            <View style={styles.detalheFooter}>
                                <View style={styles.footerArea}>
                                    <Text style={styles.footerText}>Sub-total</Text>
                                    <Text style={styles.footerText}>Taxa de entrega</Text>
                                    <Text style={[styles.footerText,styles.total]}>Total</Text>
                                </View>
                                <View style={styles.footerArea}>
                                    <Text style={styles.footerNums}>{new Intl.NumberFormat("pt-BR", {style :"currency", currency : "BRL"}).format(totalPedidos)}</Text>
                                    <Text style={styles.footerNums}>{taxaEntrega === 0 ? 'Grátis': new Intl.NumberFormat("pt-BR", {style :"currency", currency : "BRL"}).format(taxaEntrega)}</Text>
                                    <Text style={[styles.footerNums, styles.total]}>{new Intl.NumberFormat("pt-BR", {style :"currency", currency : "BRL"}).format((parseFloat(totalPedidos) + parseFloat(taxaEntrega)))}</Text>
                                </View>
                            </View>
                                
                            <View>
                                <Button 
                                    title={loading ? <ActivityIndicator size="small" color="#FFF"  /> : "Finalizar pedido"}
                                    onPress={submitOrder}
                                    loading={loading}
                                />
                            </View>
                        </View>
                     </>
        ) 
    }
    </View>
    </ScrollView>
)

}
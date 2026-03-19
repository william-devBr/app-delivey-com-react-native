/***
 * 
 *  TELA DE CONFIRMAÇÃO DO PEDIDO
 * @readonly
 */
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Button from "../../components/Button/button";
import { styles } from './styles';

export default function Confirmacao(props) {

    const {cart, taxaEntrega, endereco} = props.route.params;


    return(
        <ScrollView>
        <View style={styles.container}>

            <View style={styles.areaView}>
                <View style={styles.areaIcon}>
                    <MaterialIcons name="check" style={styles.checkIcon}/>
                </View>

                <View style={{marginTop: 20, alignItems :"center", justifyContent: "center"}}>
                    <Text style={styles.textSuccess}>Pedido realizado com sucesso</Text>
                    <Text>Seu pedido já está sendo preparado</Text>
                </View>

                <View style={styles.cardArea}>
                     <Text style={styles.titleTempo}>PREVISÃO DE ENTREGA</Text>
                     <Text style={styles.tempoEntrega}>30 - 40 min</Text>
                     <Text style={{fontSize:14}}>{taxaEntrega > 0 ?  new Intl.NumberFormat("pt-BR", {style : "currency", currency : "BRL"}).format(taxaEntrega):"Grátis"}</Text>
                     <Text style={styles.endereco}>{endereco}</Text>
                </View>

                <View style={styles.cardArea}>
                   <Text style={styles.titleTempo}>Resumo do pedido</Text>

                    {cart.length && cart.map((item,index) => (
                            <View style={styles.item} key={index}>
                                <View style={styles.imgContainer}>
                                    <Image source={{uri : item.product.imgurl}} style={styles.thumbItem} resizeMode="cover" />
                                </View>
                    
                                <View style={styles.cardContainer}>
                                <Text style={styles.itemContainer}> {item.product.quantidade}x {item.product.name}</Text>
                                <Text style={styles.descriptionContainer}>{item.product?.description}</Text>
                                <View> 
                                     <Text style={styles.total}>{new Intl.NumberFormat("pt-BR", {style : "currency", currency : "BRL"}).format(item.product.totalItem)}</Text>
                                </View>
                                </View>
                            </View>
                    ))
                    }
                  
                </View>
                
                <View style={{marginTop: 30, width: "100%"}}>
                    <Button title={"Acompanhar pedido"}  style={styles.p10} />

                    <Pressable style={{alignItems: "center", marginTop : 20, marginBottom: 20}}>
                        <Text>Voltar ao inicio</Text>
                    </Pressable>
                </View>
          </View>

        </View>
        </ScrollView>
    )
}
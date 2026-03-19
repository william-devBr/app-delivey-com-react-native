import {View, Text, Image, ScrollView, Pressable} from 'react-native'
import {styles} from "./categories.style";


export default function Categories(props) {

    const buscaCategoria = (id)=> {
        props.navigation.navigate('busca',{ idCategoria : id })
    }

    return (

          <View style={styles.categories}>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {props.data.map((item,index) => (
                <Pressable key={index} style={{alignItems:"center", marginRight:20}} onPress={()=>buscaCategoria(item.id_categoria)}>
                    <Image source={{uri : item.icone }} style={{width:65, height:65}} />
                    <Text style={styles.labelCategories}>{item.categoria}</Text>
                </Pressable>
            ))}
            </ScrollView>
        </View>
    )
}
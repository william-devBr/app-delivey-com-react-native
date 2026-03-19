import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import {styles} from "./banner.style";


export default function Banners({data}) {
    return (

          <View style={styles.banners}>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((item,index) => (
                <TouchableOpacity key={index}>
                    <View style={{alignItems:"center", marginRight:20}}>
                        <Image source={item.urlImage} style={{width:250, height:133}} />
                    </View>
                </TouchableOpacity>
            ))}
            </ScrollView>
        </View>
    )
}
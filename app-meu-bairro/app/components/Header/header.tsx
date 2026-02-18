import IconButton from "@/app/ui/icon-button";
import { View, Text, StyleSheet} from "react-native";


interface Ipropsinterface {
    title: string;
}

export default function Header(props: Ipropsinterface) {
    return(
        <View style={styles.container}>
            <Text>{props.title}</Text>
            {/* <IconButton name="menu-outline" size={30} color="black"  />
            <IconButton name="person-outline" size={30} color="black"  /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
            width: '100%', height: 60, backgroundColor: '#eeeeee',display:'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' 
    },
   
})
   
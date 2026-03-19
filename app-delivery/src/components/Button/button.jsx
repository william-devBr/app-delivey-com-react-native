
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { styles } from "./button.style";
import { MaterialIcons } from "@expo/vector-icons";

export default function ButtonComponent(props) {
        return (
           
            <Pressable 
              style={[styles.button, props.loading && styles.loadingButton]} 
              onPress={props.onPress}
              disabled={props.loading}
            >
                 <View style={{ width: "100%",flexDirection: "row", justifyContent: "center",alignItems: "center"}}>
                  <Text style={styles.buttonText}>
                     {props.loading ? <ActivityIndicator color="#FFF" /> : props.title}
                    </Text>
                  <Text style={{marginLeft: 10}}>{props.icon && <MaterialIcons name={props.icon} size={props.size} color="#FFF" style={styles.icon} />}</Text>
                </View>
            </Pressable>
           
        )
}
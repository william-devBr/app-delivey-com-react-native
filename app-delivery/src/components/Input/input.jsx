
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./input.style";

{/** input search tela home */}
export default function Input(props) {
    

    return(
          <>
                <Text style={styles.label}>{props.label}</Text>
                { props.error && <Text style={styles.error}>{props.error}</Text>}
                <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor ={"gray"}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.isPassword}
                onSubmitEditing={props.keyPress}
                underlineColorAndroid="transparent"
                returnKeyType={props.keyType}
                
            />
       </>
        
    )
}
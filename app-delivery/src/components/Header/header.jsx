
import { View, Text} from "react-native";
import {FONT_SIZE, COLORS} from "../../utils/constants";
import { styles } from "./header.style";

/**
 * Componente de Cabeçalho
 * @returns;
 */

export default function Header(props) {
    return(
       <View style={styles.container}>
           <Text style={{fontSize: FONT_SIZE.xlarge, marginBottom: 20}}>{props.title}</Text>
           <Text style={{color:COLORS.dark_gray}}>{props.subtitle}</Text>
       </View>
    )
}


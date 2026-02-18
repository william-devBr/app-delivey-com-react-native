
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
    onPress?: () => void;
    iconName?: string;
}

export default function IconButton({ onPress, iconName }: IconButtonProps) {
    return(
        <TouchableOpacity style={styles.background} onPress={onPress}>
            <Ionicons name={iconName} size={28}  style={styles.icons} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
     icons : {
    backgroundColor: 'transparent',padding: 8
       
    }
})
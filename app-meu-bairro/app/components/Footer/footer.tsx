import { View, Text,StyleSheet } from 'react-native';

import IconButton from '../../ui/icon-button';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Footer() {
    return(
        <View style={styles.container}>
            <IconButton iconName="home-outline"/>
             <AntDesign name="aim" size={30} color="black" />
            <IconButton iconName="notifications-outline"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
            width: '100%', height: 60, backgroundColor: '#eeeeee',display:'flex',flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', bottom: 0, position: 'fixed',
            boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
    },
   
})
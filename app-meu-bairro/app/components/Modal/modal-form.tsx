import { View, Text, Modal } from 'react-native';

export default function ModalForm({ visible, onClose }: { visible: boolean, onClose: () => void }) {
        return(
            <Modal
             animationType='slide'
             transparent={true}
             visible={visible}
             onRequestClose={onClose}
             >
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                 <View style={{ width: 300, height: 200, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Modal Form</Text>
                     <Text style={{ marginTop: 20 }}>Este é um exemplo de modal.</Text>
                     <Text style={{ marginTop: 20, color: 'purple' }} onPress={onClose}>Fechar</Text>
                 </View>
             </View>
 
            </Modal>
          )
}
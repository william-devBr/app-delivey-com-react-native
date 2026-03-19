import { View, Modal } from 'react-native';
import { styles} from './style.js'

export default function ModalComponent({ visible, onClose, children }) {
        return(
            <Modal
             animationType='slide'
             transparent={true}
             visible={visible}
             onRequestClose={onClose}
             >
                  {/** oervaly */}
                 <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                      {children}
                    </View>
                </View>
           
            </Modal>
          )
}

/***
 * 
 *  STYLE FORM COMPONENT ENDERECO
 * @readonly
 */

import { FONT_SIZE } from "@/src/utils/constants"
import { Platform } from "react-native"
export const styles ={
     form: {
    padding: 20,
  },

   locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f45d5d',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  locationText: {
    color: '#f45d5d',
    fontWeight: '500',
    marginLeft: 8,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },

  picker : {
    
    ...Platform.select({
      android: {
        color: '#333',
        height: 60,
      },
      ios: {
        // No iOS, o Picker nativo costuma ser maior, 
        // talvez você precise ajustar a altura da View pai.
      },
    }),
     borderWidth: 0,
    color: '#666',
    fontSize: FONT_SIZE.medium
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  pickerContainer: {
    
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    // O segredo para o Android não cortar o conteúdo:
    justifyContent: 'center', 
    height: 45,
    overflow: 'hidden', // Garante que o Picker respeite o border radius da View
  },

  
}
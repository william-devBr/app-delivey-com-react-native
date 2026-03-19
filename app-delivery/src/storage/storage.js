/***
 *  APP STORAGE
 * @readonly
 */
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStorage = async () => {
   
        try {
              
           const user =   await AsyncStorage.getItem('user');

          return user ? JSON.parse(user) : {};
 
        } catch (error) {
             console.log(error.messagem);
        }
}

export const setStorage = async(user) => {
      
     try {
         await AsyncStorage.setItem('user', JSON.stringify(user));
     }
     catch(err){
      console.log(err.message)
     }
}


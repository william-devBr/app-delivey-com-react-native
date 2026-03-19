/**
 * 
 *  AUTH SERVICE
 * @readonly
 */

const AuthRepository = require('../repository/auth.repository');

class AuthService {

    async login(email) {

        try {
             const result = await AuthRepository.login(email);
             return result;
        } catch (error) {
            console.log(error.message)
        }
       
    }

}

module.exports = new AuthService;
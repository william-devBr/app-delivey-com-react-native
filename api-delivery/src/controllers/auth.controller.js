/**
 * AUTENTICÃO DO USUÁRIO
 * @readonly
 */

const bcrypt = require('bcrypt');
const {createToken, validateToken } = require('../utils/jwt');
const AuthService = require('../services/auth.service');

class AuthController {

    async login(req, res) {

        const {email, password} = req.body;

        if(!email || !password) return res.status(403).json({message : 'Bad Request', ok: false})
  
        let user = await AuthService.login(email);
    
        if(!user || user.rowCount === 0) {
            return res.status(200).json({message : 'E-mail ou senha incorretos', ok: false})
        }
        user = user.rows[0];
        
        const hashCompare = await bcrypt.compare(password, user.password);
      
        if( !hashCompare ) return res.status(200).json({ok: false, message : 'E-mail ou senha incorretos'});


        const token = createToken(user.user_id);

        return res.json({ok: true, email : user.email, id_usuario: user.user_id, token})
}

    async logout(req, res) {

    }

    async verificaEmail(req, res) {

        const {email} = req.body;

        const result = await AuthService.login(email);

        if(result.rowCount > 0) {
            //return true se existir e-mail cadastrado
            return res.json({ok: true})
        }
           // return false para e-mail não encontrado  
         return res.json({ok : false});
    }
}




module.exports = new AuthController;
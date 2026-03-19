/**
 * USUÁRIO CONTROLLER
 * [METHODS] GET,PUT,DELETE,PATCH
 * @readyonly
 */
const bcrypt = require('bcrypt');
const UserService = require('../services/usuario.service');


class UserController {

     /** recupera os dados do usuárop pelo ID */
      async  findById(req, res) {
       
        
         const { id_usuario } = req.id_usuario;
         const {user, message, statusCode} = await UserService.findUserById(id_usuario)
         return res.json({user, message, statusCode});
      }

      /** cria novo usuário */
      async create(req, res) {

      

         const verifyUser = await UserService.findByEmail(req.body.email);

   
         if(verifyUser.rowCount > 0) {

            return res.json({ 
                  success: false,
                  id: null,
                  statusCode: 401,
                  message : 'Já existe uma conta com o e-mail informado'
            })
         }

        const hash = await bcrypt.hash(req.body.senha, 10);
        const newUser = {

            name : req.body.nome.trim(),
            email : req.body.email.toLowerCase().trim(),
            password : hash,
            endereco : req.body.endereco.trim(),
            numero : req.body.numero,
            complemento : req.body.complemento.trim(),
            bairro : req.body.bairro.trim(),
            cidade : req.body.cidade.trim(),
            estado : req.body.estado,
            cep : req.body.cep

         }

         const { statusCode, message } = await UserService.createUser(newUser);
          /** implementar o token */
         
         return res.json({ statusCode,message, success })

      }

      /** atualiza os dados de usuário */
      async update(req, res) {

         const id = req.id_usuario;
         let data = req.body;
        // data.updated_at = new Date();


         const result = await UserService.updateAddress(id ,data);
         res.json({result})
      }

      /**exibe favoritos do usuário */

       async listFavorites(req, res) {

          const {id_usuario} = req.id_usuario;

          const {statusCode, resultados, message} = await UserService.listFavorites(id_usuario);

          return res.status(statusCode).json({statusCode, resultados, message});
       }
}




module.exports = new UserController;
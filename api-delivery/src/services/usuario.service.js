const UserRepository = require('../repository/usuario.repository');

class UserService {


  async  createUser(user) {


    try {
         const {email} = user;
         const verifyUser = await UserRepository.findByEmail(email);

         if(verifyUser.rowCount > 0) {

          return { 
                 success: false,
                 id: null,
                statusCode: 401,
                message : 'e-mail já cadastrado'}
         }

         const result = await UserRepository.insert(user);
         
         if (result.rowCount > 0) {
            return {
                success: true,
                id: result.rows[0].user_id,
                statusCode: 201,
                message : 'usuário criado com sucesso'
            };
         }

            return {
            success: false,
            statusCode: 400,
            id: null,
            message : 'Ocorreu um erro ao gravar os dados do usuário'
        }
    } catch (error) {
          return {
            success: false,
            id : null,
            statusCode: 500,
            message : 'ocorreu um erro :' + error.message
          }
    }
  }

  async findUserById(id) {
    try {

        const result = await UserRepository.findUserById(id);

        if(result.rowCount > 0) {
            const user = {id:result.rows[0].user_id, nome:  result.rows[0].name, endereco : result.rows[0].endereco +','+ result.rows[0].numero  }
            return {user, statusCode : 200, message : ''}
        }
        
    } catch (error) {
         return {user: null, statusCode : 500, message : 'Ocorreu um erro ' + error.message}
    }
  }

  async updateUser(id, data) {
      
     
     try {
          const result = await UserRepository.updateUser(id,data);
          return {statusCode : 201, message : 'success'}
     } catch (error) {
          return {statusCode : 500, message : 'error: ' + error.message}
     }

  }

  async updateAddress(id, data) {
      
     
     try {
          const result = await UserRepository.updateAddress(id,data);
          return {statusCode : 201, message : 'success'}
     } catch (error) {
          return {statusCode : 500, message : 'error: ' + error.message}
     }

  }

  async findByEmail(email) {
       
       return await UserRepository.findByEmail(email);
  }

  async listFavorites(user_id) {

      try {

          const resultados = await UserRepository.listFavorites(user_id);
          return {statusCode : 200, resultados: resultados.rows, message : "success"}
          
      } catch (error) {
            return {statusCode : 500, resultados: [], message : "ocorreu em erro interno " + error.message}
      }
  }


}


module.exports = new UserService;
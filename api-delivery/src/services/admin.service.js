/**
 * ADMIN SERVICES
 * @readonly
 */

const AdminRepository = require('../repository/admin.repository');

class AdminService {

     async index(usuario_id) {

        try {
             const result = await AdminRepository.index(usuario_id);
             return {result: result.rows[0], statusCode: 200, message: 'sucess'}
        } catch (error) {
             return {result: [], statusCode: 500, message: error.message}
        }   

     }

     async status(params) {
        try {
             const result = await AdminRepository.status(params);
             return {status : 'ok', message : 'sucess', statusCode: 201 }
        } catch (error) {
             return {status:'error', statusCode : 500, message : error.message}
        }
     }

     async pedidos(params, limit,offset) {
          try {
               const result = await AdminRepository.pedidos(params, limit, offset);
               return {statusCode: 200, result : result.resData.rows,total: result.resTotal.rows[0].total, message : 'success'}
          } catch (error) {
               return { statusCode : 500, result : [], total: 0, message : error.message}
          }
     }
}

module.exports = new AdminService;
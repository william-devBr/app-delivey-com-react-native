/**
 * 
 *  CATEGORIA SERVICE
 * @readonly
 */

const CategoriaRepository = require('../repository/categoria.repository');

class CategoriaService {

    async create(params) {

        try {
            
            const result  = await CategoriaRepository.create(params);
            return {statusCode : 201, count : result.rowCount, message : "success"}
        } catch (error) {
             return {statusCode : 500, count : 0, message : "ocorreu um erro interno " +error.message}
        }
    }

    async findAll() {
         try{
              const result = await CategoriaRepository.findAll();
              return {statusCode : 200, message: 'success', result: result.rows}
         }catch(error) {
              return {statusCode : 500, message: error.message, result: []}
         }
    }
}


module.exports = new CategoriaService;
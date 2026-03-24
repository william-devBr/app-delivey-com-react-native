
/***
 * 
 *  PRODUTO CONTROLLER
 * @readonly
 */
const ProdutoService = require('../services/produto.service');

class ProdutoController {

        /** lista todos os produtos pelo ID do restaurante */
    async findAll(req, res) { 

         const restaurante_id = req.params.restaurante_id;

         const {statusCode, message, produtos} = await ProdutoService.findAll(restaurante_id);

         res.status(statusCode).json({statusCode, message, produtos})

    }

    /** lista os detalhes do produto pelo ID produto e restaurante */
     async findById(req, res) { }
     
      /** cria um novo produto passando o ID do restaurante e ID categoria */
     async create(req, res) { }

     /*** atualiza os dados do produto passando ID produto e ID restaurante */
     async update(req, res) { 

           const fieldsValues = req.body;
           const { id, id_restaurante } = req.params;
           const {statusCode, message} = await ProdutoService.update(fieldsValues, id, id_restaurante);

          return res.status(statusCode).json({message})
     }

     /** atualiza o status do produto tipo boolean */
     async destroy(req, res)  { }
}

module.exports = new  ProdutoController;
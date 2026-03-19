/**
 * CATEGORIA CONTROLLER
 * [METHODS] GET, POST, PUT, DELETE
 * @readonly
 */

const CategoriaService = require('../services/categoria.service');

class CategoriaController { 

     async create(req, res) {

          const categoria = {
               restaurante_id : req.params.restaurante_id,
               nome : req.body.nome
          }

          const {statusCode, count, message} = await CategoriaService.create([categoria.restaurante_id, categoria.nome]);

          return res.status(statusCode).json({statusCode, count, message})

     }

     async findAll(req ,res) {

          const {result, statusCode, message} = await CategoriaService.findAll();
          return res.status(statusCode).json({result,message});
     }
}

module.exports = new CategoriaController;
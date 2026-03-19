/**
 * ROTAS DE PRODUTO
 * @readonly
 */

const express = require('express');
const route = express.Router();
const { validateToken } = require('../utils/jwt');

const ProdutoController =  require('../controllers/produto.controller.js');
 
route.get('/:restaurante_id',validateToken, ProdutoController.findAll);
route.get('/:id',validateToken,ProdutoController.findById);
route.post('/',validateToken,ProdutoController.create);
route.put('/:id',validateToken,ProdutoController.update);
route.delete('/:id',validateToken,ProdutoController.destroy);



module.exports = route;

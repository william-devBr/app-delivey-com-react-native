/**
 * ROTAS DE PEDIDO
 * @readonly
 * 
 */

const PedidoController = require('../controllers/pedido.controller');
const express = require('express');
const route = express.Router();
const { validateToken } = require('../utils/jwt');



route.get('/',validateToken,PedidoController.findAll);
route.get('/:id_pedido',validateToken,PedidoController.findById);


/**POST, PUT, DELETE */
route.post('/', validateToken, PedidoController.createOrder)

module.exports = route;
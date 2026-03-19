/**
 * ROTAS DE CATEGORIA
 * @readonly
 */

const express = require('express');
const route = express.Router();
const { validateToken } = require('../utils/jwt');

const CategoriaController = require('../controllers/categoria.controller.js');
 
 route.get('/',validateToken, CategoriaController.findAll);
// route.get('/:id',validateToken, findById);

/** POST, PUT, DELETE */
route.post('/:restaurante_id',validateToken,  CategoriaController.create);
// route.put('/:id',validateToken, update);
// route.delete('/:id',validateToken, destroy);



module.exports = route;

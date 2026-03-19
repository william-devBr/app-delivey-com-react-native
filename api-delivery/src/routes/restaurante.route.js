/**
 * ROTAS DO RESTAURANTE
 * @readonly
 */

const express = require('express');
const route = express.Router();
const { validateToken } = require('../utils/jwt');

const RestauranteController = require('../controllers/restaurante.controller.js');

//GET
route.get('/busca',validateToken, RestauranteController.findSearch) // resultado da busca
route.get('/:restaurante_id',validateToken, RestauranteController.findById); // tela do restaurante
route.get('/',validateToken, RestauranteController.findAll); // tela inicial
//PUT, POST, DELETE
route.post('/',validateToken, RestauranteController.create );
route.post('/:id_restaurante/favoritar',validateToken,  RestauranteController.addFavorite);
route.delete('/:id_restaurante/favoritar', validateToken,RestauranteController.removeFavorite);
route.put('/:id',validateToken, RestauranteController.update);

module.exports = route;

/**
 * ROTAS DO USUÁRIO
 * @readonly
 */


const express = require('express');
const route = express.Router();
const { validateToken } = require('../utils/jwt');

const UserController = require('../controllers/usuario.controller.js');

//GET
route.get('/', validateToken, UserController.findById);
route.get('/favoritos', validateToken, UserController.listFavorites);

//POST, PUT
route.post('/signup',  UserController.create);
route.put('/', validateToken, UserController.update)
//route.patch('/:id',validateToken,  UserController.update);



module.exports = route;

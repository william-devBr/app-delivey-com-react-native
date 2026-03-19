/**
 * ROTAS DE AUTENTICAÇÃO DO USUÁRIO
 * @readonly
 */

const express = require('express');
const route = express.Router();
const AuthController = require('../controllers/auth.controller.js');


route.post('/login', AuthController.login );
route.post('/verification', AuthController.verificaEmail)
route.post('/logout', AuthController.logout);

module.exports = route;

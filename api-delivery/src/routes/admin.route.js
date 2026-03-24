const route = require('express').Router();
const AdminController = require('../controllers/admin.controller');
const {validateToken} = require('../utils/jwt');



route.get('/', validateToken, AdminController.index);
route.get('/:id_restaurante/pedidos', validateToken, AdminController.pedidos);

route.patch('/status', validateToken, AdminController.status);


module.exports = route;
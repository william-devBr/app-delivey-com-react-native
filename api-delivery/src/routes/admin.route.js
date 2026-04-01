const route = require('express').Router();
const AdminController = require('../controllers/admin.controller');
const {validateToken} = require('../utils/jwt');
const multer = require('../utils/multer.js');




route.get('/', validateToken, AdminController.index);
route.get('/:id_restaurante/produtos', validateToken, AdminController.produtos)
route.get('/produtos/:id_restaurante/produto',validateToken, AdminController.busca);
route.get('/:id_restaurante/pedidos', validateToken, AdminController.pedidos);
route.get('/:id_restaurante/categorias', validateToken, AdminController.categorias)
/**PUT, POSTS, PATCH, DELETE */
route.put('/horario_funcionamento', validateToken, AdminController.horarioFuncionamento)
route.put('/status', validateToken, AdminController.status);
route.put('/:id_restaurante/categorias', validateToken, AdminController.updateCategoria);
route.put('/:id_restaurante/produto', validateToken, AdminController.updateProduto);
route.put('/:id_restaurante/produto/status', validateToken, AdminController.statusProduto);

route.post('/categorias', validateToken, AdminController.addCategoria);
route.post('/produto', validateToken, multer.single('imgurl'), AdminController.addProduto)

route.delete('/:id_restaurante/categorias/:id_categoria', validateToken, AdminController.deleteCategoria)


module.exports = route
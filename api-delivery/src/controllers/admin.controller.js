/**
 * ADMIN CNTROLLER
 * @readonly
 */

const AdminService = require('../services/admin.service');

class AdminController {

    async index(req, res) {

         const {id_usuario} = req.id_usuario;

         const {statusCode, message, result} = await AdminService.index(id_usuario);

         return res.status(statusCode).json({message, result});
    }

    async status(req, res) {

        const  {status, restaurant_id }  = req.body;

        console.log(status, restaurant_id)
       
        const {statusCode, message} = await AdminService.status({status, restaurant_id});
        return res.status(statusCode).json({status, message});
    }

    async pedidos(req, res) {

        const params = req.params;
       
        const paginaAtual  = parseInt(req.query.page) || 1;
        const limit = 10; 
        const offset = (paginaAtual - 1) * limit;

             
        const {statusCode, result, message, total} = await AdminService.pedidos(params, limit, offset);
        const paginas = Math.ceil(total / limit)
        return res.status(statusCode).json({result, message, paginas});
    }
}

module.exports = new AdminController;
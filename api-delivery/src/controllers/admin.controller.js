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
        const limit = 10; //limite de pedidos por página
        const offset = (paginaAtual - 1) * limit;

             
        const {statusCode, result, message, total} = await AdminService.pedidos(params, limit, offset);
        const paginas = Math.ceil(total / limit)
        return res.status(statusCode).json({result, message, paginas});
    }

    async produtos(req, res) {


        const limit = 10; //limite de produtos por pagina
        const paginaAtual = parseInt(req.query.page ) ||  1;
        const offset = (paginaAtual - 1) * limit;

        const restaurante_id = req.params.id_restaurante;


        const {statusCode, message, result, total} = await AdminService.produtos(restaurante_id, limit, offset);

        const paginas = Math.ceil(total / limit);

        return res.status(statusCode).json({message, result, paginas});

    }

    async busca(req,res) {
           
         const {q} = req.query;
         const busca = q.toLowerCase();
         const {id_restaurante} = req.params;

         const {statusCode, message, result} = await AdminService.busca(busca, id_restaurante);
         return res.status(statusCode).json({result, message});
    }
}

module.exports = new AdminController;
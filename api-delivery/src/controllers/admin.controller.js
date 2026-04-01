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

    async addProduto(req, res) {
      
          const {body, file} = req;
          if(file) {
             body.imgurl = `/uploads/${file.filename}`;
          }
          
          const { statusCode, message, result } = await AdminService.addProduto(body);

          return res.status(statusCode).json({message, img: body?.imgurl, result})
    }

    async updateProduto(req, res) {

         const produto = {
           
            categoria_id : req.body.categoria_id,
            name : req.body.name,
            description : req.body.description,
            imgurl : req.body.imgurl,
            price : parseFloat(req.body.price),
            active : req.body.active
         }

         const {restaurante_id, produto_id} = req.body;

         const {message,statusCode} = await AdminService.updateProduto(produto, produto_id, restaurante_id)
         return res.status(statusCode).json({message});
    }

    async busca(req,res) {
           
         const {q} = req.query;
         const busca = q.toLowerCase();
         const {id_restaurante} = req.params;

         const {statusCode, message, result} = await AdminService.busca(busca, id_restaurante);
         return res.status(statusCode).json({result, message});
    }

    async addCategoria(req,res) {

        const{name, id_restaurante} = req.body;

        const {result, message, statusCode} = await AdminService.addCategoria(name, id_restaurante);
        console.log(result)
        return res.status(statusCode).json({result, message});
    }

    async categorias(req, res) {

        const {id_restaurante} = req.params;

        const {statusCode, message, result} = await AdminService.categorias(parseInt(id_restaurante));
        return res.status(statusCode).json({result, message})
    }

    async updateCategoria(req, res) {

        const {id_restaurante} = req.params;
        const {id, name} = req.body

        const {statusCode, message} = await AdminService.updateCategoria(id_restaurante, id, name);
        return res.status(statusCode).json({message});
    }

    async deleteCategoria(req, res) {

        const {id_restaurante, id_categoria} = req.params;

        const {message, statusCode} = await AdminService.deleteCategoria(id_restaurante, id_categoria);
        return res.status(statusCode).json({message});
    }

    async horarioFuncionamento(req, res) {

        const {horario_funcionamento, restaurante_id} = req.body

         const {message, statusCode} = await AdminService.horarioFuncionamento(horario_funcionamento, restaurante_id);

        return res.status(statusCode).json({message, statusCode})
    }

    async statusProduto(req, res) {

        const {id_restaurante} = req.params;
        const {id, active} = req.body;

        const {message, statusCode} = await AdminService.statusProduto(id_restaurante, id, active);
        return res.status(statusCode).json({message, statusCode});
    }
}

module.exports = new AdminController;
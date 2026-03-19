/***
 * 
 *  CONTROLLER DE PEDIDOS
 * @readonly
 */

const PedidoService = require('../services/pedido.service');

class PedidoController {
       /** lista todos os pedidos do usuario */
       async findAll(req, res) {

          const { id_usuario } = req.id_usuario; 

          const {pedidos, message, statusCode } = await PedidoService.findAll(id_usuario);

          res.status(statusCode).json({pedidos, message, statusCode})
             
       }

        /** detalhes do pedido passando id pedido */
       async findById(req, res) {

            const { id_usuario } = req.id_usuario; 

            const order =  {
               id_pedido : req.params.id_pedido,
               id_usuario
            }

            const {itens, message, statusCode } = await PedidoService.findById(order);

            return  res.status(statusCode).json({itens, message, statusCode})

       }

       /** cria um novo pedido  */
       async createOrder(req, res) {

            const { order } = req.body;
            
            const numeroPedido = order.cart.length + order.id_usuario + order.restaurante_id + new Date().getTime().toString().slice(7,13);
         
          const taxaEntrega = parseFloat(order.taxaEntrega) || 0;
           let subTotalPedido = 0;
            order.cart.map(pedido => {
                   subTotalPedido += pedido.product.valorItem * pedido.product.quantidade;
             });
            let totalPedido = parseFloat(taxaEntrega) + subTotalPedido;
          

           
           const {statusCode, message} = await PedidoService.createOrder(order, numeroPedido, subTotalPedido, totalPedido, taxaEntrega);

           return res.status(201).json({statusCode, message});
       }
}

module.exports = new PedidoController;
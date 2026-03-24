/***
 * 
 *  CONTROLLER DE PEDIDOS
 * @readonly
 */

const {getIO} =require('../config/socket/socket');

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
          

          const {statusCode, message, pedido_id} = await PedidoService.createOrder(order, numeroPedido, subTotalPedido, totalPedido, taxaEntrega);

          if(pedido_id) {

               const { result } = await PedidoService.dataOrder({id_pedido: pedido_id, id_usuario : order.id_usuario})
               const io = getIO();
               io.to(`restaurante_${order.restaurante_id}`).emit('novo_pedido', result)
        }

           return res.status(201).json({statusCode, message});
       }

       async updateStatus(req, res) {

             const { payload } = req.body;

             const {statusCode, message } = await PedidoService.updateStatus(payload);

             return res.status(statusCode).json({message});
       }
}

module.exports = new PedidoController;
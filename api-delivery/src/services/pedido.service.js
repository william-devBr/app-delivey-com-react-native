/**
 *  PEDIDO SERVICE
 * 
 * @readonly
 */

const PedidoRepository = require('../repository/pedido.repository');

class PedidoService {

       /** lista todos os pedidos do usuario */
       async findAll(idUser) {
            try {

                const pedidos = await PedidoRepository.findAll(idUser);
                return {statusCode : 200, pedidos : pedidos.rows, message :'success'}
                
            } catch (error) {
                return {statusCode : 500, pedidos : [], message :error.message}
            }
       }

        /** detalhes do pedido passando id pedido */
       async findById(order) {
         
          try {

                const itens = await PedidoRepository.findById(order);
                return {statusCode : 200, itens : itens.rows[0], message :'success'}
                
            } catch (error) {
                console.log(error)
                return {statusCode : 500, itens : [], message: 'Ocorreu um erro interno, ' + error.message}
            }
       }

       /** cria um novo pedido  */
       async createOrder(order, numeroPedido, subTotalPedido, totalPedido,taxaEntrega) {

         const novoPedido = {
             itens : order.cart,
             id_usuario : order.id_usuario,
             id_restaurante :  order.restaurante_id,
             numero_pedido : numeroPedido,
             valor_pedido : totalPedido,
             status_pedido : 0,
             taxaEntrega
         }

        try {
             const pedido_id = await PedidoRepository.createOrder(novoPedido)
             return {statusCode : 201, message: 'success'}

        } catch (error) {
            return {statusCode : 500, message: error.message}
        }

       }
    
}

module.exports = new PedidoService;
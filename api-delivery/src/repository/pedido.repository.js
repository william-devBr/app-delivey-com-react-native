
/**
 *  PEDIDO REPOSITORY
 * 
 * @readonly
 */

const db = require('../database/db');

class PedidoRepository {
       /** lista todos os pedidos do usuario */
       async findAll(idUser) {
 
            const sql = `SELECT p.*, r.nome,r.icone,
                          COALESCE(SUM(i.quantidade), 0) AS total_itens
                          FROM pedido p
                          LEFT JOIN restaurante r ON(r.restaurante_id = p.id_restaurante)
                          LEFT JOIN itens i ON (i.id_pedido = p.id)
                          WHERE p.id_usuario = $1
                          GROUP BY p.id, r.restaurante_id
                          
                     `
           return await db.query(sql,[idUser]);
       }

        /** detalhes do pedido passando id pedido */
       async findById(order) {

             const {id_pedido, id_usuario} = order;

              const sql = `
                          SELECT p.id AS pedido_id,p.created_at,p.numero_pedido,p.vl_taxa_entrega,
                           JSON_AGG(
                               JSON_BUILD_OBJECT(
                                    'id_produto ', pr.produto_id,
                                     'nome', pr.name,
                                      'img', pr.imgurl,
                                     'quantidade',i.quantidade,
                                     'total_item', i.sub_total,
                                     'obs', i.observacao
                               )
                           ) AS itens
                          FROM pedido p
                          JOIN itens i ON p.id = i.id_pedido
                          JOIN produto pr ON i.id_produto = pr.produto_id
                          WHERE p.id = $1 AND p.id_usuario = $2
                          GROUP BY p.id
                     `;
                     
           const detalhesPedido = await db.query(sql,[id_pedido, id_usuario]);
           return detalhesPedido;

       }

       /** cria um novo pedido  */
       async createOrder(order) {

             const sql = `INSERT INTO pedido (id_usuario, id_restaurante,numero_pedido, valor_pedido, status_pedido,vl_taxa_entrega)
                          VALUES($1,$2,$3,$4,$5,$6) RETURNING id
             `;
            
             const response = await db.query(sql,[order.id_usuario, order.id_restaurante,order.numero_pedido, order.valor_pedido, order.status_pedido, order.taxaEntrega]);
             const idPedido = response.rows[0].id;
            
             const values = [];
          
             const placeholders = order.itens.map((item, index)=> {
                  const i = index * 4;
                  values.push(idPedido, item.product.produto_id, item.product.quantidade, item.product.totalItem, item.product.obs);
                  return `($${i + 1},$${i + 2}, $${i + 3}, $${i + 4},$${i + 5})`;
             })

             let insertItens = `INSERT INTO itens (id_pedido, id_produto, quantidade, sub_total, observacao)
                                VALUES ${placeholders.join(',')}`;
                                
             return await db.query(insertItens, values);
       
     }
}

module.exports = new PedidoRepository;
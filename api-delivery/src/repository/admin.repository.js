const db = require('../database/db');

/**
 * ADMIN REPOSITORY SERVINDO DADOS DO PAINEL DO RESTAURANTE
 * @readonly;
 */

class AdminRepository {

     async index(usuario_id) {
         
          const sql = `SELECT * FROM restaurante WHERE proprietario = $1`;
          return await db.query(sql,[usuario_id])
     }
     /** define o status para aberto ou fechado */
     async status(params) {

          const {restaurant_id, status} = params;

          const sql = `UPDATE restaurante SET aberto = $1 WHERE restaurante_id = $2`;

          return await db.query(sql,[status, restaurant_id])
     }

     /** lista os pedidos pelo id do restaurante */
     async pedidos(params, limit, offset) {

           const { id_restaurante } = params
         
           const sql = `SELECT p.*, u.name,
                         JSON_AGG(
                          JSON_BUILD_OBJECT(
                           'rua', e.endereco,
                           'numero', e.numero,
                           'complemento', e.complemento,
                           'bairro', e.bairro
                           ) 
                         ) AS endereco
                         FROM pedido p
                        LEFT JOIN usuario u ON(p.id_usuario = u.user_id)
                        LEFT JOIN endereco e ON(u.user_id = e.usuario_id)
                        WHERE p.id_restaurante = $1
                        GROUP BY p.id,u.name ORDER BY p.id DESC
                        LIMIT $2 OFFSET $3
                        `;

           const totalRegistros = `SELECT COUNT(*) as total FROM pedido WHERE id_restaurante = $1`;

           const [resData, resTotal] = await Promise.all([
                 db.query(sql,[id_restaurante, limit, offset]),
                 db.query(totalRegistros, [id_restaurante])
           ])

          return {resData, resTotal};

     }

     /** lista os produtos */
     async produtos(id_restaurante, limit, offset) {

          const sql = `SELECT * FROM produto WHERE restaurante_id = $1 LIMIT $2 OFFSET $3`;

          const totalProdutos = `SELECT COUNT(*) as total FROM produto WHERE restaurante_id = $1`;

          const [resData, resTotal] = await Promise.all([
                    db.query(sql,[id_restaurante, limit, offset]),
                    db.query(totalProdutos,[id_restaurante])
          ])
          return {resData, resTotal}
     }

     /** busca de produtos pelo nome */  
     async busca(busca, id_restaurante) {

          const sql = `SELECT * FROM produto WHERE LOWER(name) LIKE $1 AND restaurante_id = $2`;

          return await db.query(sql,[`%${busca}%`, id_restaurante]);
     }

}

module.exports = new AdminRepository;
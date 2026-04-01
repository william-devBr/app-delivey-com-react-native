const db = require('../database/db');

/**
 * ADMIN REPOSITORY SERVINDO DADOS DO PAINEL DO RESTAURANTE
 * @readonly;
 */

class AdminRepository {

     async index(usuario_id) {
         
          const sql = `SELECT r.*,
                   JSON_AGG(
                       JSON_BUILD_OBJECT(
                         'dia_semana', f.dia_semana,
                         'abertura', f.horario_abertura,
                         'fechamento', f.horario_fechamento,
                         'fechado', f.fechado
                       )
                   ) AS horario_funcionamento
          FROM restaurante r
          LEFT JOIN horario_funcionamento f ON(r.restaurante_id = f.restaurante_id)
          WHERE r.proprietario = $1
          GROUP BY r.restaurante_id`;
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

          const sql = `SELECT p.*, COALESCE(c.nome, 'Sem categoria') AS categoria_nome
                       FROM produto p
                       LEFT JOIN categoria c ON c.categoria_id = p.categoria_id
                       WHERE p.restaurante_id = $1
                       ORDER BY p.name ASC
                       LIMIT $2 OFFSET $3`;

          const totalProdutos = `SELECT COUNT(*) as total FROM produto WHERE restaurante_id = $1`;

          const [resData, resTotal] = await Promise.all([
                    db.query(sql,[id_restaurante, limit, offset]),
                    db.query(totalProdutos,[id_restaurante])
          ])
          return {resData, resTotal}
     }

     async updateProduto(produto, produto_id, restaurante_id) {

           const keys = Object.keys(produto).map((key, index) => {
               return `${key}=$${index + 1}`
           });

           const values = Object.values(produto);

           let sql = `UPDATE produto SET ${keys.join(',')}`;
           sql += ` WHERE produto_id = $${keys.length + 1} AND restaurante_id = $${keys.length + 2}`;

           return await db.query(sql,[...values, produto_id, restaurante_id]);

     }
     /** busca de produtos pelo nome */  
     async busca(busca, id_restaurante) {

          const sql = `SELECT * FROM produto WHERE LOWER(name) LIKE $1 AND restaurante_id = $2`;

          return await db.query(sql,[`%${busca}%`, id_restaurante]);
     }

     async addCategoria(name, id_restaurante) {

          const sql = `INSERT INTO categoria (nome, restaurante_id) VALUES($1,$2) RETURNING categoria_id`;

          const insertedID = await db.query(sql,[name, id_restaurante]);

          return insertedID.rows[0];
     }
     /**categorias cadastradas do restaurante */
     async categorias(id_restaurante) {

          const sql =`SELECT DISTINCT(nome),categoria_id FROM categoria WHERE restaurante_id = $1`;
          return await db.query(sql, [id_restaurante])
     }

     async updateCategoria(id_restaurante, id, name) {

          const sql = `UPDATE categoria SET nome = $1 WHERE categoria_id = $2 AND restaurante_id = $3`;

          return await db.query(sql,[name, id, id_restaurante]);
     }
     async deleteCategoria(id_restaurante, id_categoria) {

          const sql = `DELETE FROM categoria WHERE categoria_id = $1 AND restaurante_id = $2`;
          return await db.query(sql,[id_categoria, id_restaurante]);
     }

     async horarioFuncionamento(horario, restaurante_id) {

        try{
            await db.query('BEGIN');

          for(let h of horario) {
 
          let query = `INSERT INTO horario_funcionamento(restaurante_id, dia_semana, horario_abertura, horario_fechamento, fechado)
                        VALUES($1,$2,$3,$4,$5)
                        ON CONFLICT (restaurante_id, dia_semana)
                        DO UPDATE SET
                         horario_abertura = EXCLUDED.horario_abertura,
                         horario_fechamento = EXCLUDED.horario_fechamento,
                         fechado = EXCLUDED.fechado
          `;

          const values = [restaurante_id, h.dia_semana,h.abertura, h.fechamento,h.fechado]

          await db.query(query, values);

          }
        await db.query('COMMIT');
        return true;

        }catch(error) {
          await db.query('ROLLBACK');
          return error;
        }
     }

     async statusProduto(restaurante_id, produto_id, status) {

          const sql = `UPDATE produto SET active = $1 WHERE produto_id = $2 AND restaurante_id = $3`;

          return await db.query(sql,[status,produto_id, restaurante_id]);
     }

     async addProduto(produto) {

          const {restaurante_id,name, description, price,categoria_id, imgurl, active} = produto

          const sql = `INSERT INTO produto (restaurante_id, categoria_id,name, description,imgurl, price,active)
                       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING produto_id
          `;

          return await db.query(sql,[restaurante_id, categoria_id, name, description, imgurl, price, active]);
     }

}

module.exports = new AdminRepository;
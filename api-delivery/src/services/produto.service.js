
/***
 * 
 *  PRODUTO SERVICE
 * @readonly
 */
const ProdutoRepository = require('../repository/produto.repository');

class ProdutoService {

        /** lista todos os produtos pelo ID do restaurante */
    async findAll(restaurante_id) { 

        try {
            const produtos = await ProdutoRepository.findAll(restaurante_id);
            return {statusCode : 200, produtos : produtos.rows, message : 'success'}
            
        } catch (error) {
            return {statusCode : 500, produtos : [], message : 'Ocorreu um erro interno ' + error.message}
        }
    }

    /** lista os detalhes do produto pelo ID produto e restaurante */
     async findById(produto_id, restaurante_id) { }
     
      /** cria um novo produto passando o ID do restaurante e ID categoria */
     async create(restaurante_id, categorua_id,  produto) { }

     /*** atualiza os dados do produto passando ID produto e ID restaurante */
     async update(idProduto, restaurante_id,  detalhes) { }

    /** atualiza o status do produto tipo boolean */
     async destroy(produto_id, status)  { }
}

module.exports = new  ProdutoService;
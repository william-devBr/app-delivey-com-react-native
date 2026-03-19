/**
 * RESTAURANTE CONTROLLER
 * [METHODS] GET,PUT,DELETE,PATCH
 * @readyonly
 */

const RestauranteService = require('../services/restaurante.service')

class RestauranteController {

     async findAll(req,res) {
          /**
           * 
           * página inicial
           * 
           */
         const { id_usuario}  = req.id_usuario; // vindo do jwt se o usuário tiver logado

          const {statusCode, restaurantes, message} = await RestauranteService.findAll(id_usuario);
         res.status(statusCode).json({statusCode, restaurantes, message})

     }
 
    
    async findById(req,res) {
       /**
        * página do restaurante
        * 
        */

            const restaurante = {
               id_usuario : req.id_usuario.id_usuario,
               id_restaurante : req.params.restaurante_id
            }

            const {statusCode, message, itens} = await RestauranteService.findById(restaurante)
            res.status(statusCode).json({statusCode, message, itens})
     }
   /** busca pelo nome */
    async findSearch(req, res) {

        /** tela de busca feita pelo usuário */

           const search = {
              id_usuario : req.id_usuario.id_usuario,
              busca : req.query.q,
              id_categoria : req.query.id_categoria
           }
           
           const {statusCode, resultado, message } = await RestauranteService.findSearch(search);

           res.status(statusCode).json({resultado, statusCode, message});
      }

   /** ação de favoritar restaurante */
    async addFavorite(req, res) {

         const favorite = {
            id_usuario : req.id_usuario.id_usuario,
            id_restaurante : req.params.id_restaurante
         }

         const {statusCode, result, message} = await RestauranteService.addFavorite(favorite);
         return res.status(statusCode).json({statusCode, result, message});
    }

    /** ação de remover restaurante dos favoritos */
    async removeFavorite(req, res) {

        const favorite = {
           id_usuario : req.id_usuario.id_usuario,
           id_restaurante : req.params.id_restaurante
        }

        const {statusCode, result, message} = await RestauranteService.removeFavorite(favorite);

        return res.status(statusCode).json({statusCode, result, message});
    }

    /*** cria um novo restaurante com proprietario */
    async create(req,res) { }

    /*** atualiza os dados do restaurante pelo ID */
    async update(req,res) { }

    /** inativa o restaurante passando a ID */
    async destroy(req,res) { }

}

module.exports = new RestauranteController;
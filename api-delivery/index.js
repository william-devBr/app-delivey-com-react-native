const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const UserRoute = require('./src/routes/usuarios.route');
const RestauranteRoute = require('./src/routes/restaurante.route');
const AuthRoute =  require('./src/routes/auth.route');
const CategoriaRoute =  require('./src/routes/categoria.route');
const PedidoRoute = require('./src/routes/pedido.route');
const ProdutosRoute = require('./src/routes/produto.route');


app.use(express.json());
app.use(cors());
// app.use(express.static(__dirname));

// app.get('/simulador', (req, res)=> {
//     res.sendFile(path.join(__dirname, 'simulador.html'))
// })

app.use('/auth', AuthRoute);

/** rotas protegidas */
app.use('/usuarios', UserRoute);
app.use('/restaurante',  RestauranteRoute);
app.use('/categoria', CategoriaRoute);
app.use('/pedidos', PedidoRoute)
app.use('/produtos', ProdutosRoute)
 

app.listen(3001,(err)=> {
    if (err) {
        return console.log(err);
    }
    console.log('server is running')
})
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const http = require('http');

const {init} = require('./src/config/socket/socket.js');

const server = http.createServer(app);

const UserRoute = require('./src/routes/usuarios.route');
const RestauranteRoute = require('./src/routes/restaurante.route');
const AuthRoute =  require('./src/routes/auth.route');
const CategoriaRoute =  require('./src/routes/categoria.route');
const PedidoRoute = require('./src/routes/pedido.route');
const ProdutosRoute = require('./src/routes/produto.route');
const AdminRoute = require('./src/routes/admin.route');


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', AuthRoute);
/** rotas protegidas */
app.use('/usuarios', UserRoute);
app.use('/restaurante',  RestauranteRoute);
app.use('/categoria', CategoriaRoute);
app.use('/pedidos', PedidoRoute)
app.use('/produtos', ProdutosRoute)
 app.use('/admin', AdminRoute);

 /**web socket de pedidos */
init(server);

server.listen(3001,(err)=> {
    if (err) {
        return console.log(err);
    }
    console.log('server is running')
})
/**
 *  CRIA E VALIDA TOKEN DE USUÁRIO
 * 
 * @readonly
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretToken = process.env.APP_SECRET_TOKEN ; // palavra chave para validar e criar o token

function createToken(id_usuario) {

    const token = jwt.sign({id_usuario}, secretToken, {
        algorithm : "HS256",
         expiresIn : 999999
    });

    return token
}

function validateToken(req, res, next) {

     const auth = req.headers.authorization;

     if(!auth) return res.status(401).json({error : "Not Authorization"})

     const [bearer, token] = auth.split(' ');

     jwt.verify(token, secretToken, (err, decode)=> {

            if(err) return res.status(401).json({error : "Token is not validate"});

            req.id_usuario = decode;

            next();
     })
}


module.exports = {createToken, validateToken}

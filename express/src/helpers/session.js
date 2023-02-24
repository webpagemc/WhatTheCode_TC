const {verifyToken} = require("../utils/jsonwebtoken")

const DOMINIO = process.env.DOMINIO

const bloggerAuth = async(req,res,next)=>{

    try {

    const storageToken = await req.headers.authorization
    if (!storageToken){res.redirect(DOMINIO)};

    const token = storageToken.split(" ").pop();

    const dataToken = await verifyToken(token);
    console.log(dataToken);

    if(!dataToken.usuario){res.send("Error de Autenticacion")};

    next();
        
    } catch (e) {
        res.send(console.log(req.headers.authorization))
    }
}

const AdminAuth = async(req,res,next)=>{

    try {

    const storageToken = await req.headers.authorization
    if (!storageToken){res.redirect(DOMINIO)};

    const token = storageToken.split(" ").pop();

    const dataToken = await verifyToken(token);
    console.log(dataToken);

    if(!dataToken.usuario){res.send("Error de Autenticacion")};
    if(!dataToken.role === "admin"){

        res.send("Lo sentimos no tienes autorizacion")

    }else{ next() }

    } catch (e) {
        res.send(console.log(req.headers.authorization))
    }
}

module.exports = {bloggerAuth,AdminAuth};
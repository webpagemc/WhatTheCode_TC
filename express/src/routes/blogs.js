const express = require("express");
const router = express.Router();
const {verifyToken} = require("../utils/jsonwebtoken");
const {blogModel} = require("../models/blog");
const {usuarioModel} = require("../models/usuario");

router.get("/", async(req,res)=>{

    const data = await blogModel.find().lean()
    res.send(data)

})

router.post("/",async(req,res)=>{

    const body = req.body

    const storageToken =  req.headers.authorization
    if(!storageToken){res.send("No hay ninguna sesion iniciada")}

    const token = storageToken.split(" ").pop();
    const dataToken = await verifyToken(token);
    
    const autor = dataToken.usuario

    const usuario = await usuarioModel.findOne({usuario:autor})
    const blog = await blogModel.create({...body,autor:autor})

    usuario.blogs.push(
        {
            id:blog._id,
            blog:blog.titulo,
            publicacion:new Date().toLocaleString()
        }
    )

    await usuarioModel.findOneAndUpdate({usuario:autor},usuario)

    res.send(`El usuario ${autor} creó un nuevo blog`);

})

router.delete("/:autor/:id",async(req,res)=>{

    const idBlog = req.params.id
    const autor = req.params.autor
    
    const blog = await blogModel.deleteOne({_id:idBlog});
    const usuario = await usuarioModel.findOne({usuario:autor});

    if(!usuario || !blog){res.send("Algo salio mal")}

    const blogsDelUsuario = usuario.blogs.filter(blog => blog.id.toString() !== idBlog.toString());

    usuario.blogs = blogsDelUsuario;

    await usuarioModel.findOneAndUpdate({usuario:autor},usuario);

    res.send("Se elimino un blog")

})

module.exports = router
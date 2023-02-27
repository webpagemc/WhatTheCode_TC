const {blogModel} = require("../models/blog");
const {usuarioModel} = require("../models/usuario");
const {verifyToken} = require("../utils/jsonwebtoken");

const getBlogs = async(req,res)=>{

    blogModel.find({},(err,blogs)=>{

        usuarioModel.populate(blogs,{path:"autor"},(err,data)=>{
            
            res.send(data)

        })

    })
    

}

const createBlog = async(req,res)=>{

    const body = await req.body

    const storageToken = await req.headers.authorization
    if(!storageToken){res.send("No hay ninguna sesion iniciada")}

    const token = storageToken.split(" ").pop();
    const dataToken = await verifyToken(token);
    
    const autor = dataToken._id

    const usuario = await usuarioModel.findOne({_id:autor})
    const blog = await blogModel.create({...body,autor:autor})

    usuario.blogs.push({ id:blog._id })

    await usuarioModel.findOneAndUpdate({_id:autor},usuario)

    res.send(`El usuario ${autor} creó un nuevo blog`);

}

const deleteBlog = async(req,res)=>{

    const idBlog = req.params.id
    const autor = req.params.autor
    
    const blog = await blogModel.deleteOne({_id:idBlog});
    const usuario = await usuarioModel.findOne({usuario:autor});

    if(!usuario || !blog){res.send("Algo salio mal")}

    const blogsDelUsuario = usuario.blogs.filter(blog => blog.id.toString() !== idBlog.toString());

    usuario.blogs = blogsDelUsuario;

    await usuarioModel.findOneAndUpdate({usuario:autor},usuario);

    res.send("Se elimino un blog")

}

module.exports = {getBlogs,createBlog,deleteBlog};
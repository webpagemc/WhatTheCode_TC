const {encrypt,compare} = require("../utils/hashPassword");
const {tokenSign} = require("../utils/jsonwebtoken");
const {usuarioModel} = require("../models/usuario");
const {departamentoModel} = require("../models/departamento");

const getUsuarios = async(req,res)=>{

    try {
        
        const data = await usuarioModel.find().lean();
        res.send(data);

    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

const createUsuario = async(req,res)=>{

    try {

        const body = await req.body;
        const departamento = await body.departamento;

        const departamentoSelected = await departamentoModel.findOne({nombre:departamento})
        if(!departamentoSelected){ res.send("El departamento seleccionado no existe") }

        if(departamento === "administracion"){ body.role = "admin" };
        body.contraseña = await encrypt(body.contraseña);

        const userRegistered = await usuarioModel.findOne({usuario:body.usuario})
        if(userRegistered){ res.send("El usuario ya existe") }
        else{

        const newUser = await usuarioModel.create(body);

        departamentoSelected.usuarios.push({id:newUser._id})

        await departamentoModel.findOneAndUpdate({nombre:departamento},departamentoSelected)

        res.send( {message:"Un nuevo usuario se creo correctamente",user:newUser} )

        }
        
        
    } catch (err) { console.log("Sucedio un error durante la peticion",err) }

}

const deleteUsuario = async(req,res)=>{

    try {

        const id = req.params.id
        
        const userDeleted = await usuarioModel.deleteOne({_id:id});
        const departamento = await departamentoModel.findOne({nombre:userDeleted.departamento});

        const newDepartamento = departamento.usuarios.filter(dpto => dpto.usuario.toString() === userDeleted.usuario.toString());

        departamento.usuarios = newDepartamento

        await departamentoModel.findOneAndUpdate({nombre:userDeleted.departamento},departamento)

        res.send(`El usuario ${id} fue eliminado`);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

//auth

const loginUsuario = async(req,res)=>{

    const {usuario,contraseña} = req.body;

    console.log(usuario)

    const userRegistered = await usuarioModel.findOne({usuario:usuario})

    if(!userRegistered){res.json("tokenFalse")}
    
    else{

        const hashPassword = userRegistered.contraseña
        const checkPass = await compare(contraseña,hashPassword)

        if(!checkPass){res.json("tokenFalse")}
        else{
            const jwt = await tokenSign(userRegistered)
            res.json(jwt);
        }     

    }

}

module.exports = {getUsuarios,createUsuario,deleteUsuario,loginUsuario}
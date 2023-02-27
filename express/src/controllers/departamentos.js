const {departamentoModel} = require("../models/departamento");
const { usuarioModel } = require("../models/usuario");

const getDepartamentos = async(req,res)=>{

    try {
        
        const data = await departamentoModel.find().lean();
        res.send(data);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

const getOneDepartamento = async(req,res)=>{

    try {

        const id = req.params.id
        const data = await departamentoModel.findOne({_id:id})
        res.send(data);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

const createDepartamento = async(req,res)=>{

    try {

        const body = req.body;

        const Exist = await departamentoModel.findOne({nombre:body.nombre})

        if(Exist){ res.send("Este departamento ya fue creado") }
        else{

        const data = await departamentoModel.create(body);
        res.send( {message:"Un nuevo dpto. se creo correctamente",dpto:data} )
            
        }
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

const deleteDepartamento = async(req,res)=>{

    try {

        const id = req.params.id

        const data = await departamentoModel.deleteOne({_id:id});
        await usuarioModel.deleteMany({departamento:id});

        res.send(`El dpto. ${id} fue eliminado, junto con todos sus usuarios`);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

}

module.exports = {getDepartamentos,getOneDepartamento,createDepartamento,deleteDepartamento}
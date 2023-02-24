const express = require("express");
const router = express.Router();
const {departamentoModel} = require("../models/departamento");

router.get("/",async(req,res)=>{

    try {
        
        const data = await departamentoModel.find().lean();
        res.send(data);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

})

router.get("/:id",async(req,res)=>{

    try {

        const id = req.params.id
        const data = await departamentoModel.findOne({_id:id})
        res.send(data);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

})

router.post("/",async(req,res)=>{

    try {

        const body = req.body;

        const Exist = await departamentoModel.findOne({nombre:body.nombre})

        if(Exist){ res.send("Este departamento ya fue creado, por favor usa otro nombre") }
        else{

        const data = await departamentoModel.create(body);
        res.send( {message:"Un nuevo dpto. se creo correctamente",dpto:data} )
            
        }
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

})

router.delete("/:id",async(req,res)=>{

    try {

        const id = req.params.id
        
        const data = await departamentoModel.deleteOne({_id:id});
        res.send(`El dpto. ${id} fue eliminado`);
        
    } catch (err) { throw new Error("Sucedio un error durante la peticion",err) }

})

//Agregar un nuevo blog



module.exports = router
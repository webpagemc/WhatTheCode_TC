const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    
    {
        usuario:{type:String},
        contraseña:{type:String},
        role:{type:String, default:"blogger" /* blogger or admin*/ },
        departamento:{ type:mongoose.Schema.Types.ObjectId, ref:"departamento"},
        blogs:{ type: [{ id:{type:mongoose.Schema.Types.ObjectId, ref:"blogs"}, _id:false }] , default:[] }
    },
    {
        timestamps:false, 
        versionKey:false
    }
);

const usuarioModel = mongoose.model("usuario",usuarioSchema);

module.exports = {usuarioModel}
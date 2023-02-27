const mongoose = require("mongoose");

const departamentoSchema = new mongoose.Schema(

    {
        nombre:{type:String},
        usuarios:{
            type:[
                {
                    id:{type:mongoose.Schema.Types.ObjectId, ref:"usuarios"},
                    _id:false
                },
            ],
            default:[]
        }
    },
    {
        versionKey:false,
        timestamps:false
    }
)

const departamentoModel = mongoose.model("departamentos",departamentoSchema);

module.exports = {departamentoModel}
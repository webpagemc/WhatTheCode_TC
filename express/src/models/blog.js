const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(

    {
        titulo:{type:String},
        contenido:{type:String},
        autor:{type:mongoose.Schema.Types.ObjectId, ref:"usuario"}
    },
    {
        versionKey:false,
        timestamps:false
    }
)

const blogModel = mongoose.model("blogs",blogSchema);

module.exports = {blogModel}
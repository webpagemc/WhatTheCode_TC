const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(

    {
        titulo:{type:String},
        contenido:{type:String},
        autor:{type:String, ref:"usuario"}
    },
    {
        versionKey:false,
        timestamps:false
    }
)

const blogModel = mongoose.model("blogs",blogSchema);

module.exports = {blogModel}
//dependencies
const cors = require("cors");
const express = require("express");

//express
const app = express();

//enviroment
require("dotenv").config();
const PORT = process.env.PORT

//middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

//routes
app.use("/api",require("./routes/index"));

app.delete("/borrar",async(req,res)=>{

    const {blogModel} = require("./models/blog")
    const {usuarioModel} = require("./models/usuario")
    const {departamentoModel} = require("./models/departamento")

    await blogModel.deleteMany({})
    await usuarioModel.deleteMany({})
    await departamentoModel.deleteMany({})

    res.send("Se elimino todo");

})

app.listen(PORT,()=>{ console.log(`App running in port ${PORT}`) });

//database's connection
require("../mongo/connection");



/*HACER CAMBIOS DEL ID 

CONST USERID = USER.FINDONE(ID).USER 
CONST BLOGDEUSUARIO = BLOGS.FINDONE(USERID)


*/





const mongoose = require("mongoose")

const dbConnection = ()=>{

    const URL_DATABASE = process.env.URL_DATABASE;
    mongoose.set('strictQuery', true)
    
    mongoose.connect(
        URL_DATABASE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err)=>{
            if (!err){
                console.log("CONEXION EXITOSA")
            }else{
                console.log("CONEXION FALLIDA",err)
            }
        }
    )
}

module.exports = dbConnection();
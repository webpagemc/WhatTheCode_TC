const express = require("express");
const fs = require("fs");
const router = express.Router();

const allRoutes = fs.readdirSync(__dirname);

const removeExtension = (fileName) =>{
    return fileName.split(".").shift()
}

allRoutes.filter((file)=>{
    const name = removeExtension(file)

    if(name !== "index"){ router.use(`/${name}`,require(`./${file}`)) }
})

module.exports = router;




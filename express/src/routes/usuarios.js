const express = require("express");
const router = express.Router();
const {bloggerAuth,AdminAuth} = require("../helpers/session");
const {getUsuarios,createUsuario,deleteUsuario,loginUsuario} = require("../controllers/usuarios")

router.get("/",AdminAuth,getUsuarios)

router.post("/",AdminAuth,createUsuario)

router.delete("/:id",AdminAuth,deleteUsuario)

//authentication

router.post("/login",loginUsuario)

module.exports = router
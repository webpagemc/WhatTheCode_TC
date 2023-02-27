const express = require("express");
const router = express.Router();
const {bloggerAuth,AdminAuth} = require("../helpers/session");
const {getDepartamentos,getOneDepartamento,createDepartamento,deleteDepartamento} = require("../controllers/departamentos")

router.get("/",AdminAuth,getDepartamentos)

router.get("/:id",AdminAuth,getOneDepartamento)

router.post("/",AdminAuth,createDepartamento)

router.delete("/:id",AdminAuth,deleteDepartamento)



module.exports = router
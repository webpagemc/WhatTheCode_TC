const express = require("express");
const router = express.Router();
const {bloggerAuth,AdminAuth} = require("../helpers/session");
const {getBlogs,createBlog,deleteBlog} = require("../controllers/blogs")

router.get("/",bloggerAuth, getBlogs)

router.post("/",bloggerAuth,createBlog)

router.delete("/:autor/:id",deleteBlog)

module.exports = router
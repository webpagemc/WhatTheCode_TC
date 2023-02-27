"use client"
import "../../styles/home.scss"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home(){
/* eslint-disable */

    const APIDOMAIN = "http://localhost:8080"
    const LOCALDOMAIN = "http://localhost:3000"

    const addBlog = async(e) =>{

        e.preventDefault();
        const Token = window.sessionStorage.getItem("Token");

        if(!Token || Token.toString() === "tokenFalse".toString()){ window.location.href = LOCALDOMAIN };

        const titulo = e.target.form["titulo"].value
        const contenido = e.target.form["contenido"].value

        const url = `${APIDOMAIN}/api/blogs`
        const data = {titulo,contenido}
        const headers = {
            headers:{
              "Authorization":"Bearer "+ Token,
              "Content-Type": "application/json", 
            }
          };

        await axios.post(url,data,headers);

        location.reload()
    }

    const [stateblogs,setStateBlogs] = useState([]);

    useEffect(()=>{

        const Token = window.sessionStorage.getItem("Token");
    
        if(!Token || Token.toString() === "tokenFalse".toString() || Token === undefined){ window.location.href = LOCALDOMAIN };

        const url = `${APIDOMAIN}/api/blogs`
        const headers = {
            headers:{
              "Authorization":"Bearer "+ Token,
              "Content-Type": "application/json",
            }
          };

          axios.get(url,headers)
          .then((blogs)=>{setStateBlogs(blogs.data)})

    },[])


return( 

<div className="main">

    <div className="home_container">

        <span>Blogs</span>

        <div className="form_container">

        <details>
        <summary>Crear un Nuevo Blog</summary>
        <form id="createBlog">

            <input type="text" name="titulo" placeholder="Titulo del Blog" className="input" id="inputTitle" />
            <textarea type="text" name="contenido" placeholder="Contenido de tu blog" className="input" id="inputContent" />

            <button type="submit" onClick={addBlog}> Crear Blog </button>
        </form>
        </details>

        </div>

        <span>Todos los Blogs</span>

         <div className="blogs_container">

            {
                stateblogs.map(

                    (blog)=>{
                        return(
                            
                            <div className="blog">

                            <div className="blog_title"> {blog.titulo} </div>
                            <div className="blog_autor_dpto">{blog.autor.usuario} - {blog.autor.departamento} </div>
                            <div className="blog_content"> {blog.contenido} </div>

                            </div>
                        )
                    }
                    
                )
            }

         </div>

    </div>

</div>

)

}
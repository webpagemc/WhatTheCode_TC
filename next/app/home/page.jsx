"use client"
import "../../styles/home.scss"
import axios from "axios"

export default function Home(){
/* eslint-disable */

    const APIDOMAIN = "http://localhost:8080"

    const addBlog = async(e) =>{

        e.preventDefault();
        const Token = window.localStorage.getItem("Token");

        const createBlog = document.getElementById("createBlog");

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

        await axios.post(url,data,headers).then((r) => console.log(r))

    }

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

            <div className="blog">

                <div className="blog_title">Di Stefano es Español</div>
                <div className="blog_autor_dpto">ElGallego2010 - Deportes </div>
                <div className="blog_content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iste odio iure architecto ut ullam soluta minus assumenda, molestiae neque minima 
                voluptates harum voluptate eveniet, explicabo itaque, deserunt quam quaerat veniam?
                </div>
                
            </div>

         </div>

    </div>

</div>

)

}
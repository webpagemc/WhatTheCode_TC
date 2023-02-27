"use client"
import "../../styles/home.scss"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home(){
/* eslint-disable */

    const APIDOMAIN = "http://localhost:8080"
    const LOCALDOMAIN = "http://localhost:3000"

    const addUser= async(e) =>{

        e.preventDefault();
        const Token = window.sessionStorage.getItem("Token");

        if(!Token || Token.toString() === "tokenFalse".toString()){ window.location.href = LOCALDOMAIN };

        const usuario = e.target.form["usuario"].value
        const contraseña = e.target.form["contraseña"].value
        const departamento = e.target.form["departamento"].value

        const url = `${APIDOMAIN}/api/usuarios`
        const data = {usuario,contraseña,departamento}
        const headers = {
            headers:{
              "Authorization":"Bearer "+ Token,
              "Content-Type": "application/json", 
            }
          };

        await axios.post(url,data,headers);
        location.reload()
    }

    const addDpt = async(e)=>{

        e.preventDefault();
        const Token = window.sessionStorage.getItem("Token");

        if(!Token || Token.toString() === "tokenFalse".toString()){ window.location.href = LOCALDOMAIN };

        const nombre = e.target.form["nombre"].value

        const url = `${APIDOMAIN}/api/departamentos`
        const data = {nombre}
        const headers = {
            headers:{
              "Authorization":"Bearer "+ Token,
              "Content-Type": "application/json", 
            }
          };

        await axios.post(url,data,headers);
        location.reload()

    }

    

    const [stateUsuarios,setStateUsuarios] = useState([]);

    useEffect(()=>{

        const Token = window.sessionStorage.getItem("Token");
    
        if(!Token || Token.toString() === "tokenFalse".toString() || Token === undefined){ window.location.href = LOCALDOMAIN };

        const url = `${APIDOMAIN}/api/usuarios`
        const headers = {
            headers:{
              "Authorization":"Bearer "+ Token,
              "Content-Type": "application/json",
            }
          };

          axios.get(url,headers)
          .then((blogs)=>{setStateUsuarios(blogs.data)})

    },[])


return( 

<div className="main">

    <div className="home_container">

        <span>Usuarios</span>

        <div className="form_container">

        <details>
        <summary>Registrar Nuevo Usuario</summary>
        <form>

            <input type="text" name="usuario" placeholder="Nombre de usuario" className="input"  />
            <input type="text" name="contraseña" placeholder="Contraseña" className="input" />
            <input type="text" name="departamento" placeholder="Departamento" className="input" />

            <button type="submit" onClick={addUser}> Registrar</button>
        </form>
        </details>

        <details>
        <summary>Crear Nuevo Departamento</summary>
        <form>

            <input type="text" name="nombre" placeholder="Departamento" className="input"  />

            <button type="submit" onClick={addDpt}> Registrar</button>
        </form>
        </details>

        </div>

        <span>Todos los usuarios</span>

         <div className="blogs_container">

            {
                stateUsuarios.map(

                    (usuario)=>{
                        return(
                            
                            <div className="blog">

                            <div className="blog_title"> {usuario.usuario} </div>
                            <div className="blog_autor_dpto">{usuario.departamento} </div>

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
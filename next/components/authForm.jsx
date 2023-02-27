"use client";
import { useEffect, useState } from "react";
import axios from "axios"; 
import jwt from "jsonwebtoken";

export default function AuthForm(){
    
    const APIDOMAIN = "http://localhost:8080"
    const LOCALDOMAIN = "http://localhost:3000"

    useEffect(()=>{

        const Token = window.sessionStorage.getItem("Token");

        if(Token){

            const role = jwt.decode(Token).role
        
            if(Token.toString() === "tokenFalse".toString() ){ null }
            else{ 

                if(role === "admin"){window.location.href = `${LOCALDOMAIN}/admin`} else { window.location.href = `${LOCALDOMAIN}/home`}

            }
        }

            
        },[])

    const [usuarioState,setUsuarioState] = useState("");
    const [contraseñaState,setContraseñaState] = useState("");

    const changeUser = (e)=>{setUsuarioState(e.target.value)};
    const changePass = (e)=>{setContraseñaState(e.target.value)};

const login = async(event)=>{

        event.preventDefault();
        const response = await axios.post(`${APIDOMAIN}/api/usuarios/login`,{
 
            usuario:usuarioState,
            contraseña:contraseñaState

        })

        window.sessionStorage.setItem("Token",response.data)

        const Token = window.sessionStorage.getItem("Token");
        const role = jwt.decode(Token).role
          
        if(!Token || Token.toString() === "tokenFalse".toString()){ 
            
        window.location.href = LOCALDOMAIN
        
        }else{ if(role === "admin"){window.location.href = `${LOCALDOMAIN}/admin`} else { window.location.href = `${LOCALDOMAIN}/home` }}

}

    return(

    <div className="form_container">

    <h2>Bienvenid@!</h2>

    <details>
    <summary> Login </summary>

        <form action={`${APIDOMAIN}/api/usuarios/login`} method="post" encType='multipart/form-data'>

        <input type="text" name="usuario" placeholder="nombre de usuario" id="usuario" onChange={changeUser} value={usuarioState} />
        <input type="password" name="contraseña" placeholder="contraseña" id="contraseña" onChange={changePass} value={contraseñaState} />

        <button type="submit" onClick={login}>Ingresar</button>
        </form>

    </details>

    </div>
    )

}
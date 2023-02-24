"use client";
import { useEffect, useState } from "react";
import axios from "../node_modules/axios"; 

export default function AuthForm(){

    const DOMINIO = "http://localhost:8080"

    const [usuarioState,setUsuarioState] = useState("");
    const [contraseñaState,setContraseñaState] = useState("");

    const changeUser = (e)=>{setUsuarioState(e.target.value)};
    const changePass = (e)=>{setContraseñaState(e.target.value)};

const login = ()=>{

        event.preventDefault();
        axios.post(`${DOMINIO}/api/usuarios/login`,{

            usuario:usuarioState,
            contraseña:contraseñaState

        }).then((token)=>{ window.localStorage.setItem("Token",token.data) })

        const Token = window.localStorage.getItem("Token");
          
        if(Token === "tokenFalse"){ 
            
        window.location.href = "http://localhost:3000" 
        
        }else{ window.location.href = "http://localhost:3000/admin" }

}



    return(

    <div className="form_container">

    <h2>Bienvenid@!</h2>

    <details>

    <summary> Login </summary>

        <form action="http://localhost:8080/api/usuarios/login" method="post" encType='multipart/form-data'>

        <input type="text" name="usuario" placeholder="nombre de usuario" id="usuario" onChange={changeUser} value={usuarioState}  />
        <input type="password" name="contraseña" placeholder="contraseña" id="contraseña" onChange={changePass} value={contraseñaState}   />

        <button type="submit" onClick={login}>Ingresar</button>
        </form>

    </details>

    </div>
    )

}
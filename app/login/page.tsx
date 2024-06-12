"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogin from "../../public/imagenes/imgLogin.svg";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";
import "./page.scss"

function Login() {

  localStorage.clear();

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4500/api/Web/clientes/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: correo, contrasenia: contrasenia }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('rolID', userData.p_rol);
        localStorage.setItem('restauranteID', userData.r_id);
        localStorage.setItem('restauranteNOMBRE', userData.r_nombre);
        localStorage.setItem('persona', userData.p_id);
        localStorage.setItem('restauranteImagen', userData.r_imagen_base64);
        localStorage.setItem('personaNombre',userData.nombreP + " " + userData.apellidoP)
        if (userData.rol_id == 1){
            localStorage.setItem('plan', userData.plan);
        }
        window.location.href = "/dashboard";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de red:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="contenedorPrincipal">
      <ResponsivoNav />
      <div className="contenedorLoguin">
        <div className="portadasLoguin">
          <div className="porta">
          </div>
        </div>
        <div className="contenedorFormularioLoguin">
          <div className="encabezadoLoguin">
            <img src="/imagenes/logoBlanco.svg" alt="" />
              <h1 className="">
                Bienvenido a GourmetGo
              </h1>
          </div>
          <div className="formularioLoguin">
            <form className="" onSubmit={handleSubmit}>
              <div className="contenedorIngreso">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="ingreso"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  maxLength={50}
                  minLength={4}
                />
                <svg className="iconoIngreso" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM20 6.885l-7.552 4.944q-.106.055-.214.093q-.109.037-.234.037t-.234-.037t-.214-.093L4 6.884v10.5q0 .27.173.443t.443.173h14.769q.269 0 .442-.173t.173-.443zM12 11l7.692-5H4.308zM4 6.885v.211v-.811v.034V6v.32v-.052v.828zV18z"/></svg>
              </div>
              <div className="contenedorIngreso">
                <input
                  type={showPassword ? "text" : "password"}
                  id="contrasenia"
                  name="contrasenia"
                  className="ingreso"
                  placeholder="Contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  maxLength={25}
                  minLength={4}
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" onClick={togglePasswordVisibility} width="1em" height="1em" viewBox={showPassword ? "0 0 24 24":"0 0 256 256"}>
                  <path fill="currentColor" d={showPassword ? "M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" : "M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36" } />
                </svg>
              </div>
              <p className="">
                <Link href="/restablecerClave">
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
              <button
                type="submit"
                className="botonVerde"
              >
                Iniciar sesión
              </button>
            </form>
            <div className="registrate">
              <p>No tienes cuenta?{" "}</p>
              <p className="palabra">
                <Link href="/registro" className="">
                  Regístrate!!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

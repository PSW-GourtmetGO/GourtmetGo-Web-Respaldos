import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/imagenes/logo2.svg";
import "./nav.scss"

interface Propiedades {
  abrirNav: () => void;
}
const Nav = ({}: Propiedades) => {
  return (
    <div className="contenedorNav">
      <div className="menuOpciones">
        <div className="contenedorLogo">
        <Image className="logo" src={Logo} alt="" />
        </div>
        <div className="opciones">
        <ul>
          <li>
            <Link href="/#inicio">Inicio</Link>
          </li>
          <li>
            <Link href="/#planes">Planes</Link>
          </li>
          <li>
            <Link href="/#clientes">Clientes</Link>
          </li>
          <li>
            <Link href="/#contactanos">Contactanos</Link>
          </li>
        </ul>
        </div>
      </div>
      <div className="botones">
        <ul>
          <li className="ingresar">
            <Link href="/login">Iniciar Sesión</Link>
          </li>
          <li className="registro">
            <Link href="/registro">Registrarse</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;

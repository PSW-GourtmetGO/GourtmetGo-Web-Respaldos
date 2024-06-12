"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/imagenes/LogoSideBarSF.svg";
import { IconType } from 'react-icons';
import "./layout.scss";
import { Tooltip } from "@nextui-org/tooltip";

import {
  RiClipboardLine,
  RiHome3Line,
  RiLogoutBoxRLine,
  RiShoppingCartLine,
  RiUserLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import Link from "next/link";

interface Rutas {
  name: string;
  link: string;
  icono: IconType;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [moduloSeleccionado, setmoduloSeleccionado] = useState(() => {
    const moduloAlmacenado = localStorage.getItem("moduloSeleccionado");
    return moduloAlmacenado || "/dashboard";
  });

  const seleccionarModulo = (name: string) => {
    setmoduloSeleccionado(name);
    localStorage.setItem("moduloSeleccionado", name);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("moduloSeleccionado");
  };

  const [enlaces, setEnlaces] = useState<Rutas[]>([]);

  useEffect(() => {
    if (localStorage.getItem("rolID") === "1") {
      setEnlaces([
        {
          name: "dashboard",
          link: "/dashboard",
          icono: RiHome3Line,
        },
        {
          name: "menu",
          link: "/dashboard/menu",
          icono: RiClipboardLine,
        },
        {
          name: "pagos",
          link: "/dashboard/pagos",
          icono: RiShoppingCartLine,
        },
        {
          name: "administrador",
          link: "/dashboard/administrador",
          icono: RiUserSettingsLine,
        },
        {
          name: "perfil",
          link: "/dashboard/perfil",
          icono: RiUserLine,
        },
      ]);
    } else if (localStorage.getItem("rolID") === "2") {
      setEnlaces([
        {
          name: "dashboard",
          link: "/dashboard",
          icono: RiHome3Line,
        },
      ]);
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="contenedorDashboard">
      <div className="sidebar">
          <div className="logoSidebar">
            <img src="/imagenes/LodoSidebar.svg" alt="" />
          </div>
        <ul>
          {enlaces.map((linkItem, index) => (
              <Link href={linkItem.link} key={index} passHref>
                <Tooltip content={<div className='tooltip tooltipSidebar'>
                        {linkItem.name}
                      </div>}>
                <li
                  className={`botonesSidebar hover:bg-[#F9F8F8] text-white group transition-colors ${
                    moduloSeleccionado === linkItem.link ? "bg-[#F9F8F8]" : ""
                  }`}
                  onClick={() => seleccionarModulo(linkItem.link)}
                >
                  <div
                    className={`iconosSidebar group-hover:text-[#5cb] transition-colors ${
                      moduloSeleccionado === linkItem.link
                        ? "text-[#5cb793]"
                        : ""
                    }`}
                  >
                    {linkItem.icono({ className: "text-xl" })}
                  </div>
                </li>
                </Tooltip>
              </Link>
            ))}
        </ul>
        <div className="salir">
        <Tooltip content={<div className='tooltip tooltipSidebar'>
                        Salir
                      </div>}>
          <a className=" "
                href="/"
                onClick={cerrarSesion}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z"/></svg>
          </a>
          </Tooltip>
        </div>
      </div>
      <div className="paginas">
        {children}
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { ImCross } from "react-icons/im";
interface Propiedades {
  mostrarNav: boolean;
  cerrarNav: () => void;
}
const MovilNav = ({ mostrarNav, cerrarNav }: Propiedades) => {
  const navEstado = mostrarNav ? "translate-x-0" : "translate-x-full";
  return (
    <div
      className={`fixed ${navEstado} right-0 transition-all duration-500 left-0 top-0 bottom-0 h-[100vh] bg-[#000000e0] z-[1002]`}
    >
      <ImCross
        onClick={cerrarNav}
        className="absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white"
      />
      {/* Nav DIV */}
      <div
        className={`bg-emerald-700 ${navEstado} transition-all duration-500 delay-200 flex flex-col items-center justify-center w-[70%] h-[100%]`}
      >
        {/*Nav Links  */}
        <ul className="space-y-10">
          <li className="text-[35px] font-medium hover:text-[#DEE5E1]">
            <Link href="/">Inicio</Link>
          </li>
          <li className="text-[35px] font-medium hover:text-[#DEE5E1]">
            <Link href="/">Planes</Link>
          </li>
          <li className="text-[35px] font-medium hover:text-[#DEE5E1]">
            <Link href="/">Clientes</Link>
          </li>
          <li className="text-[35px] font-medium hover:text-[#DEE5E1]">
            <Link href="/">Nosotros</Link>
          </li>
          <li className="text-[35px] text-[#7EB693] font-medium hover:text-[#679377]">
            <Link href="/">Iniciar Sesión</Link>
          </li>
          <li className="text-[35px] font-medium">
            <Link href="/">
              <div className=" px-6 py-2 bg-[#7EB693] rounded-md transition-all duration-300 hover:bg-[#96BCA5] sm:px-8 sm:py-3">
                Registrarse
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovilNav;

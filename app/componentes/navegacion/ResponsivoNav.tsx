"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import MovilNav from "./MovilNav";

const ResponsivoNav = () => {
  const [mostrarNav, setMostrarNav] = useState(false);

  const abrirNavActivador = () => setMostrarNav(true);
  const cerrarNavActivador = () => setMostrarNav(false);
  return (
    <div>
      <Nav abrirNav={abrirNavActivador} />
      <MovilNav mostrarNav={mostrarNav} cerrarNav={cerrarNavActivador} />
    </div>
  );
};

export default ResponsivoNav;

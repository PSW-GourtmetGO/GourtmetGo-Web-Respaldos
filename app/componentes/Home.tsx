"use client";
import React, { useEffect } from "react";
import Noticias from "./noticias/Noticias";
import Planes from "./planes/Planes";
import Clientes from "./clientes/Clientes";
import Contactanos from "./contactanos/Contactanos";
import Footer from "./footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import ResponsivoNav from "./navegacion/ResponsivoNav";
import RegisterPage from "../registro/page";
const Home = () => {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 500,
        easing: "ease",
        once: false,
        mirror: true,
        anchorPlacement: "top-center",
      });
    };
    initAOS();
  }, []);
  return (
    <div>
      <ResponsivoNav />
      <Noticias />
      <Planes />
      <Clientes />
      <Contactanos />
      <Footer />
    </div>
  );
};

export default Home;

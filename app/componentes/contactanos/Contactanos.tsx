"use client";
import React from "react";
import Image from "next/image";
import Restaurante from "@/public/imagenes/Restaurante.svg";
const Contactanos = () => {
  return (
    <div
      id="contactanos"
      className="w-full h-[80vh] flex items-center justify-center flex-col md:clip_path bg-white"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="400"
        className="w-[80%] grid grid-cols-5 grid-rows-2"
      >
        {/* Contenido */}
        <div className="col-start-1 col-span-5 row-span-1 flex flex-col ml-20 row-start-3">
          <Image src={Restaurante} alt="restaurante"></Image>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;

"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Promocion from "@/public/imagenes/Promocion.svg";
import Facebook from "@/public/imagenes/logoFb.svg";
import Instagram from "@/public/imagenes/logoIs.svg";
import X from "@/public/imagenes/logoX.svg";
import Image from "next/image";
import Link from "next/link";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Noticias = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay={true}
      autoPlaySpeed={3000}
      centerMode={false}
      infinite
      responsive={responsive}
      itemClass="item"
      showDots={true}
    >
      {/*  Primer slider*/}
      <div
        id="inicio"
        className="w-[100%] h-[88vh] flex items-center justify-center flex-col  md:clip_path"
      >
        <div className="w-[95%] grid grid-cols-5 grid-rows-auto">
          <div className="ml-20 mt-20 col-start-1 col-span-2 row-start-2">
            <h1
              className="text-[60px] leading-[72px] max-w-md text-center font-bold"
              style={{ fontFamily: "David Libre" }}
            >
              Proporcionamos la mejor comida para ti
            </h1>
            <div className="mt-3 ml-20 w-[300px] text-justify">
              <span>
                Bienvenidos a GourmetGo, tu solución integral para la gestión de
                restaurantes. Nuestra plataforma está diseñada para simplificar
                y optimizar cada aspecto de tu negocio, permitiéndote enfocarte
                en lo que realmente importa: ofrecer la mejor comida a tus
                clientes.
              </span>
            </div>
            <div className="flex mt-4 ml-20 gap-4 ">
              {/* Botones */}
              <Link href="/registro">
                <div className="px-6 py-2 bg-[#274C5B] text-white rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm">
                  <h3 style={{ fontFamily: "David Libre" }}>Menu</h3>
                </div>
              </Link>
              <Link href="/registro">
                <div className="px-6 py-2 bg-[#7EB693] text-white rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm">
                  <h3 style={{ fontFamily: "David Libre" }}>Haga su pedido</h3>
                </div>
              </Link>
            </div>
            {/* Redes Sociales */}
            <div className="flex gap-4 mt-8 ml-[80px]">
              <Link href="/">
                <Image src={Facebook} alt="facebook"></Image>
              </Link>
              <Link href="/">
                <Image src={Instagram} alt="instagram"></Image>
              </Link>
              <Link href="/">
                <Image src={X} alt="x"></Image>
              </Link>
            </div>
          </div>
          <div className="col-start-4 row-start-2 col-span-2">
            <Image src={Promocion} alt="promocion"></Image>
          </div>
        </div>
      </div>

      {/* Second slider */}
      <div className="w-[100%] h-[90vh] flex items-center justify-center flex-col  md:clip_path">
        <div className="w-[95%] grid grid-cols-5 grid-rows-auto">
          <div className="ml-20 mt-20 col-start-1 col-span-2 row-start-2">
            <h1
              className="text-[60px] leading-[72px] max-w-md text-center font-bold"
              style={{ fontFamily: "David Libre" }}
            >
              Llevamos tu restaurante al siguiente nivel
            </h1>
            <div className="mt-3 ml-[30px] w-[400px] text-justify">
              <span>
                Descubre como nuestro sistema puede ayudarte a llevar tu
                restaurante al siguiente nivel. Innovamos para que tú puedas
                enfocarte en lo que mejor haces: proporcionar una experiencia
                culinaria excepcional. Únete a la comunidad de restauranteros
                que ya están transformando sus negocios con GourmetGo.
              </span>
            </div>
            <div className="flex mt-4 ml-[16%]  ">
              {/* Botones */}
              <Link href="/registro">
                <div className="px-[100px] py-2 bg-[#274C5B] text-white rounded-br-xl rounded-tl-xl rounded-tr-sm rounded-bl-sm">
                  <h3 style={{ fontFamily: "David Libre" }}>Iniciar ahora</h3>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-start-4 row-start-2 col-span-2">
            <Image src={Promocion} alt="promocion"></Image>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Noticias;

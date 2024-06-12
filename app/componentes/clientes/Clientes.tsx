"use client";
import Image from "next/image";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Cliente from "@/public/imagenes/clientes.svg";
import Mujer from "@/public/imagenes/mujer2.svg";
import { FaStar } from "react-icons/fa6";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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
const Clientes = () => {
  return (
    <>
      {/* Primer slider*/}
      <div
        id="clientes"
        className="w-full h-[125vh] flex items-center justify-center flex-col md:clip_path bg-[#F3F4F4]"
      >
        <div className="w-[100%] grid grid-cols-5 grid-rows-2">
          {/* Contenido */}
          <div className="col-start-1 col-span-2 row-span-2 flex flex-col ml-20 ">
            <h1
              className="text-5xl font-bold mb-6"
              style={{ fontFamily: "David Libre" }}
            >
              Nuestros Clientes
            </h1>
            <div
              data-aos="fade-right"
              data-aos-anchor-placement="top-center"
              data-aos-mirror="true"
              className="relative right-[20%] top-[5%]"
            >
              <Image src={Cliente} alt="cliente" />
            </div>
          </div>
          {/* Carrusel */}
          <div className="col-start-3 row-span-2  col-span-3 flex items-center">
            <div className="flex flex-col w-full">
              <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlay={true}
                autoPlaySpeed={3500}
                centerMode={false}
                infinite
                responsive={responsive}
                itemClass="item"
                showDots={true}
              >
                {/* Tarjeta de comentario 1 */}
                <div className=" md:w-[455px] lg:h-[300px] bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-white rounded-tl-[70px] rounded-br-[70px] rounded-tr-[30px] rounded-bl-[40px]">
                  <div className="flex flex-col items-center pb-10">
                    <Image
                      src={Mujer}
                      alt="mujer"
                      className="w-24 h-24 mb-2 rounded-full shadow-lg"
                    ></Image>
                    <div className="flex mb-3">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                    </div>
                    <div className="w-[250px]">
                      <span className="text-sm text-[#5C6574]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error dolorem fugit pariatur ullam quidem obcaecati
                        corporis soluta neque, blanditiis totam similique sequi
                        reiciendis quis fuga commodi tenetur at? Vel, a!
                      </span>
                    </div>

                    <div className="flex mt-4 md:mt-6">
                      <span className="font-bold ">Ama Ampomah</span>
                    </div>
                  </div>
                </div>
                {/* Tarjeta de comentario 2 */}
                <div className="lg:w-[455px] lg:h-[300px] bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-white rounded-tl-[70px] rounded-br-[70px] rounded-tr-[30px] rounded-bl-[40px]">
                  <div className="flex flex-col items-center pb-10">
                    <Image
                      src={Mujer}
                      alt="mujer"
                      className="w-24 h-24 mb-2 rounded-full shadow-lg"
                    ></Image>
                    <div className="flex mb-3">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                    </div>
                    <div className="w-[250px]">
                      <span className="text-sm text-[#5C6574]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error dolorem fugit pariatur ullam quidem obcaecati
                        corporis soluta neque, blanditiis totam similique sequi
                        reiciendis quis fuga commodi tenetur at? Vel, a!
                      </span>
                    </div>

                    <div className="flex mt-4 md:mt-6">
                      <span className="font-bold ">Ama Ampomah</span>
                    </div>
                  </div>
                </div>
                {/* Tarjeta de comentario 3 */}
                <div className="lg:w-[455px] lg:h-[300px] bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-white rounded-tl-[70px] rounded-br-[70px] rounded-tr-[30px] rounded-bl-[40px]">
                  <div className="flex flex-col items-center pb-10">
                    <Image
                      src={Mujer}
                      alt="mujer"
                      className="w-24 h-24 mb-2 rounded-full shadow-lg"
                    ></Image>
                    <div className="flex mb-3">
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                      <FaStar className="text-yellow-400" />
                    </div>
                    <div className="w-[250px]">
                      <span className="text-sm text-[#5C6574]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error dolorem fugit pariatur ullam quidem obcaecati
                        corporis soluta neque, blanditiis totam similique sequi
                        reiciendis quis fuga commodi tenetur at? Vel, a!
                      </span>
                    </div>

                    <div className="flex mt-4 md:mt-6">
                      <span className="font-bold ">Ama Ampomah</span>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientes;

import Link from "next/link";
import React from "react";

const Planes = () => {
  return (
    <div
      className="w-full grid grid-cols-5 grid-rows-auto pb-[100px]"
      id="planes"
    >
      <div className="ml-[100px] mt-16 col-start-1 col-span-2 row-start-2">
        <h1
          className="text-[60px] leading-[72px] max-w-md  "
          style={{ fontFamily: "David Libre" }}
        >
          Planes
        </h1>
      </div>
      <div className="ml-[100px] mt-8 col-start-1 col-span-6 row-start-3">
        {/* Detalle de planes */}
        <div>
          <section>
            <div className="w-[95%]">
              <div className="space-y-8 lg:grid lg:grid-cols-3  sm:gap-6 xl:gap-10 lg:space-y-0 ">
                {/* <!-- Plan 1 --> */}
                <div
                  data-aos="fade-left"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#ff4e9d]">
                        BASICO
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Inicio
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Best option for personal use & for your next project.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $19
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black  transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Team size:{" "}
                            <span className="font-semibold">1 developer</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Premium support:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Free updates:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                      </ul>
                      <Link
                        href="#"
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Plan 2 --> */}
                <div
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#ff7a29] ">
                        POPULAR
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Profesional
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Best option for personal use & for your next project.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $54
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black  transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Team size:{" "}
                            <span className="font-semibold">1 developer</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Premium support:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Free updates:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                      </ul>
                      <Link
                        href="#"
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Plan 3 --> */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-anchor-placement="top-center"
                >
                  <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:text-white hover:bg-[#274c5b] hover:text-white transition-all duration-300">
                    <div className="group">
                      <h4 className="text-right text-sm font-bold text-black transition-all duration-300 group-hover:text-[#b7ffcf]">
                        MAS POPULAR
                      </h4>
                      <h3 className="mb-4 text-2xl font-semibold text-black transition-all duration-300 group-hover:text-white">
                        Empresa
                      </h3>
                      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        Best option for personal use & for your next project.
                      </p>
                      <div className="flex justify-center items-baseline my-8 text-black">
                        <span className="mr-2 text-5xl font-extrabold text-black transition-all duration-300 group-hover:text-white">
                          $89
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                      {/* <!-- List --> */}
                      <ul
                        role="list"
                        className="mb-8 space-y-4 text-left text-black  transition-all duration-300 group-hover:text-white"
                      >
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Team size:{" "}
                            <span className="font-semibold">1 developer</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Premium support:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                        <li className="flex items-center space-x-3">
                          {/* <!-- Icon --> */}
                          <svg
                            className="flex-shrink-0 w-7 h-7 text-white dark:text-white p-1 bg-[#3c5e6b] rounded-full shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>
                            Free updates:{" "}
                            <span className="font-semibold">6 months</span>
                          </span>
                        </li>
                      </ul>
                      <Link
                        href="#"
                        className="py-2 px-5 bg-[#7EB693] rounded-lg"
                      >
                        Escoger plan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Planes;

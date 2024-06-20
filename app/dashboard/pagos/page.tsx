"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import pagosImagen from "../../../public/imagenes/PagosImagen.svg";
import paypal from "../../../public/imagenes/paypal.svg";
import "./page.scss";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PagosPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  
  const onSubmit: SubmitHandler<any> = (data) => {
    axios.put(`http://localhost:4500/api/Web/propietario/paypal/${localStorage.getItem('restauranteID')}`, data)
      .then(response => {
        toast.success("Información almacenada", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch(error => {
        toast.error("Hubo un problema al procesar la información. Intente más tarde", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  useEffect(() => {
    const obtenerDatosRestaurante = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/propietario/paypal/${localStorage.getItem('restauranteID')}`);
        const datosPaypal = response.data[0];
        setValue('empresa', datosPaypal.nombre_tienda);
        setValue('secret', datosPaypal.secret);
      } catch (error) {
        console.error('Error al obtener los datos del restaurante:', error);
      }
    };
    obtenerDatosRestaurante();
  }, [setValue]);

  return (
    <div className="contenedorPaginasDashboard">
      <div className="encabezado">
        <div className="titulo">
          <h1>Métodos de pago</h1>
          <hr />
        </div>
        <div className="inforestaurante">
          <h1></h1>
        </div>
      </div>
      <div className="contenidoPagos">
        <div className="portadaPagos">
          <img className="imagenPagos" src="/imagenes/PagosImagen.svg" alt="" />
        </div>
        <div className="infoPagos">
          <p className="parrafo1">Todas tus transacciones se realizan a través de PayPal</p>
          <p className="parrafo2">Ingresa la información de PayPal</p>
          <div className="formularioPagos">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="ID" className="">
                  Empresa:
                </label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("empresa", {
                      required: {
                        value: true,
                        message: "Empresa es requerida",
                      },
                    })}
                    className="ingreso"
                    placeholder="********"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contrasenia" className="">
                  Secret:
                </label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("secret", {
                      required: {
                        value: true,
                        message: "Secret es requerido",
                      },
                    })}
                    className="ingreso"
                    placeholder="********"
                  />
                </div>
              </div>
              <div className="btnPagos">
                <button className="botonVerde">
                  Guardar Información
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PagosPage;

"use client";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ResponsivoNav from "../componentes/navegacion/ResponsivoNav";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./page.scss"

function RegisterPage() {
  // Estado para controlar si la contraseña se muestra o no
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar el estado de mostrar la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => {
    axios
      .post("http://localhost:4500/api/Web/clientes/register", data)
      .then((response) => {
        toast.success("Usuario creado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        window.location.href = "/login";
      })
      .catch((error) => {
        toast.error(
          "Hubo un problema al procesar la información. Intentalo mas tarde.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
        console.error("Error submitting data:", error);
      });
  };
  const renderError = (error: any) => {
    if (error && typeof error.message === "string") {
      return <p className="text-red-500 text-lg">{error.message}</p>;
    }
    return null;
  };
  const validarFechaNacimiento = (value: any) => {
    // Convertir la fecha de nacimiento a un objeto Date
    const fechaNacimiento = new Date(value);
    // Calcular la fecha actual
    const fechaActual = new Date();
    // Calcular la edad restando los años de la fecha de nacimiento de la fecha actual
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    // Verificar si la edad es menor de 18 años
    if (edad < 18) {
      return "Debes ser mayor de 18 años";
    }

    return undefined; // Devuelve undefined si el usuario es mayor de 18 años
  };

  return (
    <div className="contenedorPrincipal">
      <ResponsivoNav />
      <div className="contenedorRegistro">
        <div className="portadasRegistro">
          <div className="porta">

          </div>
        </div>
        <div className="contenedorFormularioRegistro">
          <div className="encabezado">
            <h1>
              Registro de Clientes
            </h1>
          </div>
          <div className="formularioRegistro">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="cedula">Cédula: </label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    inputMode="numeric"
                    {...register("cedula", {
                      required: { value: true, message: "La cédula es obligatoria" },
                      pattern: { value: /^[0-9]{10}$/, message: "La cédula debe tener 10 dígitos" }
                    })}
                    className="ingreso"
                    placeholder="1802154687"
                    onKeyPress={(event) => {
                      const charCode = event.which ? event.which : event.keyCode;
                      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.73 12.462q.214 0 .358-.144t.143-.356t-.144-.357t-.356-.143h-3.077q-.213 0-.357.143q-.143.143-.143.357t.143.356t.357.144zm0-2.77q.214 0 .358-.143t.143-.357t-.144-.356t-.356-.144h-3.077q-.213 0-.357.143q-.143.144-.143.357t.143.357t.357.143zm-8.653 3.616q-.823 0-1.394.114q-.572.114-1.025.368q-.39.21-.589.459t-.198.532q0 .223.177.375t.444.152h5.17q.267 0 .444-.165t.177-.393q0-.252-.189-.489t-.598-.47q-.454-.255-1.025-.369t-1.394-.114m0-1.616q.633 0 1.066-.433q.434-.434.434-1.067t-.434-1.066t-1.066-.434t-1.066.434t-.434 1.066t.434 1.067t1.066.433M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1h14.769q.23 0 .423-.192t.192-.424V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616v10.769q0 .23.192.423t.423.192M4 18V6z" /></svg>
                </div>
                {renderError(errors.cedula)}
              </div>
              <div>
                <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                <div className="contenedorIngreso">
                  <input
                    type="date"
                    {...register("fechaNacimiento", {
                      required: "La fecha de nacimiento es obligatoria",
                      pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "La fecha de nacimiento debe tener el formato YYYY-MM-DD" },
                      validate: validarFechaNacimiento // Usar la función de validación personalizada
                    })}
                    className="ingreso"
                    placeholder="1999-12-12"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="nombre">Nombre:</label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("nombre", {
                      required: { value: true, message: "El nombre es obligatorio" },
                      minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "El nombre debe contener solo letras",
                      },
                    })}
                    className="ingreso"
                    placeholder="Juan"
                  />
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.215-.625q-.214-.292-.593-.494q-1.234-.598-2.546-.916T12 14.616t-2.646.318t-2.546.916q-.38.202-.593.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.384t-.587-1.412T12 6.384t-1.412.588T10 8.384t.588 1.413t1.412.587m0 7.232" /></svg>
                </div>
                {renderError(errors.nombre)}
              </div>
              <div>
                <label htmlFor="apellido">Apellido:</label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("apellido", {
                      required: { value: true, message: "El apellido es obligatorio" },
                      minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "El apellido debe contener solo letras",
                      },
                    })}
                    className="ingreso"
                    placeholder="Pérez"
                  />
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.215-.625q-.214-.292-.593-.494q-1.234-.598-2.546-.916T12 14.616t-2.646.318t-2.546.916q-.38.202-.593.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.384t-.587-1.412T12 6.384t-1.412.588T10 8.384t.588 1.413t1.412.587m0 7.232" /></svg>
                </div>
                {renderError(errors.apellido)}
              </div>
              <div>
                <label htmlFor="correo">Correo:</label>
                <div className="contenedorIngreso">
                  <input
                    type="email"
                    {...register("correo", {
                      required: { value: true, message: "El correo es obligatorio" },
                      pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "El correo debe ser una dirección válida" }
                    })}
                    className="ingreso"
                    placeholder="Correo"
                  />
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.77 21q-.31 0-.54-.23T3 20.23v-6.46q0-.31.23-.54t.54-.23H7V8q0-2.083 1.458-3.542Q9.917 3 12 3h4q2.083 0 3.542 1.458Q21 5.917 21 8v12.5q0 .213-.144.356t-.357.144t-.356-.144T20 20.5V18h-5v2.23q0 .31-.23.54t-.54.23zM15 17h5V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v5h6.23q.31 0 .54.23t.23.54zm-6.308-.323q.154.096.308.096t.308-.096L14 14H4zM4 20h10v-4.98l-4.192 2.39q-.181.099-.382.158t-.422.059t-.425-.06q-.204-.058-.387-.157L4 15.02zm0-6v.38v-.016v.784v-.129V20v-4.98v.128v-.785v.015zm7-4.5q-.213 0-.356-.144t-.144-.357t.144-.356T11 8.5h6q.213 0 .356.144t.144.357t-.144.356T17 9.5z" /></svg>
                </div>
                {renderError(errors.correo)}
              </div>
              <div>
                <label htmlFor="contrasenia">Contraseña:</label>
                <div className="contenedorIngreso">
                  <input
                    type={showPassword ? "text" : "password"} // Cambia dinámicamente el tipo de entrada
                    {...register("contrasenia", {
                      required: { value: true, message: "La contraseña es obligatoria" },
                      minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                    })}
                    className="ingreso"
                    placeholder="********"
                  />
                  {/* Ícono para alternar la visibilidad de la contraseña */}
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" onClick={togglePasswordVisibility} width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M243.66 126.38c-.34-.76-8.52-18.89-26.83-37.2C199.87 72.22 170.7 52 128 52S56.13 72.22 39.17 89.18c-18.31 18.31-26.49 36.44-26.83 37.2a4.08 4.08 0 0 0 0 3.25c.34.77 8.52 18.89 26.83 37.2c17 17 46.14 37.17 88.83 37.17s71.87-20.21 88.83-37.17c18.31-18.31 26.49-36.43 26.83-37.2a4.08 4.08 0 0 0 0-3.25m-32.7 35c-23.07 23-51 34.62-83 34.62s-59.89-11.65-83-34.62A135.7 135.7 0 0 1 20.44 128A135.7 135.7 0 0 1 45 94.62C68.11 71.65 96 60 128 60s59.89 11.65 83 34.62A135.8 135.8 0 0 1 235.56 128A135.7 135.7 0 0 1 211 161.38ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36" /></svg>
                </div>
                {renderError(errors.contrasenia)}
              </div>
              <div>
                <label htmlFor="direccion">Direccion:</label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("direccion", {
                      required: { value: true, message: "La direccion es obligatorio" },
                      minLength: { value: 2, message: "La direccion debe tener al menos 2 caracteres" }
                    })}
                    className="ingreso"
                    placeholder="Ambato"
                  />
                  <svg className="iconoIngreso" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M248 210h-18V94h2a6 6 0 0 0 0-12h-50V46h2a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12h2v164H24a6 6 0 0 0 0 12h224a6 6 0 0 0 0-12M218 94v116h-36V94ZM54 46h116v164h-28v-50a6 6 0 0 0-6-6H88a6 6 0 0 0-6 6v50H54Zm76 164H94v-44h36ZM74 80a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12H80a6 6 0 0 1-6-6m48 0a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6m-42 46a6 6 0 0 1 0-12h16a6 6 0 0 1 0 12Zm42-6a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6"/></svg>
                </div>
                {renderError(errors.direccion)}
              </div>
              <div className='restaurante'>
                <label htmlFor="nombreRestaurante">Nombre del restaurante:</label>
                <div className="contenedorIngreso">
                  <input
                    type="text"
                    {...register("nombreRestaurante", {
                      required: { value: true, message: "El nombre del restaurante es obligatorio" },
                      minLength: { value: 2, message: "El nombre del restaurante debe tener al menos 2 caracteres" }
                    })}
                    className="ingreso"
                    placeholder="Pikos"
                  />
                  <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.75 18.692q.19 0 .316-.126q.126-.125.126-.316v-6.038q.708-.143 1.181-.655q.473-.513.473-1.257V6.692q0-.161-.111-.273q-.112-.111-.273-.111t-.273.111t-.112.273v3.193h-.942V6.692q0-.161-.112-.273t-.273-.111t-.273.111t-.111.273v3.193h-.943V6.692q0-.161-.111-.273t-.273-.111t-.273.111t-.112.273V10.3q0 .744.473 1.257t1.18.655v6.038q0 .19.127.316q.126.126.316.126m6 0q.19 0 .316-.126q.126-.125.126-.316v-5.792q.806-.304 1.278-1.121q.472-.818.472-1.954q0-1.33-.626-2.202q-.625-.873-1.566-.873t-1.566.873t-.626 2.202q0 1.136.472 1.954q.472.817 1.278 1.12v5.793q0 .19.126.316t.316.126M4.615 21q-.69 0-1.153-.462T3 19.385V4.615q0-.69.463-1.152T4.615 3h14.77q.69 0 1.152.463T21 4.616v14.769q0 .69-.463 1.153T19.385 21zm0-1h14.77q.23 0 .423-.192t.192-.424V4.616q0-.231-.192-.424T19.385 4H4.615q-.23 0-.423.192T4 4.615v14.77q0 .23.192.423t.423.192M4 20V4z" /></svg>
                </div>
                {renderError(errors.nombreRestaurante)}
              </div>


              <div className='boton'>
                <button type="submit" className="botonVerde">
                  Guardar información
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;

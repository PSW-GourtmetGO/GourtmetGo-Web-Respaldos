"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ventas from "../../../public/imagenes/VentasRealizadas.svg";
import platos from "../../../public/imagenes/PlatosRegistrados.svg";
import empleados from "../../../public/imagenes/EmpleadosRegistrados.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import negocioSf from "../../../public/imagenes/negocioSF.svg";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../../firebase/config";
import "./page.scss";

const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [total_pedidos, setTotalPedidos] = useState(null);
  const [total_empleados, setTotalEmpleados] = useState(null);
  const [total_platos, setTotalPlatos] = useState(null);
  const [restaurante, setRestaurante] = useState("");
  const [imagenRestaurante, setImagenRestaurante] = useState<File | null>(null);
  const [img, setImg] = useState("")

  useEffect(() => {
    const obtenerEstadisticasRestaurantes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/propietario/estadisticas/${localStorage.getItem(
            "restauranteID"
          )}`
        );
        setTotalPedidos(response.data.total_pedidos);
        setTotalEmpleados(response.data.total_empleados);
        setTotalPlatos(response.data.total_platos);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    const obtenerDatosRestaurante = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/propietario/${localStorage.getItem(
            "restauranteID"
          )}`
        );
        const datosRestaurante = response.data[0];
        setValue("cedula", datosRestaurante.cedula_p);
        setValue("nombre", datosRestaurante.nombre_p);
        setValue("apellido", datosRestaurante.apellido_p);
        const fechaNacimientoFormatted = new Date(
          datosRestaurante.fecha_nacimiento_p
        )
          .toISOString()
          .substr(0, 10);
        setValue("fechaNacimiento", fechaNacimientoFormatted);
        setValue("correo", datosRestaurante.correo_p);
        setValue("direccion", datosRestaurante.direccion_r);
        setValue("NombreRestaurante", datosRestaurante.nombre_r);
      } catch (error) {
        console.error("Error al obtener los datos del restaurante:", error);
      }
    };

    setRestaurante(localStorage.getItem("restauranteNOMBRE") || "");
    setImg(localStorage.getItem('restauranteImagen') || "")
    obtenerDatosRestaurante();
    obtenerEstadisticasRestaurantes();
  }, [setValue, restaurante]);

  const onSubmit: SubmitHandler<any> = async (data) => {

    const envioImagen = await uploadFile(
      imagenRestaurante, "logos",
      data.NombreRestaurante
    );

    const datosEnviar = {
      ...data,
      imagen: envioImagen,
    };

    axios
      .put(
        `http://localhost:4500/api/Web/propietario/${localStorage.getItem(
          "persona"
        )}`,
        datosEnviar
      )
      .then(async (response) => {
        localStorage.setItem("restauranteNOMBRE", data.NombreRestaurante);
        setRestaurante(localStorage.getItem("restauranteNOMBRE") || "");
        localStorage.setItem('restauranteImagen', envioImagen);
        setImg(envioImagen)
        toast.success("Información actualizada correctamente", {
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
      .catch((error) => {
        toast.error(
          "Hubo un problema al procesar la información. Intentalo mas tarde.",
          {
            position: "top-right",
            autoClose: 3000,
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
    <div className="contenedorPaginasDashboard">
      <div className="encabezado">
        <div className="titulo">
          <h1>Perfil</h1>
          <hr />
        </div>
        <div className="inforestaurante">
          <h1></h1>
        </div>
      </div>
      <div className="contenedorPerfil">
        <div className="informacionPerfil">
          <div className="imagenPerfil">
            <img src={img} alt="" />
          </div>
          <div className="nombrePerfil">
            <h2>{restaurante}</h2>
          </div>
          <div className="estadisticas">
            <div className="ventasRealizadas">
              <div className="contenedorIconoEstadisticas">
                <svg className="iconoEstadisticas" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2M2 4h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1s.45 1 1 1m15 14c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2" /></svg>
              </div>
              <div className="valoresEstadisticas">
                {total_pedidos && (
                  <p className="numeros">{total_pedidos}</p>
                )}
                <p className="">Ventas realizadas</p>
              </div>
            </div>
            <div className="platosRegistrados">
              <div className="contenedorIconoEstadisticas">
                <svg className="iconoEstadisticas" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M4 1.5a.5.5 0 0 0-1 0v3a2.5 2.5 0 0 0 2 2.45v7.55a.5.5 0 0 0 1 0V6.95A2.5 2.5 0 0 0 8 4.5v-3a.5.5 0 0 0-1 0v3a1.5 1.5 0 0 1-1 1.415V1.5a.5.5 0 0 0-1 0v4.415A1.5 1.5 0 0 1 4 4.5zm7 13V8H9.5a.5.5 0 0 1-.5-.5v-4c0-.663.326-1.283.771-1.729C10.217 1.326 10.837 1 11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0" /></svg>
              </div>
              <div className="valoresEstadisticas">
                {total_platos && (
                  <p className="numeros">{total_platos}</p>
                )}
                <p className="">Platos registrados</p>
              </div>
            </div>
            <div className="empleadosRegistrados">
              <div className="contenedorIconoEstadisticas">
                <svg className="iconoEstadisticas" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="currentColor" d="M16 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16m18 0a6 6 0 1 0 0-12a6 6 0 0 0 0 12M6.75 27A3.75 3.75 0 0 0 3 30.75V32s0 9 13 9s13-9 13-9v-1.25A3.75 3.75 0 0 0 25.25 27zm21.924 11.089c1.376.558 3.119.911 5.325.911c10.5 0 10.5-8 10.5-8v-.25A3.75 3.75 0 0 0 40.75 27H29.607a5.73 5.73 0 0 1 1.391 3.75v1.295l-.001.057l-.006.15q-.008.173-.035.43a10 10 0 0 1-.24 1.325a10.7 10.7 0 0 1-2.042 4.082" /></svg>
              </div>
              <div className="valoresEstadisticas">
                {total_empleados && (
                  <h1 className="numeros">{total_empleados}</h1>
                )}
                <h1 className="">Empleados registrados</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="formularioPerfil">
          <form
            className=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="ingresosFormularioPerfil">
            {/* Campo para el cedula */}
            <div>
              <label
                htmlFor="cedula"
                className=""
              >
                Cedula:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register("cedula", {
                    required: {
                      value: true,
                      message: "La cédula es obligatoria",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "La cédula debe tener 10 dígitos",
                    },
                  })}
                  className="ingreso"
                  placeholder="0502634967"
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

            {/* Campo para el nombre */}
            <div>
              <label
                htmlFor="nombre"
                className=""
              >
                Nombre:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="text"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "El nombre es obligatorio",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras ",
                    },
                  })}
                  className="ingreso"
                  placeholder="Alex"
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.215-.625q-.214-.292-.593-.494q-1.234-.598-2.546-.916T12 14.616t-2.646.318t-2.546.916q-.38.202-.593.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.384t-.587-1.412T12 6.384t-1.412.588T10 8.384t.588 1.413t1.412.587m0 7.232" /></svg>
              </div>
              {renderError(errors.nombre)}
            </div>

            {/* Campo para el apellido */}
            <div>
              <label
                htmlFor="apellido"
                className=""
              >
                Apellido:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="text"
                  {...register("apellido", {
                    required: {
                      value: true,
                      message: "El apellido es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios",
                    },
                  })}
                  className="ingreso"
                  placeholder="Jimenez"
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.834-1.018q1.417-.34 2.836-.34t2.837.34t2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.215-.625q-.214-.292-.593-.494q-1.234-.598-2.546-.916T12 14.616t-2.646.318t-2.546.916q-.38.202-.593.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.384t-.587-1.412T12 6.384t-1.412.588T10 8.384t.588 1.413t1.412.587m0 7.232" /></svg>
              </div>
              {renderError(errors.apellido)}
            </div>

            {/* Campo para la fecha de nacimiento */}
            <div>
              <label
                htmlFor="fechaNacimiento"
                className=""
              >
                Fecha de Nacimiento:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="date"
                  {...register("fechaNacimiento", {
                    required: {
                      value: true,
                      message: "La fecha de nacimiento es obligatoria",
                    },
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message:
                        "La fecha de nacimiento debe tener el formato YYYY-MM-DD",
                    },
                    validate: validarFechaNacimiento,
                  })}
                  className="ingreso"
                  placeholder="1999-12-12"
                />
              </div>
              {renderError(errors.fechaNacimiento)}
            </div>

            {/* Campo para el correo */}
            <div>
              <label
                htmlFor="correo"
                className=""
              >
                Correo:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="email"
                  {...register("correo", {
                    required: {
                      value: true,
                      message: "El correo es obligatorio",
                    },
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "El correo debe ser una dirección válida",
                    },
                  })}
                  className="ingreso"
                  placeholder="alexJime@gmail.com"
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.77 21q-.31 0-.54-.23T3 20.23v-6.46q0-.31.23-.54t.54-.23H7V8q0-2.083 1.458-3.542Q9.917 3 12 3h4q2.083 0 3.542 1.458Q21 5.917 21 8v12.5q0 .213-.144.356t-.357.144t-.356-.144T20 20.5V18h-5v2.23q0 .31-.23.54t-.54.23zM15 17h5V8q0-1.65-1.175-2.825T16 4h-4q-1.65 0-2.825 1.175T8 8v5h6.23q.31 0 .54.23t.23.54zm-6.308-.323q.154.096.308.096t.308-.096L14 14H4zM4 20h10v-4.98l-4.192 2.39q-.181.099-.382.158t-.422.059t-.425-.06q-.204-.058-.387-.157L4 15.02zm0-6v.38v-.016v.784v-.129V20v-4.98v.128v-.785v.015zm7-4.5q-.213 0-.356-.144t-.144-.357t.144-.356T11 8.5h6q.213 0 .356.144t.144.357t-.144.356T17 9.5z" /></svg>
              </div>
              {renderError(errors.correo)}
            </div>

            {/* Campo para la direccion */}
            <div>
              <label
                htmlFor="direccion"
                className=""
              >
                Dirección:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="text"
                  {...register("direccion", {
                    required: {
                      value: true,
                      message: "La dirección es obligatoria",
                    },
                    minLength: {
                      value: 8,
                      message: "La dirección debe tener al menos 8 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras y espacios",
                    },
                  })}
                  className="ingreso"
                  placeholder="Ambato"
                />
                <svg className="iconoIngreso" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M248 210h-18V94h2a6 6 0 0 0 0-12h-50V46h2a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12h2v164H24a6 6 0 0 0 0 12h224a6 6 0 0 0 0-12M218 94v116h-36V94ZM54 46h116v164h-28v-50a6 6 0 0 0-6-6H88a6 6 0 0 0-6 6v50H54Zm76 164H94v-44h36ZM74 80a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12H80a6 6 0 0 1-6-6m48 0a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6m-42 46a6 6 0 0 1 0-12h16a6 6 0 0 1 0 12Zm42-6a6 6 0 0 1 6-6h16a6 6 0 0 1 0 12h-16a6 6 0 0 1-6-6" /></svg>
              </div>
              {renderError(errors.direccion)}
            </div>

            {/* Campo para el nombre restaurante */}
            <div>
              <label
                htmlFor="NombreRestaurante"
                className=""
              >
                Nombre del Restaurante:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="text"
                  {...register("NombreRestaurante", {
                    required: {
                      value: true,
                      message: "El nombre del restaurante es obligatorio",
                    },
                    minLength: {
                      value: 2,
                      message:
                        "El nombre del restaurante debe tener al menos 2 caracteres",
                    },
                  })}
                  className="ingreso"
                  placeholder="Pikos"
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.75 18.692q.19 0 .316-.126q.126-.125.126-.316v-6.038q.708-.143 1.181-.655q.473-.513.473-1.257V6.692q0-.161-.111-.273q-.112-.111-.273-.111t-.273.111t-.112.273v3.193h-.942V6.692q0-.161-.112-.273t-.273-.111t-.273.111t-.111.273v3.193h-.943V6.692q0-.161-.111-.273t-.273-.111t-.273.111t-.112.273V10.3q0 .744.473 1.257t1.18.655v6.038q0 .19.127.316q.126.126.316.126m6 0q.19 0 .316-.126q.126-.125.126-.316v-5.792q.806-.304 1.278-1.121q.472-.818.472-1.954q0-1.33-.626-2.202q-.625-.873-1.566-.873t-1.566.873t-.626 2.202q0 1.136.472 1.954q.472.817 1.278 1.12v5.793q0 .19.126.316t.316.126M4.615 21q-.69 0-1.153-.462T3 19.385V4.615q0-.69.463-1.152T4.615 3h14.77q.69 0 1.152.463T21 4.616v14.769q0 .69-.463 1.153T19.385 21zm0-1h14.77q.23 0 .423-.192t.192-.424V4.616q0-.231-.192-.424T19.385 4H4.615q-.23 0-.423.192T4 4.615v14.77q0 .23.192.423t.423.192M4 20V4z" /></svg>
              </div>
              {renderError(errors.NombreRestaurante)}
            </div>

            {/* Campo para cargar la imagen del negocio */}
            <div>
              <label
                htmlFor="imagen"
                className=""
              >
                Imagen del Negocio:
              </label>
              <div className="contenedorIngreso">
                <input
                  type="file"
                  {...register("imagen", {
                    required: {
                      value: true,
                      message: "Imagen is required",
                    },
                  })}
                  className="ingresoImagen"
                  placeholder="Imagen"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagenRestaurante(e.target.files[0]);
                    }
                  }}
                />
                <svg className='iconoIngreso' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M7.5 16.5h9.154l-2.827-3.77l-2.615 3.308l-1.75-2.115zM5 19V5zm3.5-9.5q.414 0 .707-.293T9.5 8.5t-.293-.707T8.5 7.5t-.707.293T7.5 8.5t.293.707t.707.293" /></svg>
              </div>
            </div>
            </div>

            {/* Botón de submit */}
            <div className="contenedorBoton">
              <button className="botonVerde">
                Guardar información
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;

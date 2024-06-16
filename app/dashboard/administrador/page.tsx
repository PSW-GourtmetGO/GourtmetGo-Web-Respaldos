"use client";
import React, { useState, useEffect } from 'react'
import Modal from './componentes/modalempleado/page';
import ModalUpdate from './componentes/modalActualizarEmpleado/page';
import axios from 'axios';
import { Tooltip } from '@nextui-org/tooltip';
import "./page.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdministradorPage = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [data, setData] = useState({
    id: 0,
    cedula: '',
    nombre: '',
    apellido: '',
    fecha_Nacimiento: '',
    correo: '',
    contrasenia: '',
    telefono: '',
    direccion: '',
    estado: 0
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.reload();

  };

  const handleModalUpdateOpen = (empleado: Empleado) => {
    setData({
      id: empleado.id,
      cedula: empleado.cedula,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      fecha_Nacimiento: empleado.fecha_Nacimiento,
      correo: empleado.correo,
      contrasenia: empleado.contrasenia,
      telefono: empleado.telefono,
      direccion: empleado.direccion,
      estado: empleado.estado
    });
    setIsModalUpdateOpen(true);
  };

  const handleModalUpdateClose = () => {
    setIsModalUpdateOpen(false);
  }

  interface Empleado {
    id: number;
    cedula: string;
    nombre: string;
    apellido: string;
    fecha_Nacimiento: string;
    correo: string;
    contrasenia: string;
    telefono: string;
    direccion: string;
    estado: number;
  }


  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/empleado?restaurante_id=${localStorage.getItem('restauranteID')}`);
        console.log(response.data)
        setEmpleados(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };
    obtenerEmpleados();
  }, [isModalOpen, isModalUpdateOpen]);

  const eliminarEmpleado = async (empleado: any) => {
    try {
      // Verificar si la confirmación ya está abierta
      if (isConfirmOpen) return;

      setIsConfirmOpen(true);

      // Mostrar confirmación utilizando un toast personalizado
      const confirmToast = (
        <div className="grid justify-items-end">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <p className="mb-6">¿Estás seguro de que deseas eliminar este empleado?</p>
          </div>
          <button className="bg-[#00AF66] hover:bg-[#00af66d0] text-white font-bold py-2 px-4 rounded mr-2" onClick={(e) => confirmarEliminacion(e, empleado)}>Confirmar</button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={cancelarEliminacion}>Cancelar</button>
        </div>
      </div>
      

      );

      toast.warn(confirmToast, {
        position: "top-right", // Establecer la posición en top-right
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        draggablePercent: 80,
        onClose: () => {
          toast.dismiss(); // Cerrar el toast después de la confirmación
          setIsConfirmOpen(false); // Cambiar el estado cuando se cierra la confirmación
        }
      });
    } catch (error) {
      console.error('Error al eliminar el empleado:', error);
    }
  }



  const confirmarEliminacion = async (e: React.MouseEvent<HTMLButtonElement>, empleado: Empleado) => {
    try {
      const response = await axios.delete(`http://localhost:4500/api/Web/empleado?empleado_id=${empleado.id}`);
      setEmpleados(prevEmpleados => prevEmpleados.filter(e => e.id !== empleado.id));
      toast.success("Empleado eliminado de manera exitosa", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.dismiss(); // Cerrar el toast después de la confirmación
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  }

  const cancelarEliminacion = () => {
    toast.dismiss(); // Cerrar el toast si el usuario cancela
  }

  const restaurante = localStorage.getItem('restauranteNOMBRE');

  const InputChangeFind = async (event: any) => {
    const inputValue = event.target.value;
    try {
      const response = await axios.get(`http://localhost:4500/api/Web/empleado/get?restaurante=${localStorage.getItem('restauranteID')}&cedula=${inputValue}`);
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
    }
  };

  return (
    <div className="contenedorPaginasDashboard">
      <div className="encabezado">
        <div className="titulo">
          <h1>Empleados</h1>
          <hr />
        </div>
        <div className="inforestaurante">
          <h1>{restaurante}</h1>
        </div>
      </div>
      <div className="botonesAccionEmpleados">
        <div className="contenedorBuscador">
          <input
            className="inputBuscador"
            placeholder="Buscar nombre del empleado"
            onChange={InputChangeFind}>

          </input>
          <svg className='iconoBuscador' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37" /></svg>
        </div>
        <div className="btnAgregar">
          <button className="botonVerde" onClick={handleModalOpen}>
            Añadir Empleado
          </button>
        </div>
      </div>
      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Apellido
              </th>
              <th>
                Correo
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado: Empleado, index: number) => (
              <tr key={empleado.id} className="bg-transparent text-gray-800"> {/* Agrega la prop key con un valor único, como el ID del empleado */}
                <td className="py-2 px-4">
                  <span>{empleado.nombre}</span>
                </td>
                <td className="py-2 px-4">{empleado.apellido}</td>
                <td className="py-2 px-4">{empleado.correo}</td>
                <td className="py-2 px-4">
                  <div className="contenedorBotonesAccion">
                    <Tooltip content={
                      <div className='tooltip tooltipEditar'>
                        Editar
                      </div>
                    }>
                      <button className="btnAccion btnEditar" onClick={() => handleModalUpdateOpen(empleado)}>
                        <svg className='iconoAccion' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687t-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25t.688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" /></svg>
                      </button>
                    </Tooltip>
                    <Tooltip content={
                      <div className='tooltip tooltipEliminar'>
                        Eliminar
                      </div>
                    }>
                      <button className="btnAccion btnEliminar" onClick={() => eliminarEmpleado(empleado)}>
                        <svg className='iconoAccion' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z" /></svg>
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
      <ModalUpdate isOpen={isModalUpdateOpen} onClose={handleModalUpdateClose} Datos={data} setDatos={setData} />
    </div>

  );
};

export default AdministradorPage;

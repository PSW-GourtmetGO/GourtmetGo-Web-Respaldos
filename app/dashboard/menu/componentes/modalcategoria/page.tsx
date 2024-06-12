"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./page.scss";
import { Tooltip } from '@nextui-org/tooltip';
import { Bounce, toast } from 'react-toastify';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface Categoria {
    id: number;
    nombre: string;
    ver: string;
}

const ModalC: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [categoriaActualizar, setCategoriaActualizar] = useState("");
    const [actualizarID, setActualizarID] = useState(Number);
    const [nombreValido, setNombreValido] = useState(false);

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
                console.log(response.data)
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las caracteristicas:', error);
            }
        };
        obtenerCategorias();
    }, []);

    const handleSelectChange = async (event: any, categoriaId: any) => {
        const nuevaSeleccion = event.target.value;

        try {
            const response = await axios.put(`http://localhost:4500/api/Web/categoria/ver/${categoriaId}`, {
                ver: nuevaSeleccion,
            });
            console.log(response.data);

            // Actualiza el estado de categorias con el nuevo valor de ver
            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === categoriaId ? { ...categoria, ver: nuevaSeleccion } : categoria
                )
            );
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
        } catch (error) {
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
            console.error('Error al obtener las características:', error);
        }
    };

    const handleDeleteCategory = async (eliminarID: number) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta categoría?");
    
        if (!confirmacion) {
            return; // Si el usuario cancela, no se ejecuta la eliminación
        }
    
        try {
            const response = await axios.delete(`http://localhost:4500/api/Web/categoria/${eliminarID}`, {});
    
            toast.success("Categoria eliminada correctamente", {
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
    
            setCategorias((prevCategorias) =>
                prevCategorias.filter((categoria) => categoria.id !== eliminarID)
            );
        } catch (error) {
            toast.error(
                "Hubo un problema al procesar la información. Inténtalo más tarde.",
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
            console.error('Error al obtener las características:', error);
        }
    };
    

    const handleAddCategory = () => {
        setShowAdd(true);
    };

    const handleCloseAddCategory = async (ejecutar: number) => {
        if (ejecutar === 0) {
            setShowAdd(false);
            return;
        }
        if (nombreCategoria === "") {
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`, {
                nombre: nombreCategoria,
            });

            toast.success("Categoria creada correctamente", {
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

            console.log(response.data);

            const nuevaCategoria = response.data;

            setCategorias((prevCategorias) => [...prevCategorias, { id: nuevaCategoria, nombre: nombreCategoria, ver: "true" }]);
            setNombreCategoria("");
            setShowAdd(false);
        } catch (error) {
            toast.error(
                "Hubo un problema al procesar la información. Inténtalo más tarde.",
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
            console.error('Error al obtener las características:', error);
        }
    };

    const handleEditCategory = (nombre: string, categoriaID: number) => {
        setCategoriaActualizar(nombre);
        setActualizarID(categoriaID);
        setShowEdit(true);
    };

    const handleCloseEditCategory = async (ejecutar: number) => {
        if (ejecutar === 0) {
            setShowEdit(false);
            return;
        }
        if (categoriaActualizar === "") {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4500/api/Web/categoria/${actualizarID}`, {
                nombre: categoriaActualizar,
            });
            toast.success("Categoria editada correctamente", {
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
            console.log(response.data);
            const nuevaCategoria = response.data;

            setCategorias((prevCategorias) =>
                prevCategorias.map((categoria) =>
                    categoria.id === actualizarID ? { ...categoria, nombre: categoriaActualizar } : categoria
                )
            );
            setShowEdit(false);
        } catch (error) {
            toast.error(
                "Hubo un problema al procesar la información. Inténtalo más tarde.",
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
            console.error('Error al obtener las características:', error);
        }
        //setShowEdit(false);
    };

    const handleNombreCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
        setNombreValido(lettersOnly.trim().length >= 4);
        setNombreCategoria(lettersOnly);
    };

    useEffect(() => {
        setNombreValido(categoriaActualizar.trim().length >= 4);
      }, [categoriaActualizar]);

    const handleUpdateNombreCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, '');
        setNombreValido(lettersOnly.trim().length >= 4);
        setCategoriaActualizar(lettersOnly);
    };

    return (
        <>
            {isOpen && (
                <div className='contenedorModal'>
                    <div className="tarjetaModal">
                        <div className="encabezadoModal">
                            <h1>Categorías</h1>
                            <button type="button" onClick={() => {
                                onClose();
                                handleCloseAddCategory(0)
                            }} className="btnAtras">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /></svg>
                            </button>
                        </div>
                        <div className="agregarCategoria">
                            <button className="botonVerde" onClick={handleAddCategory}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 12.5V16q0 .213.144.356t.357.144t.356-.144T12.5 16v-3.5H16q.213 0 .356-.144t.144-.357t-.144-.356T16 11.5h-3.5V8q0-.213-.144-.356t-.357-.144t-.356.144T11.5 8v3.5H8q-.213 0-.356.144t-.144.357t.144.356T8 12.5zm.503 8.5q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
                                <p>Agregar</p>
                            </button>
                        </div>
                        <div className="cuerpoModal">
                            {showAdd ? (
                                <div>
                                    <div className="contenedorIngreso">
                                        <input type="text" placeholder="Nueva Categoría" className="ingreso" value={nombreCategoria} onChange={handleNombreCategoriaChange} required={nombreValido} max={15} maxLength={15} />
                                    </div>
                                    {!nombreValido && <p className="mensajeError text-red-500">Nombre tiene que tener más de 3 caracteres.</p>}
                                    <div className="botonesAgregar">
                                        <button className="botonVerde" onClick={() => handleCloseAddCategory(1)} disabled={!nombreValido}>Guardar</button>
                                        <button className="botonVerdeOscuro" onClick={() => handleCloseAddCategory(0)}>Cerrar</button>
                                    </div>
                                </div>
                            ) : showEdit ? (
                                <div>
                                    <div className="contenedorIngreso">
                                        <input type="text" placeholder="Editar Categoría" className="ingreso" value={categoriaActualizar} onChange={handleUpdateNombreCategoriaChange} required={nombreValido} maxLength={25} minLength={4} />
                                    </div>
                                    {!nombreValido && <p className="mensajeError text-red-500">Nombre tiene que tener más de 3 caracteres.</p>}
                                    <div className="botonesAgregar">
                                        <button className="botonVerde" onClick={() => handleCloseEditCategory(1)} disabled={!nombreValido}>Actualizar</button>
                                        <button className="botonVerdeOscuro" onClick={() => handleCloseEditCategory(0)}>Cerrar</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='tabla'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Categoría</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categorias.map((categoria: Categoria, index: number) => (
                                                <tr key={index}>
                                                    <td>
                                                        <span>{categoria.nombre}</span>
                                                    </td>
                                                    <td>
                                                        <div className="botonesAccion">
                                                            <Tooltip content={
                                                                <div className='tooltip tooltipEditar'>
                                                                    Editar
                                                                </div>
                                                            }>

                                                                <button className="btnAccion btnEditar" onClick={() => handleEditCategory(categoria.nombre, categoria.id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687t-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25t.688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" /></svg>
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip content={
                                                                <div className='tooltip tooltipEliminar'>
                                                                    Eliminar
                                                                </div>
                                                            }>
                                                                <button className="btnAccion btnEliminar" onClick={() => handleDeleteCategory(categoria.id)}>
                                                                    <svg className='iconoAccion' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z" /></svg>
                                                                </button>
                                                            </Tooltip>
                                                            <div className="contenedorIngreso">
                                                                <select
                                                                    className="select"
                                                                    onChange={(event) => handleSelectChange(event, categoria.id)}
                                                                    value={categoria.ver}
                                                                >
                                                                    <option value="true" selected={categoria.ver === "true"}>Visible</option>
                                                                    <option value="false" selected={categoria.ver === "false"}>No Visible</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalC;

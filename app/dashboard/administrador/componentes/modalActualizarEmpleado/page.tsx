"use client";
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import axios from 'axios';
import "./page.scss";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalUpdate {
    isOpen: boolean;
    Datos: any;
    onClose: () => void;

    setDatos: React.Dispatch<React.SetStateAction<{
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
    }>>;
}


const ModalUpdate: React.FC<ModalUpdate> = ({ isOpen, onClose, Datos, setDatos }) => {

    const [errors, setErrors] = useState<any>({
        id: '',
        cedula: '',
        nombre: '',
        apellido: '',
        fecha_Nacimiento: '',
        direccion: '',
        telefono: '',
        correo: '',
        contrasenia: '',
        estado: ''
    });

    useEffect(() => {
        if (Datos.fecha_Nacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(Datos.fecha_Nacimiento)) {
            setDatos(prevDatos => ({
                ...prevDatos,
                fecha_Nacimiento: new Date(prevDatos.fecha_Nacimiento).toISOString().split('T')[0]
            }));
        }
    }, [Datos.fecha_Nacimiento, setDatos]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDatos({
            ...Datos,
            [name]: value
        });
        validateField(name, value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    };
    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'cedula':
                if (!/^\d+$/.test(value) || value.length !== 10) {
                    error = 'La cédula debe contener 10 dígitos numéricos';
                }
                break;
            case 'nombre':
            case 'apellido':
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Este campo solo puede contener letras';
                }
                break;
            case 'fecha_Nacimiento':
                const age = new Date().getFullYear() - new Date(value).getFullYear();
                if (isNaN(age) || age < 18) {
                    error = 'Debe ser mayor de 18 años';
                }
                break;
            case 'direccion':
                if (!value) {
                    error = 'Este campo no puede estar vacío';
                }
                break;
            case 'telefono':
                if (!/^\d{10}$/.test(value)) {
                    error = 'El teléfono debe contener 10 dígitos numéricos';
                }
                break;
            case 'correo':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    error = 'Formato de correo inválido';
                }
                break;
            case 'contrasenia':
                if (value.length < 8) {
                    error = 'La contraseña debe tener al menos 8 caracteres';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const actualizarEmpleado = async () => {
        try {
            const response = await axios.put(`http://localhost:4500/api/Web/empleado`, Datos);
            toast.success("Empleado actualizado exitosamente", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            toast.error("Hubo un problema con el servidor", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const inputFileRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            {isOpen && (
                <div className="contenedorModal">
                    <div className="tarjetaModal">
                        <div className="encabezadoModal">
                            <h1>Actualizar empleado</h1>
                            <button type="button" onClick={() => {
                                onClose();
                            }} className="btnAtras">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" /></svg>
                            </button>
                        </div>
                        <div className="contenido">
                            <div className='formularioModalEditarEmpleado'>
                                <form onSubmit={handleSubmit}>
                                    {['cedula', 'fecha_Nacimiento', 'nombre', 'apellido', 'direccion', 'telefono', 'correo'].map((field, index) => (
                                        <div className="ingresos" key={index}>
                                            <label htmlFor={field} className="label">
                                                {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}:
                                            </label>
                                            <div className="contenedorIngreso">
                                                <input
                                                    type={field === 'fecha_Nacimiento' ? 'date' : field === 'correo' ? 'email' : field === 'contrasenia' ? 'password' : 'text'}
                                                    id={field}
                                                    name={field}
                                                    value={Datos[field]}
                                                    onChange={handleInputChange}
                                                    className={`ingreso ${errors[field] ? 'error' : ''}`}
                                                    required
                                                />
                                            </div>
                                            {errors[field] && <div className="error red-text">{errors[field]}</div>}

                                        </div>
                                    ))}
                                </form>
                            </div>
                        </div>
                        <div className="botones">
                            <button type="submit" onClick={actualizarEmpleado} className="botonVerde">Guardar</button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalUpdate;
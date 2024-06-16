"use client";
import Image from "next/image";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import NoImagen from "../../../../../public/imagenes/noimagen.svg";
import ActualizarImagen from "../../../../../public/imagenes/actualizarImagen.svg";
import "./page.scss";
import { Bounce, toast } from "react-toastify";
import { uploadPlate } from "@/app/firebase/config";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  Datos: {
    platoID: number;
    platoNombre: string;
    precio: number;
    visible: string;
    categoria: number;
    accion: string;
    imagen: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      platoID: number;
      platoNombre: string;
      precio: number;
      visible: string;
      categoria: number;
      accion: string;
      imagen: string;
    }>
  >;
}

interface Categoria {
  id: number;
  nombre: string;
  ver: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, Datos, setData }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imagenPlato, setImagenPlato] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    precio: 0.5,
    visible: "true",
    categoria: 1,
  });
  const [nombreEditado, setNombreEditado] = useState("");
  const [imagenAnterior, setImagenAnterior] = useState("");
  const [nombreValido, setNombreValido] = useState(false);

  useEffect(() => {
    setNombreEditado(Datos.platoNombre);
    setImagenAnterior(Datos.imagen)
  }, [Datos.platoNombre]);

  const handleModalClose = () => {
    setFormData({
      id: 0,
      nombre: "",
      precio: 0.5,
      visible: "true",
      categoria: 1,
    });
    setNombreValido(false);
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/Web/categoria/${localStorage.getItem('restauranteID')}`);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las estadísticas:', error);
      }
    };
    obtenerCategorias();
  });

  const guardarPlato = async () => {
    try {
      const categoria = categorias.find(
        (cat: Categoria) => cat.id == formData.categoria
      );
      console.log("Categoria id:", formData.categoria);
      console.log("Categoría seleccionada:", categoria);

      if (!categoria) {
        console.error("Categoría no encontrada");
        return;
      }

      console.log(imagenPlato)

      let nuevaImagen = null
      if (imagenPlato != null) {
        nuevaImagen = await uploadPlate(
          imagenPlato,
          `platos/${categoria.nombre}`,
          localStorage.getItem("restauranteNOMBRE")
        );
        console.log(nuevaImagen)
        console.log("arriba")
      }

      console.log(nuevaImagen)

      console.log("Este es el plato subido", nuevaImagen);
      const response = await axios.post(
        `http://localhost:4500/api/Web/plato/${formData.categoria}`,
        {
          nombre: formData.nombre,
          precio: formData.precio,
          ver: formData.visible,
          imagen: nuevaImagen,
        }
      );
      toast.success("Plato creado correctamente", {
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

      setFormData({
        id: 0,
        nombre: "",
        precio: 0.5,
        visible: "true",
        categoria: 1,
      });
      setNombreValido(false);

      onClose();
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
    }
  };

  const actualizarPlato = async (plato: any) => {
    try {
      const categoriaSeleccionada = categorias.find(
        (cat: Categoria) => cat.id == Datos.categoria
      );
      console.log("Categoria id del actualizar:", Datos.categoria);
      console.log("Categoría seleccionada:", categoriaSeleccionada);

      if (!categoriaSeleccionada) {
        console.error("Categoría no encontrada al actualizar");
        return;
      }

      let nuevaImagen = ''

      if (imagenPlato == null) {
        nuevaImagen = imagenAnterior
      } else {
        nuevaImagen = await uploadPlate(
          imagenPlato,
          `platos/${categoriaSeleccionada.nombre}`,
          localStorage.getItem("restauranteNOMBRE")
        );
      }

      console.log("Este es el plato subido", nuevaImagen);
      const response = await axios.put(
        `http://localhost:4500/api/Web/plato/${Datos.platoID}`,
        {
          nombre: Datos.platoNombre,
          precio: Datos.precio,
          ver: Datos.visible,
          imagen: nuevaImagen,
          categoria: Datos.categoria,
        }
      );
      toast.success("Plato editado correctamente", {
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

      onClose();
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
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleEliminarClick = () => {
    toast.dark(
      <div>
        <p className="mb-5">¿Estás seguro de que quieres eliminar este plato?</p>
        <button className="border mr-2 p-2 rounded-md bg-[#a31616]" onClick={() => { eliminarPlato(); toast.dismiss(); }}>Sí</button>
        <button className="border ml-2 p-2 rounded-md bg-[#16a34a]" onClick={() => toast.dismiss()}>No</button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  const eliminarPlato = async () => {
    setIsDeleting(true);

    try {
      const response = await axios.delete(
        `http://localhost:4500/api/Web/plato/?plato_id=${Datos.platoID}`
      );

      if (response.status === 200) {
        toast.success("Plato eliminado correctamente", {
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
      }

      onClose();
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
      console.error("Error al eliminar el plato:", error);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChangeEdit = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
      ...Datos,
      [name]: value,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...Datos,
      [name]: value,
    });
  };

  useEffect(() => {
    setNombreEditado(Datos.platoNombre);
    setNombreValido(Datos.platoNombre.trim().length >= 4);
  }, [Datos.platoNombre]);

  const handleNombreChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
    setNombreEditado(lettersOnly);
    setData((prevData) => ({
      ...prevData,
      platoNombre: lettersOnly,
    }));
    setNombreValido(lettersOnly.trim().length >= 4 && Datos.precio > 0);
  };

  const handleNombreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({
      ...formData,
      [name]: lettersOnly,
    });
    setNombreValido(lettersOnly.trim().length >= 4 && formData.precio > 0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
      ];
      if (validImageTypes.includes(fileType)) {
        setImagenPlato(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          "Formato de imagen no válido. Por favor, seleccione un archivo JPG, JPEG, PNG o SVG.",
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
      }
    }
  };

  return (
    <>
      {isOpen && Datos.accion === "crear" ? (
        <div className="contenedorModal">
          <div className="tarjetaModal">
            <div className="encabezadoModal">
              <h1>Agregar plato</h1>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    id: 0,
                    nombre: "",
                    precio: 0.5,
                    visible: "true",
                    categoria: 1,
                  });
                  setNombreValido(false);
                  onClose();
                }}
                className="btnAtras"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                  />
                </svg>
              </button>
            </div>
            <div className="formulario">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="">
                    Nombre:
                  </label>
                  <div className="contenedorIngreso">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleNombreChange}
                      className="ingreso"
                      required={nombreValido}
                      max={15}
                      maxLength={15}
                    />
                    <svg
                      className="iconoIngreso"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 32 32"
                    >
                      <g fill="currentColor">
                        <path d="M6.82 20.575v3.834A12.475 12.475 0 0 0 16.5 29c4.324 0 8.136-2.196 10.38-5.533v-5.374C26.112 23.136 21.757 27 16.5 27c-4.354 0-8.089-2.65-9.68-6.425m18.21-10.199V8.654a3.32 3.32 0 0 1 .184-1.116A12.459 12.459 0 0 0 16.5 4a12.45 12.45 0 0 0-7.976 2.875l.005.061l.001.027v2.7A10.476 10.476 0 0 1 16.5 6c3.514 0 6.624 1.726 8.53 4.376" />
                        <path d="M24.5 16.5a8 8 0 1 1-16 0a8 8 0 0 1 16 0m-8 7a7 7 0 1 0 0-14a7 7 0 0 0 0 14M29.99 7.94c0-.9-.73-1.63-1.63-1.63c-1.3 0-2.34 1.05-2.33 2.34v5.55c0 1.253.726 2.375 1.85 2.883V25.7c0 .52.42.94.94.94h.23c.52 0 .94-.42.94-.94zM6.82 6.31a.68.68 0 0 0-.68.68v2.69c0 .2-.16.35-.35.35c-.2 0-.35-.16-.35-.35V7.02c0-.37-.29-.7-.66-.71c-.39-.01-.71.3-.71.68v2.69c0 .2-.16.35-.35.35c-.2 0-.35-.16-.35-.35V7.02c0-.37-.29-.7-.66-.71c-.39-.01-.71.3-.71.68v4.58c0 .902.437 1.707 1.109 2.209c.601.339.601 1.891.601 1.891v10.02c0 .52.42.94.94.94h.23c.52 0 .94-.42.94-.94V15.67s0-1.491.601-1.891A2.757 2.757 0 0 0 7.53 11.57V6.99a.72.72 0 0 0-.71-.68" />
                      </g>
                    </svg>
                  </div>
                  {!nombreValido && (
                    <p className="mensajeError text-red-500">
                      Nombre tiene que tener más de 4 caracteres.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="costo" className="">
                    Costo:
                  </label>
                  <div className="contenedorIngreso">
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                      className="ingreso"
                      required
                    />
                    <svg
                      className="iconoIngreso"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 5.25a.75.75 0 0 1 .75.75v.317c1.63.292 3 1.517 3 3.183a.75.75 0 0 1-1.5 0c0-.678-.564-1.397-1.5-1.653v3.47c1.63.292 3 1.517 3 3.183s-1.37 2.891-3 3.183V18a.75.75 0 0 1-1.5 0v-.317c-1.63-.292-3-1.517-3-3.183a.75.75 0 0 1 1.5 0c0 .678.564 1.397 1.5 1.652v-3.469c-1.63-.292-3-1.517-3-3.183s1.37-2.891 3-3.183V6a.75.75 0 0 1 .75-.75m-.75 2.597c-.936.256-1.5.975-1.5 1.653s.564 1.397 1.5 1.652zm1.5 5v3.306c.936-.256 1.5-.974 1.5-1.653c0-.678-.564-1.397-1.5-1.652"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {!nombreValido && (
                    <p className="mensajeError text-red-500">
                      El precio debe ser mayor a 0.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="estado" className="">
                    Estado:
                  </label>
                  <div className="contenedorIngreso">
                    <select
                      className="select"
                      name="visible"
                      value={formData.visible.toString()}
                      onChange={handleSelectChange}
                    >
                      <option value="true" selected>
                        Visible
                      </option>
                      <option value="false">No Visible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="categoria" className="">
                    Categoria
                  </label>
                  <div className="contenedorIngreso">
                    <select
                      className="select"
                      name="categoria"
                      value={formData.categoria.toString()}
                      onChange={handleSelectChange}
                    >
                      {categorias.map((categoria: Categoria, index: number) => (
                        <option value={categoria.id}>{categoria.nombre}</option>
                      ))}
                      ;
                    </select>
                  </div>
                </div>
              </form>
              <div className="foto">
                <label htmlFor="foto" className="label">
                  Seleccione su Imagen:
                </label>
                <input
                  type="file"
                  id="foto"
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  name="foto"
                  className="input-file"
                  required
                />
                <div className="image-container">
                  <Image
                    className="image"
                    src={NoImagen}
                    alt="Imagen no disponible"
                  />
                  <div className="overlay" onClick={handleImageClick}>
                    <Image
                      className="icon"
                      src={ActualizarImagen}
                      alt="Actualizar imagen"
                    />
                    <p>Cargar imagen</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="botones">
              <button
                type="submit"
                onClick={guardarPlato}
                className="botonVerde"
                disabled={!nombreValido}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      ) : isOpen && Datos.accion === "actualizar" ? (
        <div className="contenedorModal">
          <div className="tarjetaModal">
            <div className="encabezadoModal">
              <h1>Editar plato</h1>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    id: 0,
                    nombre: "",
                    precio: 0.5,
                    visible: "true",
                    categoria: 1,
                  });
                  setNombreValido(false);
                  onClose();
                }}
                className="btnAtras"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                  />
                </svg>
              </button>
            </div>
            <div className="formulario">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre" className="">
                    Nombre:
                  </label>
                  <div className="contenedorIngreso">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={nombreEditado}
                      onChange={handleNombreChangeEdit}
                      className="ingreso"
                      required={nombreValido}
                      max={15}
                      maxLength={15}
                    />
                    <svg
                      className="iconoIngreso"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 32 32"
                    >
                      <g fill="currentColor">
                        <path d="M6.82 20.575v3.834A12.475 12.475 0 0 0 16.5 29c4.324 0 8.136-2.196 10.38-5.533v-5.374C26.112 23.136 21.757 27 16.5 27c-4.354 0-8.089-2.65-9.68-6.425m18.21-10.199V8.654a3.32 3.32 0 0 1 .184-1.116A12.459 12.459 0 0 0 16.5 4a12.45 12.45 0 0 0-7.976 2.875l.005.061l.001.027v2.7A10.476 10.476 0 0 1 16.5 6c3.514 0 6.624 1.726 8.53 4.376" />
                        <path d="M24.5 16.5a8 8 0 1 1-16 0a8 8 0 0 1 16 0m-8 7a7 7 0 1 0 0-14a7 7 0 0 0 0 14M29.99 7.94c0-.9-.73-1.63-1.63-1.63c-1.3 0-2.34 1.05-2.33 2.34v5.55c0 1.253.726 2.375 1.85 2.883V25.7c0 .52.42.94.94.94h.23c.52 0 .94-.42.94-.94zM6.82 6.31a.68.68 0 0 0-.68.68v2.69c0 .2-.16.35-.35.35c-.2 0-.35-.16-.35-.35V7.02c0-.37-.29-.7-.66-.71c-.39-.01-.71.3-.71.68v2.69c0 .2-.16.35-.35.35c-.2 0-.35-.16-.35-.35V7.02c0-.37-.29-.7-.66-.71c-.39-.01-.71.3-.71.68v4.58c0 .902.437 1.707 1.109 2.209c.601.339.601 1.891.601 1.891v10.02c0 .52.42.94.94.94h.23c.52 0 .94-.42.94-.94V15.67s0-1.491.601-1.891A2.757 2.757 0 0 0 7.53 11.57V6.99a.72.72 0 0 0-.71-.68" />
                      </g>
                    </svg>
                  </div>
                  {!nombreValido && (
                    <p className="mensajeError text-red-500">
                      Nombre tiene que tener más de 4 caracteres.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="costo" className="">
                    Costo:
                  </label>
                  <div className="contenedorIngreso">
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={Datos.precio}
                      onChange={handleInputChangeEdit}
                      className="ingreso"
                      required
                    />
                    <svg
                      className="iconoIngreso"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 5.25a.75.75 0 0 1 .75.75v.317c1.63.292 3 1.517 3 3.183a.75.75 0 0 1-1.5 0c0-.678-.564-1.397-1.5-1.653v3.47c1.63.292 3 1.517 3 3.183s-1.37 2.891-3 3.183V18a.75.75 0 0 1-1.5 0v-.317c-1.63-.292-3-1.517-3-3.183a.75.75 0 0 1 1.5 0c0 .678.564 1.397 1.5 1.652v-3.469c-1.63-.292-3-1.517-3-3.183s1.37-2.891 3-3.183V6a.75.75 0 0 1 .75-.75m-.75 2.597c-.936.256-1.5.975-1.5 1.653s.564 1.397 1.5 1.652zm1.5 5v3.306c.936-.256 1.5-.974 1.5-1.653c0-.678-.564-1.397-1.5-1.652"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {!nombreValido && (
                    <p className="mensajeError text-red-500">
                      El precio debe ser mayor a 0.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="estado" className="">
                    Estado:
                  </label>
                  <div className="contenedorIngreso">
                    <select
                      className="select"
                      name="visible"
                      value={Datos.visible.toString()}
                      onChange={handleSelectChangeEdit}
                    >
                      <option value="true" selected>
                        Visible
                      </option>
                      <option value="false">No Visible</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="categoria" className="">
                    Categoria
                  </label>
                  <div className="contenedorIngreso">
                    <select
                      className="select"
                      name="categoria"
                      value={Datos.categoria.toString()}
                      onChange={handleSelectChangeEdit}
                    >
                      {categorias.map((categoria: Categoria, index: number) => (
                        <option value={categoria.id}>{categoria.nombre}</option>
                      ))}
                      ;
                    </select>
                  </div>
                </div>
              </form>
              <div className="foto">
                <label htmlFor="foto" className="label">
                  Seleccione su Imagen:
                </label>
                <input
                  type="file"
                  id="foto"
                  ref={inputFileRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  name="foto"
                  className="input-file"
                  required
                />
                <div className="image-container">
                  <Image
                    className="image"
                    src={NoImagen}
                    alt="Imagen no disponible"
                  />
                  <div className="overlay" onClick={handleImageClick}>
                    <Image
                      className="icon"
                      src={ActualizarImagen}
                      alt="Actualizar imagen"
                    />
                    <p>Cargar imagen</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="botones">
              <button
                type="submit"
                onClick={actualizarPlato}
                className="botonVerde"
                disabled={!nombreValido}
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={handleEliminarClick}
                className="botonRojo"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>.</h1>
      )}
    </>
  );
};

export default Modal;

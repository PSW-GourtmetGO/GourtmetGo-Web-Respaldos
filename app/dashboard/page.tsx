"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import filtro from "../../public/imagenes/IconoFiltro.svg";
import negocioSf from "../../public/imagenes/negocioSF.svg";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import empleado1 from "../../public/imagenes/mujer2.svg";
import ModalPedidos from "./administrador/componentes/modalPedidos/page";
import axios from "axios";
import "./page.scss"

interface Pedido {
  pID: number;
  pCODIGO: string;
  pTOTAL: string;
  pESTADO: string;
  cCLIENTE: string;
}

function PedidosPage() {
  const restaurante = localStorage.getItem("restauranteNOMBRE");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [filtroo, setFiltro] = useState<string>("Pendiente");
  const [modalOpen, setModalOpen] = useState(false);
  const [img, setImg] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/pedidos/${localStorage.getItem(
            "restauranteID"
          )}`
        );
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };
    obtenerPedidos();
    setImg(localStorage.getItem('restauranteImagen') || "")
  }, [modalOpen,pedidos]);

  const getColorByEstado = (estado: any) => {
    switch (estado) {
      case "Pendiente":
        return "#FFB572";
      case "Completo":
        return "#6BE2BE";
      case "Preparado":
        return "#9290FE";
      default:
        return "#eb459f";
    }
  };

  const openModal = (pedido: Pedido) => {
    setPedido(pedido);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const FilterChange = async (event: any) => {
    if (filtroo === "Preparado") {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/pedidos/buscar/pedido?restaurante=${localStorage.getItem(
            "restauranteID"
          )}&filtro=${filtroo}`
        );
        setPedidos(response.data);
        setFiltro("");
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    } else if (filtroo === "Pendiente") {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/pedidos/buscar/pedido?restaurante=${localStorage.getItem(
            "restauranteID"
          )}&filtro=${filtroo}`
        );
        setPedidos(response.data);
        setFiltro("Preparado");
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    } else if (filtroo === "") {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/Web/pedidos/${localStorage.getItem(
            "restauranteID"
          )}`
        );
        setPedidos(response.data);
        setFiltro("Pendiente");
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    }
  };

  const InputChangeFind = async (event: any) => {
    const inputValue = event.target.value;
    try {
      const response = await axios.get(
        `http://localhost:4500/api/Web/pedidos?restaurante=${localStorage.getItem(
          "restauranteID"
        )}&codigo=${inputValue}`
      );
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al obtener las estadísticas:", error);
    }
  };

  return (
    <div className="contenedorPaginasDashboard">
      <div className="encabezado">
        <div className="titulo">
          <h1>Pedidos</h1>
          <hr />
        </div>
        <div className="inforestaurante">
          <h1>{restaurante}</h1>
          <div className="logoRestaurante">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
      <div className="contenidoPedidos">
        <div className="botonesAccionPedidos">
          <div className="contenedorBuscador">
            <input
              className="inputBuscador"
              placeholder="Buscar código"
              onChange={InputChangeFind}
            ></input>
            <svg className='iconoBuscador' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37" /></svg>
          </div>
          <div className="botonFiltrar">
            <button
              className="botonVerdeOscuro"
              onClick={FilterChange}
            >
              Filtrar Orden
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m-1 2h-11m16 0h-3" /></svg>
            </button>
          </div>
        </div>
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th>
                  Cliente
                </th>
                <th>
                  Código
                </th>
                <th>
                  Total a pagar
                </th>
                <th>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr
                  key={pedido.pID}
                  onClick={() => openModal(pedido)}
                  className="filaTablaPedidos"
                >
                  <td>
                    <span>{pedido.cCLIENTE}</span>
                  </td>
                  <td>
                    <span>{pedido.pCODIGO}</span>
                  </td>
                  <td>
                    <span>{pedido.pTOTAL}</span>
                  </td>
                  <td>
                    <span className="estadoPedido" style={{
                      backgroundColor: getColorByEstado(pedido.pESTADO),
                    }}>{pedido.pESTADO}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalPedidos
        isOpen={modalOpen}
        onClose={closeModal}
        pedidoDatos={pedido}
        setPedidoDatos={setPedido}
      ></ModalPedidos>
    </div>
  );
}

export default PedidosPage;

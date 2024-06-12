"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./page.scss";

interface Pedido {
  pID: number;
  pCODIGO: string;
  pTOTAL: string;
  pESTADO: string;
  cCLIENTE: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pedidoDatos: Pedido | null;
  setPedidoDatos: React.Dispatch<React.SetStateAction<Pedido | null>>;
}

interface detallePedido {
  pltNOMBRE: string;
  pdCANTIDAD: number;
  pdPRECIO: number;
}
const ModalPedidos: React.FC<ModalProps> = ({ isOpen, onClose, pedidoDatos, setPedidoDatos }) => {
  const [detallePedidos, setDetallePedidos] = useState<detallePedido[]>([]);
  useEffect(() => {
    const obtenerDetallePedidos = async () => {
      if (pedidoDatos) {
        try {
          const response = await axios.get(`http://localhost:4500/api/Web/pedidos/detalle/${pedidoDatos.pID}`);
          setDetallePedidos(response.data);
        } catch (error) {
          console.error('Error al obtener los pedidos:', error);
        }
      }
    };
    obtenerDetallePedidos();
  }, [pedidoDatos]);

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

  const actualizarEstado = async () => {
    if (pedidoDatos) {
      let newEstado = pedidoDatos.pESTADO;
      if (newEstado === 'Pendiente') {
        newEstado = 'Preparado'
      } else {
        newEstado = 'Completo'
      }
      try {
        const response = await axios.put(`http://localhost:4500/api/Web/pedidos?id=${pedidoDatos.pID}&estado=${newEstado}`);
        setPedidoDatos((prevState: Pedido | null) => ({ ...prevState!, pESTADO: newEstado }));
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        alert("Hubo un problema al conectarse al servidor")
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="contenedorModal">
          <div className="tarjetaModal">
            <div className="encabezadoModal">
              <h1>Información del Pedido</h1>
              <button
                type="button"
                onClick={onClose}
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
            <div className="cuerpoModalPedidos">
              <div className="informacionPedido">
                <div className="lineaInformacion">
                  <p>Cliente:</p>
                  <p>{pedidoDatos?.cCLIENTE}</p>
                </div>
                <div className="lineaInformacion">
                  <p>Estado:
                  </p>
                  <div
                    className="estadoPedido"
                    style={{
                      backgroundColor: getColorByEstado(pedidoDatos?.pESTADO),
                    }}
                  >
                    {pedidoDatos?.pESTADO}
                  </div>
                </div>
                <div className="lineaInformacion">
                  <p>Código de validación:</p>
                  <p>{pedidoDatos?.pCODIGO}</p>
                </div>
              </div>
              <div className="tabla">
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detallePedidos.map((detalle, index) => (
                      <tr key={index}>
                        <td>{detalle.pltNOMBRE}</td>
                        <td>{detalle.pdCANTIDAD}</td>
                        <td>{detalle.pdPRECIO}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td>Total:</td>
                      <td>{detallePedidos.reduce((acc, curr) => acc + curr.pdPRECIO, 0)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="botonesPedido">
              <button
                  type="submit"
                  className="botonVerde" onClick={actualizarEstado}
                >
                  Cambiar Siguiente Estado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalPedidos;

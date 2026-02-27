import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPrestamo, getSocios, eliminarPrestamo } from "../redux/actions";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrestamoList = () => {
  const dispatch = useDispatch();
  const prestamos = useSelector((state) => state.prestamos);
  const socios = useSelector((state) => state.socios);

  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [prestamosFiltrados, setPrestamosFiltrados] = useState([]);

  const anios = ["2022", "2023", "2024", "2025"];
  const meses = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  useEffect(() => {
    dispatch(getPrestamo());
    dispatch(getSocios());
  }, [dispatch]);

  useEffect(() => {
    if (anio || mes) {
      handleFiltrar();
    }
  }, [prestamos, anio, mes]);

  // const obtenerNombreSocio = (usuarioId) => {
  //   const socio = socios.find((s) => s.id === usuarioId);
  //   return socio ? `${socio.apellido}, ${socio.nombre}` : "Desconocido";
  // };
  
  
  


  const obtenerDatosSocio = (prestamo) => {
    if (!prestamo.Usuario)
      return { nombreCompleto: "Desconocido", cuil: "", cbu: "" };
    const { apellido, nombre, cuil, cbu } = prestamo.Usuario;
    return {
      nombreCompleto: `${apellido}, ${nombre}`,
      cuil,
      cbu,
    };
  };

  const handleFiltrar = () => {
    if (!anio && !mes) {
      alert("Selecciona al menos un año o mes para filtrar");
      setPrestamosFiltrados([]);
      return;
    }

    const filtro = prestamos.filter((p) => {
      const fecha = new Date(p.fecha);
      const pAnio = fecha.getFullYear().toString();
      const pMes = String(fecha.getMonth() + 1).padStart(2, "0");

      return (anio ? pAnio === anio : true) && (mes ? pMes === mes : true);
    });

    const unicosPorSocio = [];
    const idsAgregados = new Set();

    for (const prestamo of filtro) {
      if (!idsAgregados.has(prestamo.usuarioId)) {
        unicosPorSocio.push(prestamo);
        idsAgregados.add(prestamo.usuarioId);
      }
    }

    setPrestamosFiltrados(unicosPorSocio);
  };

  const handleDescargarPDF = () => {
    if (prestamosFiltrados.length === 0) {
      alert("No hay préstamos para descargar.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Listado de Préstamos ${mes} - ${anio}`, 14, 20);

    const tableColumn = ["Cuil", "Socio", "Importe", "CBU"];
    const tableRows = [];

    prestamosFiltrados.forEach((p) => {
      const { cuil } = obtenerDatosSocio(p);
      const { nombreCompleto } = obtenerDatosSocio(p);
      const importe = `$${p.importe}`;
      const { cbu } = obtenerDatosSocio(p);
      tableRows.push([cuil, nombreCompleto, importe, cbu]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    const total = prestamosFiltrados.reduce(
      (acc, p) => acc + parseFloat(p.importe),
      0
    );
    doc.text(
      `Total Prestado: $${total.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    const nombreMes = meses.find((m) => m.value === mes)?.label || "todos";
    const fileName = `prestamos_${anio || "todos"}-${nombreMes}.pdf`;

    doc.save(fileName);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold text-white mb-4">
        Seleccionar Periodo
      </h1>

      <div className="flex gap-4 mb-6">
        <Link to="/ayuda">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer font-semibold">
            Ayuda
          </button>
        </Link>

        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className="px-4 py-2 rounded bg-white text-black shadow "
        >
          <option value="">Seleccionar Año</option>
          {anios.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="px-4 py-2 rounded bg-white text-black shadow "
        >
          <option value="">Seleccionar mes</option>
          {meses.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleFiltrar}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer font-semibold"
        >
          Buscar
        </button>
      </div>

      <div className="text-white mb-2">
        Año seleccionado: {anio || "Ninguno"} <br />
        Mes seleccionado: {mes || "Ninguno"}
      </div>

      {prestamosFiltrados.length > 0 ? (
        <>
          <table className="table-auto bg-white rounded shadow w-full max-w-4xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Cuil</th>
                <th className="px-4 py-2 text-left">Socio</th>
                <th className="px-4 py-2 text-left">Importe</th>
                <th className="px-4 py-2 text-left">Cbu</th>
                <th className="px-4 py-2 text-left">Accion</th>
              </tr>
            </thead>
            <tbody>
              {prestamosFiltrados.map((p) => {
                console.log(p);
                const { nombreCompleto, cuil, cbu } = obtenerDatosSocio(p);
                return (
                  <tr key={p.id} className="border-t">
                    <td className="px-4 py-2">{cuil}</td>
                    <td className="px-4 py-2">{nombreCompleto}</td>
                    <td className="px-4 py-2">${p.importe}</td>
                    <td className="px-4 py-2">{cbu}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          if (
                            confirm("¿Estás seguro de eliminar este préstamo?")
                          ) {
                            dispatch(eliminarPrestamo(p.id)).then(() => {
                              dispatch(getPrestamo());
                            });
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 text-white text-xl font-semibold">
            Total Prestado: $
            {prestamosFiltrados
              .reduce((acc, p) => acc + parseFloat(p.importe), 0)
              .toLocaleString()}
          </div>

          <button
            onClick={handleDescargarPDF}
            className="mt-4 bg-green-500 font-semibold hover:bg-green-600 text-white px-4 py-2 rounded shadow cursor-pointer"
          >
            Descargar Listado
          </button>
        </>
      ) : (
        <p className="text-white mt-4">
          No hay préstamos para mostrar. Usa los filtros.
        </p>
      )}
    </div>
  );
};

export default PrestamoList;

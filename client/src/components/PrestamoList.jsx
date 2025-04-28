import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPrestamo, getSocios } from "../redux/actions";

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

  console.log(prestamos);

  useEffect(() => {
    const filtro = prestamos.filter((p) => {
      const fecha = new Date(p.fecha);
      const pAnio = fecha.getFullYear().toString();
      const pMes = String(fecha.getMonth() + 1).padStart(2, "0");

      return (anio ? pAnio === anio : true) && (mes ? pMes === mes : true);
    });

    setPrestamosFiltrados(filtro);
  }, [anio, mes, prestamos]);

  const obtenerNombreSocio = (usuarioId) => {
    const socio = socios.find((s) => s.id === usuarioId);
    return socio ? `${socio.apellido}, ${socio.nombre}` : "Desconocido";
  };

  const handleFiltrar = () => {
    const filtro = prestamos.filter((p) => {
      const fecha = new Date(p.fecha);
      const pAnio = fecha.getFullYear().toString();
      const pMes = String(fecha.getMonth() + 1).padStart(2, "0");
      return (anio ? pAnio === anio : true) && (mes ? pMes === mes : true);
    });

    setPrestamosFiltrados(filtro);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Filtrar Préstamos</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          className="px-4 py-2 rounded bg-white text-black shadow"
        >
          <option value="">Seleccionar año</option>
          {anios.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="px-4 py-2 rounded bg-white text-black shadow"
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Filtrar
        </button>
      </div>

      {/* Acá podrías mostrar los resultados filtrados */}
      <div className="text-white">
        Año seleccionado: {anio || "Ninguno"} <br />
        Mes seleccionado: {mes || "Ninguno"}
      </div>

      {prestamosFiltrados.length > 0 ? (
        <table className="table-auto bg-white rounded shadow w-full max-w-4xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Socio ID</th>
              <th className="px-4 py-2 text-left">Importe</th>
              <th className="px-4 py-2 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {prestamosFiltrados.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{obtenerNombreSocio(p.usuarioId)}</td>
                <td className="px-4 py-2">${p.importe}</td>
                <td className="px-4 py-2">{p.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-white mt-4">
          No hay préstamos para mostrar. Usa los filtros.
        </p>
      )}
    </div>
  );
};

export default PrestamoList;

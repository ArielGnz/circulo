import React, { useState } from "react";

const PrestamoList = () => {
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");

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

  const handleFiltrar = () => {
    console.log("Filtrar por:", { anio, mes });
    // Acá podrías hacer una búsqueda o filtrar una lista
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
    </div>
  );
};

export default PrestamoList;

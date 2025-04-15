import React from 'react';
import { useState } from 'react';

const Socios = () => {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState("");

  return (
    <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Buscar Socios</h1>

    <div className="flex mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ingrese nombre o DNI"
        className="border rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        // onClick={manejarsearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
      >
        Buscar
      </button>
    </div>

    {result && (
      <div className="border rounded p-4 bg-gray-100">
        {result}
      </div>
    )}
  </div>
  )
}

export default Socios;
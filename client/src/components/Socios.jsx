import React from "react";
import { useState } from "react";

const Socios = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="flex flex-col justify-center items-center m-16">
      <h1 className="text-4xl font-bold mb-6 text-white">Buscar Socios</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ingrese nombre o DNI"
          className="border bg-white mx-2 text-xl rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          // onClick={manejarsearch}
          className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>

      {result && <div className="border bg-white rounded p-4 bg-gray-100">{result}</div>}
    </div>
  );
};

export default Socios;

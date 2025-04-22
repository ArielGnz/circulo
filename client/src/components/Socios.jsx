import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocios } from "../redux/actions";

const Socios = () => {
  const dispatch = useDispatch();
  const socios = useSelector((state) => state.socios);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    dispatch(getSocios());
  }, []);

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
        <button className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Buscar
        </button>
      </div>

      {result && (
        <div className="border bg-white rounded p-4 bg-gray-100">{result}</div>
      )}

      <table className="table-auto bg-white rounded shadow mt-8 w-full max-w-4xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {socios &&
            socios
              .slice()
              .sort((a, b) => a.dni - b.dni)
              .map((socio) => (
                <tr key={socio.id} className="border-t">
                  <td className="px-4 py-2">{socio.dni}</td>
                  <td className="px-4 py-2">{socio.apellido}</td>
                  <td className="px-4 py-2">{socio.nombre}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Socios;

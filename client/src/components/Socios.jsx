import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocios } from "../redux/actions";

const Socios = () => {

  const dispatch = useDispatch();
  const socios = useSelector((state) => state.socios);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");

  useEffect(() =>{
    dispatch(getSocios())
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
        <button
          // onClick={manejarsearch}
          className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>

      {result && <div className="border bg-white rounded p-4 bg-gray-100">{result}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
  {socios && socios.map((socio) => (
    <div key={socio.id} className="border bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl">{socio.nombre} {socio.apellido}</h2>
      <p>DNI: {socio.dni}</p>
    </div>
  ))}
</div>


    </div>
  );
};

export default Socios;

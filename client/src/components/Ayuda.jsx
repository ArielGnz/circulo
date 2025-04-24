import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocios, postPrestamo } from "../redux/actions";
import { Link } from "react-router-dom";

const Ayuda = () => {
  const dispatch = useDispatch();
  const socios = useSelector((state) => state.socios);
  const [search, setSearch] = useState("");
  const [filteredSocios, setFilteredSocios] = useState([]);

  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    dispatch(getSocios());
  }, []);

  useEffect(() => {
    const termino = normalizar(search).split(" ").filter(Boolean);

    const filtro = socios.filter((socio) => {
      const dni = socio.dni.toString();
      const nombre = normalizar(socio.nombre);
      const apellido = normalizar(socio.apellido);
      const datosSocio = `${apellido} ${nombre} ${dni}`;

      return termino.every((palabra) => datosSocio.includes(palabra));
    });

    setFilteredSocios(filtro);
  }, [search, socios]);

  const handleAgregar = (socio) => {
    console.log("Socio agregado:", socio);
  };

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

        <Link to="/PrestamoList">
          <button className="mx-4 text-xl bg-sky-600 rounded-md p-2 text-white font-semibold">Listado</button>
        </Link>
      </div>

      <table className="table-auto bg-white rounded shadow mt-8 w-full max-w-4xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">DNI</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Importe</th>
            <th className="px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {(search ? filteredSocios : socios)
            .slice()
            .sort((a, b) => a.dni - b.dni)
            .map((socio) => (
              <tr key={socio.id} className="border-t">
                <td className="px-4 py-2">{socio.dni}</td>
                <td className="px-4 py-2">{socio.apellido}</td>
                <td className="px-4 py-2">{socio.nombre}</td>
                <td className="px-4 py-2"><input type="text" /></td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleAgregar(socio)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ayuda;

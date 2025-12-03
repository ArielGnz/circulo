import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoNegro from "../assets/logoNegro.jpg";

const Home = () => {
  const navigate = useNavigate();
  const password = "3794";
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handleAyuda = () => {
    // const ingreso = prompt("ingrese contraseña");
    // if(ingreso === password){
    //   navigate("/ayuda");
    // } else {
    //   alert("contraseña incorrecta");
    // }
    setShowModal(true);
  };

  const handlePasswordSubmit = () => {
    if (inputPassword === password) {
      setShowModal(false);
      setInputPassword("");
      navigate("/ayuda");
    } else {
      alert("contraseña incorrecta");
      setInputPassword("");
    }
  };

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center border-2 rounded-md border-gray-400 max-w-md mx-auto">
        <div className="flex justify-center my-4">
          <img
            src={logoNegro}
            alt="Logo"
            className="h-[250px] object-contain"
          />
        </div>

        <div className="m-4 mx-auto">
          <Link to="/socios">
            <div className="m-2 w-[240px] border-2 mx-10 font-bold rounded-md bg-gray-300 hover:bg-gray-400 text-center transform transition duration-200 hover:scale-105 hover:-translate-y-1">
              <h1 className="text-gray-600 hover:text-white px-10 text-xl py-4">
                SOCIOS
              </h1>
            </div>
          </Link>

          <button
            onClick={handleAyuda}
            className="m-2 w-[240px] border-2 mx-10 font-bold rounded-md bg-gray-300 hover:bg-gray-400 text-center transform transition duration-200 hover:scale-105 hover:-translate-y-1"
          >
            <h1 className="text-gray-600 hover:text-white px-10 text-xl py-4">
              AYUDA
            </h1>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Ingrese la Contraseña
            </h2>
            <input
              ref={inputRef}
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePasswordSubmit();
                }
              }}
            />
            <div className="flex justify-between">
              <button
                onClick={handlePasswordSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Ingresar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setInputPassword("");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import logoNegro from "../assets/logoNegro.jpg"

const Home = () => {
  return (
    <div className="flex flex-col justify-center my-18 border-2 rounded-md border-gray-400">
      <div>

      </div>
      <Link to="/socios">
        <div className="border-2 mx-10 font-bold rounded-md bg-gray-300 hover:bg-gray-400 text-center transform transition duration-200 hover:scale-105 hover:-translate-y-1">
          <h1 className="text-gray-600 hover:text-white px-10 text-xl py-4">
            SOCIOS
          </h1>
        </div>
      </Link>

      <Link to="/ayuda">
        <div className="border-2 mx-10 font-bold rounded-md bg-gray-300 hover:bg-gray-400 text-center transform transition duration-200 hover:scale-105 hover:-translate-y-1">
          <h1 className="text-gray-600 hover:text-white px-10 text-xl py-4">
            AYUDA
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Home;

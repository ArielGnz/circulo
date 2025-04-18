import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center my-18">
      <Link to="/socios">
        <div className="border-2 bg-gray-300 mx-10 font-bold rounded-md">
          <h1 className="text-gray-600 px-10 text-xl py-4">SOCIOS</h1>
        </div>
      </Link>

      <div className="border-2 bg-gray-300 mx-10 font-bold rounded-md">
        <h1 className="text-gray-600 px-10 text-xl py-4">AYUDA</h1>
      </div>
    </div>
  );
};

export default Home;

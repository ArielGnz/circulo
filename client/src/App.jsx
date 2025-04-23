import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Socios from "./components/Socios";
import Ayuda from "./components/Ayuda";

function App() {
  return (
    <div className="flex justify-center bg-black mx-auto cd w-[100%]"> 
      <div className="w-[85%] h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/socios" element={<Socios />} />
          <Route path="/ayuda" element={<Ayuda />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

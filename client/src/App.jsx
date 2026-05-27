import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Socios from "./components/Socios";
import Ayuda from "./components/Ayuda";
import PrestamoList from "./components/PrestamoList";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/prestamoList" element={<PrestamoList />} />
      </Routes>
    </div>
  );
}

export default App;

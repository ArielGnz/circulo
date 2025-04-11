import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="h-screen flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

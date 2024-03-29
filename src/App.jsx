import Navbar from "./Components/Navbar";
import Create from "./Components/Create";
import "./index.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Create />} />
      </Routes>
    </>
  );
}

export default App;

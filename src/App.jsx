import Navbar from "./Components/Navbar";
import Create from "./Components/Create";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Read from "./Pages/Read";
import Update from "./Pages/Update";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;

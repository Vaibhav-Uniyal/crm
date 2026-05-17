import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import ArchitecturePage from "./pages/ArchitecturePage";
import MyImpactPage from "./pages/MyImpactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/my-impact" element={<MyImpactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import LandingPage from "./Pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

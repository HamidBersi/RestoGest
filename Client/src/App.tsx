import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import LandingPage from "./Pages/LandingPage";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

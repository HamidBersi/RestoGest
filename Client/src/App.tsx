import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import Register from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import { Toaster } from "sonner";
import Home from "./Pages/HomePage";
import Suppliers from "./Pages/SuppliersPage";

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </UserProvider>
    </>
  );
}

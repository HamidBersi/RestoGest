import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import Register from "./Pages/Register";
import LandingPage from "./Pages/Landing";
import LoginPage from "./Pages/Login";
import { Toaster } from "sonner";
import Home from "./Pages/Home";

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
        </Routes>
      </UserProvider>
    </>
  );
}

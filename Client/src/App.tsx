import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import { CartProvider } from "./Context/CartContext";
import Register from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import { Toaster } from "sonner";
import Home from "./Pages/HomePage";
import Suppliers from "./Pages/SuppliersPage";
import SupplierDetailsPage from "./Pages/SupplierDetailsPage";
import SupplierProductsPage from "./Pages/SupplierProductsPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage"; // 🆕
import Navbar from "./Components/Navbar"; // 🆕
import OrdersPage from "./Pages/OrdersPage"; // 🆕

export default function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <UserProvider>
        <CartProvider>
          <Navbar /> {/* 🆕 Navbar sticky */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:id" element={<SupplierDetailsPage />} />
            <Route
              path="/suppliers/:id/products"
              element={<SupplierProductsPage />}
            />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} /> {/* 🆕 */}
            <Route path="/orders" element={<OrdersPage />} /> {/* 🆕 */}
          </Routes>
        </CartProvider>
      </UserProvider>
    </>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="text-2xl font-bold text-blue-500">hello world</div>
  </StrictMode>
);

import "dotenv/config";
import express from "express";
import usersRoute from "./Routes/usersRoutes.js";
import "./models/usersModel.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./Routes/authRoutes.js";
import suppliersRoute from "./Routes/suppliersRoutes.js";
import productsRoutes from "./Routes/productsRoutes.js";
import "./models/associations.js";

import { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/products", productsRoutes);
app.use("/api/orders", productsRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Erreur middleware global:", err); // <--- AJOUTE ÇA
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

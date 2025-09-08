import "dotenv/config";
import express from "express";
import usersRoute from "./Routes/usersRoute.js";
import "./models/User.js";
import { errorHandler } from "./middleware/error.js";

import { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

app.use("/api/users", usersRoute);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use("/errorHandler");
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));

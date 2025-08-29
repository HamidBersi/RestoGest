import express from "express";
const app = express();
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.listen(4000, () => console.log("API on:4000"));

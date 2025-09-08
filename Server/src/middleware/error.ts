import type { ErrorRequestHandler } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ message: "Duplicate resource" });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors.map((e) => ({ path: e.path, message: e.message })),
    });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

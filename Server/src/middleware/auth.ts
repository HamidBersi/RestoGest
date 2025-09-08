import type { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export interface JwtUser {
  sub: number;
  role: "admin" | "staff";
}

declare module "express" {
  interface Request {
    user?: JwtUser;
  }
}
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer (.+)$/i);
  if (!m) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = JWT.verify(m[1], JWT_SECRET);
    if (
      typeof payload === "object" &&
      payload !== null &&
      "sub" in payload &&
      "role" in payload
    ) {
      req.user = {
        sub: (payload as any).sub,
        role: (payload as any).role,
      };
      next();
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

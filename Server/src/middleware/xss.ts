import xss from "xss";

import { Request, Response, NextFunction } from "express";

export function sanitizeBody(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (req.body[field]) {
        req.body[field] = xss(req.body[field]);
      }
    }
    next();
  };
}

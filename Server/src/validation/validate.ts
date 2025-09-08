import { Request, Response, NextFunction } from "express";
import joi from "joi";

export function validate(
  schema: any,
  where: keyof Pick<Request, "body" | "query" | "params"> = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req[where], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((d: any) => ({
          field: d.path.join("."),
          msg: d.message,
        })),
      });
    }
    req[where] = value;
    next();
  };
}
export const idParamsSchema = joi.object({
  id: joi.number().integer().positive().required(),
});

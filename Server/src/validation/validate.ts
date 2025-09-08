import { Request, Response, NextFunction } from "express";

export function validate(
  schema: any,
  where: keyof Pick<Request, "body" | "query" | "params"> = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req[where], {
      abortEarly: false, // renvoyer toutes les erreurs
      stripUnknown: true, // retirer les champs non prévus
      convert: true, // conversions utiles (ex: strings -> numbers si nécessaire)
    });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((d: any) => ({
          field: d.path.join("."),
          msg: d.message,
        })),
      });
    }
    req[where] = value; // type assertion needed here
    next();
  };
}

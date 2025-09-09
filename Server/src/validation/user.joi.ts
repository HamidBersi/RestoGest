import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid("admin", "staff").default("staff"),

  createdAt: Joi.forbidden(),
  updatedAt: Joi.forbidden(),
  created_at: Joi.forbidden(),
  updated_at: Joi.forbidden(),
});

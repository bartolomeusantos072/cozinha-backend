import Joi from 'joi';

export const signupSchema = Joi.object({
  nome: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});

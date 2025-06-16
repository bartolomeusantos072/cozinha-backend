import Joi from 'joi';

export const pratoSchema = Joi.object({
  dia: Joi.date().iso().required(),
  turno: Joi.string().required(),
  principal: Joi.string().required(),
  sobremesa: Joi.string().required(),
  bebida: Joi.string().required(),
  imagem: Joi.string().uri().optional().allow('', null),
  id_usuario: Joi.number().required(),
});

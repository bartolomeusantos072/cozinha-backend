import Joi from 'joi';

export const votoSchema = Joi.object({
  id_prato: Joi.number().required(),
  voto: Joi.boolean().required(),
  ip_usuario: Joi.string()
    .ip({ version: ['ipv4', 'ipv6'], cidr: 'optional' })
    .required(),
});

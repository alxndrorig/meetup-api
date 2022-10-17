import Joi from 'joi';

export const userValidation = data => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().trim().min(2).max(30).required(),
    password: Joi.string().trim().min(8).required(),
    role: Joi.string().default('user'),
  });

  return schema.validate(data);
};

import Joi from 'joi';

export const meetupValidation = data => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    keywords: Joi.array().optional(),
    date: Joi.date().required(),
    location: Joi.string().required(),
  });

  return schema.validate(data);
};

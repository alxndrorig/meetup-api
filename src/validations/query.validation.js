import Joi from 'joi';

export const queryValidation = query => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    keywords: Joi.any(),
    date: Joi.date(),
    location: Joi.string(),
    page: Joi.number(),
    sort: Joi.string(),
  });

  return schema.validate(query);
};

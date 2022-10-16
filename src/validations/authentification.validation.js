import Joi from "joi";

export const authentificationValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required()
    });

    return schema.validate(data);
}
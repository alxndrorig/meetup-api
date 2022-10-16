import Joi from "joi";

export const refreshTokenValidation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    
    return schema.validate(data);
}
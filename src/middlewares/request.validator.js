import { meetupValidation } from '../validations/meetup.validation.js'

class RequestValidator {
    meetup(req, res, next) {
        const { error } = meetupValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }
}

export default RequestValidator;

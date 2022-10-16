import { meetupValidation } from "../validations/meetup.validation.js";
import { queryValidation } from "../validations/query.validation.js";

class RequestValidator {
    meetup(req, res, next) {
        const { error } = meetupValidation(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }

    query(req, res, next) {
        const { error } = queryValidation(req.query);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            next();
        }
    }
}

export default RequestValidator;

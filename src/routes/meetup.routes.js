import { Router } from "express";
import { 
    getAllMeetups, 
    getMeetupById, 
    createMeetup, 
    deleteMeetup, 
    changeMeetup 
} from "../controllers/meetup.controller.js";
import RequestValidator from '../middlewares/request.validator.js'

const requestValidator = new RequestValidator();


export const meetupRoutes = () => {
    const router = Router();
    
    router.get('/meetups', requestValidator.query, getAllMeetups);

    router.get('/meetups/:id', getMeetupById);

    router.post('/meetups', requestValidator.meetup, createMeetup);

    router.delete('/meetups/:id', deleteMeetup);

    router.put('/meetups/:id', requestValidator.meetup, changeMeetup);

    return router;
} 
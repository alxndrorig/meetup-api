import { Router } from "express";
import { 
    getAllMeetups, 
    getMeetupById, 
    createMeetup, 
    deleteMeetup, 
    changeMeetup 
} from "../controllers/meetup.controller.js";

export const meetupRoutes = () => {
    const router = Router();
    
    router.get('/meetups', getAllMeetups);

    router.get('/meetups/:id', getMeetupById);

    router.post('/meetups', createMeetup);

    router.delete('/meetups/:id', deleteMeetup);

    router.put('/meetups/:id', changeMeetup);

    return router;
} 
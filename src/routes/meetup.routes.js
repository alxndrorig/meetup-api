import { Router } from "express";
import { 
    getAllMeetups, 
    getMeetupById, 
    createMeetup, 
    deleteMeetup, 
    changeMeetup 
} from "../controllers/meetup.controller.js";
import RequestValidator from '../middlewares/request.validator.js'
import CheckingRole, { checkingRole } from "../middlewares/rolecheck.validator.js"
import { expressjwt } from "express-jwt"

const requestValidator = new RequestValidator();


export const meetupRoutes = () => {
    const router = Router();
    const rolecheck = new CheckingRole();
    const jwt = expressjwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256']
    })
    
    router.get(
        '/meetups',
        jwt,
        rolecheck.isUser,
        requestValidator.query,
        getAllMeetups,
         /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'Getting all meetups'
        #swagger.parameters['title'] = {
            in: 'query',
            description: 'searching by title',
            type: 'string'
        }
        #swagger.parameters['description'] = {
            in: 'query',
            description: 'searching by description',
            type: 'string'
        }
        #swagger.parameters['keywords'] = {
            in: 'query',
            description: 'searching by keywords',
            type: 'array'
        }
        #swagger.parameters['date'] = {
            in: 'query',
            description: 'search by date',
            type: 'string'
        }
        #swagger.parameters['location'] = {
            in: 'query',
            description: 'searching by location',
            type: 'string'
        }
        #swagger.parameters['page'] = {
            in: 'query',
            description: 'number of page',
            type: 'string'
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            description: 'sorting by field',
            type: 'string'
        }
        #swagger.responses[200] ={
            description: 'return array of meeetups',
            schema: [{$ref: '#/definitions/Meetup'}]
        }
        */);

    router.get(
        '/meetups/:id', 
        jwt,
        rolecheck.isUser,
        getMeetupById
        /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'Getting a meetup by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Meetup ID',
            type: 'number'
        }
        #swagger.responses[200] = {
            description: 'Returned array of meeetups',
            schema: {$ref: '#/definitions/Meetup'}
        }
        #swagger.responses[404] = {
            description: 'Meetup with inputed id not found',
            schema: {$ref: '#/definitions/HttpException'}
        }
        */);

    router.post(
        '/meetups', 
        jwt,
        rolecheck.isAdmin,
        requestValidator.meetup,
        createMeetup
        /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'Creating a new Meetup'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Meetup from request body',
            schema: {$ref: '#/definitions/CreatedMeetup'}
        }
        #swagger.responses[201] = {
            description: 'Meetup is created',
            schema: {$ref: '#/definitions/CreatedMeetup'}
        }
        #swagger.responses[400] = {
            description: 'Exception with bad request',
            schema: { $ref: '#/definitions/HttpException' }
        }
        */);

    router.delete(
        '/meetups/:id',
        jwt,
        rolecheck.isAdmin,
        deleteMeetup
         /*
         #swagger.tags = ['Meetups']
         #swagger.description = 'Deleting meetup by ID'
         #swagger.parameters['id'] = {
            in: 'path',
            description: 'Meetup id',
            type: 'number'
         }
         #swagger.responses[204] = {
            description: 'Meetup is deleted',
        }
        #swagger.responses[404] = {
            description: 'Meetup with inputed ID not found',
            schema: { $ref: '#/definitions/HttpException' }
        }
         */);

    router.put(
        '/meetups/:id', 
        jwt,
        rolecheck.isAdmin,
        requestValidator.meetup, 
        changeMeetup
        /*
        #swagger.tags = ['Meetups']
        #swagger.tags = 'Updating meetup by ID'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Meetup from request body',
            schema: {$ref: '#/definitions/CreatedMeetup'}
        }
        #swagger.responses[200] = {
            description: 'Meetup is updated',
            schema: {$ref: '#/definitions/CreatedMeetup'}
        }
        #swagger.responses[404] = {
            description: 'Meetup with inputed ID not found',
            schema: { $ref: '#/definitions/HttpException' }
        }
        */);

    return router;
} 
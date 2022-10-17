import swaggerAutogen from 'swagger-autogen';
import 'dotenv/config';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Meetup API',
    description: 'REST CRUD Meetup-api',
  },
  host: `localhost:${process.env.PORT ? process.env.PORT : 3000}`,
  basepath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Meetups',
      description: 'Routes',
    },
  ],
  definitions: {
    Meetup: {
      id: 1,
      title: 'Test title',
      description: 'Test description',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      date: '2022-12-10T09:50:20.000Z',
      location: 'online',
    },
    CreatedMeetup: {
      title: 'Test title',
      description: 'Test description',
      keywords: ['keyword1', 'keyword2', 'keyword3'],
      date: '2022-12-10T09:50:20.000Z',
      location: 'online',
    },
    HttpException: {
      message: 'exception message',
    },
  },
};

const outputFile = 'src/swagger/swagger.document.json';
const endpointsFiles = ['src/routes/meetup.routes'];

swaggerAutogen()(outputFile, endpointsFiles, doc);

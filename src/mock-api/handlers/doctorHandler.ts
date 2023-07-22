import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw';
import { db } from '../factories/db';

export const doctorHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [
  /*
  Generates REST API request handlers for all CRUD operations from model definition 
    - GET /doctors/:id  
    - GET /doctors,  
    - POST /doctors,  
    - PUT /doctors/:id,  
    - DELETE /doctors/:id, 
  */
  ...db.doctor.toHandlers('rest'),

  // add other custom handlers here if needed ...
  // rest.get('/doctors', (req, res, ctx) => {}),
];

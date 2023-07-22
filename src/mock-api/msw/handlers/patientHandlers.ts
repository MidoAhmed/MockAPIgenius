import { rest } from 'msw';
import { db } from '../factories/db';

export const patientHandlers = [
  /*
  Generates REST API request handlers for all CRUD operations from model definition 
    - GET /patients/:id  
    - GET /patients,  
    - POST /patients,  
    - PUT /patients/:id,  
    - DELETE /patients/:id, 
  */
  ...db.patient.toHandlers('rest'),
  // add other custom handlers here if needed ...
  // rest.get('/patients', (req, res, ctx) => {}),
];

import { Server } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
//import 'whatwg-fetch';
import { makeServer } from '../mock-api/miragejs/server';

describe('MirageJS Server', () => {
  let server: Server<AnyRegistry>;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should handle GET /appointments request', async () => {
    //seeds data into miragejs db for testing environment
    const createdAppointments = server.createList('appointment', 2);
    //console.debug('db : ', server.db.dump());

    const response = await fetch('/api/appointments');
    const appointments = await response.json();

    expect(appointments.length).toBe(2);
    expect(appointments[0]).toHaveProperty('doctor');
    expect(appointments[0]).toHaveProperty('patient');
  });

  it('should handle GET /appointments/:id request', async () => {
    //seeds data into miragejs db for testing environment
    const createdAppointment = server.create('appointment');
    //console.debug('db : ', server.db.dump());


    const response = await fetch(`/api/appointments/${createdAppointment.id}`);

    const appointment = await response.json();

    expect(appointment).not.toBeNull();
    expect(appointment).not.toBeUndefined();
    expect(appointment).toHaveProperty('doctor');
    expect(appointment).toHaveProperty('patient');
  });

  it('should handle GET /appointments/:id request with invalid id and return 404 status code and empty body', async () => {
    const response = await fetch(`/api/appointments/invalid-id`);
    expect(response.status).toBe(404);

    const appointment = await response.json();
    expect(appointment).toEqual({});
  });

  it('should handle DELETE /appointments/:id request', async () => {
    //seeds data into miragejs db for testing environment
    const createdAppointment = server.create('appointment');

    const response = await fetch(`/api/appointments/${createdAppointment.id}`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(204);
    expect(response.body).toBeFalsy();
  });

  it('should handle DELETE /appointments/:id request with invalid id and return 404 status code', async () => {
    const response = await fetch(`/api/appointments/invalid-id`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(404);
    expect(response.body).toBeFalsy();
  });
});

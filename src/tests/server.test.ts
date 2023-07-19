import { Server } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
import { makeServer } from '../mock-api/miragejs/server';
import { Environment } from '../mock-api/miragejs/constants';

describe('MirageJS Server', () => {
  let server: Server<AnyRegistry>;

  beforeEach(() => {
    server = makeServer({ environment: Environment.Test });
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
    expect(server.db.appointments.length).toEqual(2);
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
    expect(server.db.appointments.length).toEqual(1);
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

  it('should handle POST /appointments request', async () => {
    const doctor = server.create('doctor');
    const patient = server.create('patient');

    const newAppointment = {
      doctorId: doctor.id,
      patientId: patient.id,
      dateTime: '2021-09-30T10:00:00.000Z',
      status: 'Scheduled',
    };

    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify(newAppointment),
    });

    expect(response.status).toBe(201);
    expect(response.json()).toBeTruthy();
    expect(server.db.appointments.length).toEqual(1);
  });

  it('should handle POST /appointments request with missing doctorId and return 400 status code', async () => {
    const patient = server.create('patient');

    const newAppointment = {
      patientId: patient.id,
      dateTime: '2021-09-30T10:00:00.000Z',
      status: 'Scheduled',
    };

    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify(newAppointment),
    });
    const error = await response.json();
    expect(response.status).toBe(400);
    expect(server.db.appointments.length).toEqual(0);
    expect(error).toEqual({ error: 'doctorId is required' });
  });

  it('should handle POST /appointments request with invalid doctorId and return 400 status code', async () => {
    const patient = server.create('patient');

    const newAppointment = {
      doctorId: 'invalid-id',
      patientId: patient.id,
      dateTime: '2021-09-30T10:00:00.000Z',
      status: 'Scheduled',
    };

    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify(newAppointment),
    });
    const error = await response.json();

    expect(response.status).toBe(400);
    expect(server.db.appointments.length).toEqual(0);
    expect(error).toEqual({ error: 'doctorId is invalid' });
  });

  it('should handle POST /appointments request with non-existent doctorId and return 404 status code', async () => {
    const patient = server.create('patient');

    const newAppointment = {
      doctorId: 9999,
      patientId: patient.id,
      dateTime: '2021-09-30T10:00:00.000Z',
      status: 'Scheduled',
    };

    const response = await fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify(newAppointment),
    });
    const error = await response.json();

    expect(response.status).toBe(404);
    expect(server.db.appointments.length).toEqual(0);
    expect(error).toEqual({ error: 'doctor not found' });
  });

  it('should handle PUT /appointments/:id request', async () => {
    const createdAppointment = server.create('appointment');

    //appointment to be updated
    const updatedAppointment = {
      id: createdAppointment.id,
      dateTime: '2023-07-19T10:00:00.000Z',
      status: 'Scheduled',
    };

    const response = await fetch(`/api/appointments/${updatedAppointment.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedAppointment),
    });

    expect(response.status).toBe(204);
    const foundAppointment = server.db.appointments.find(updatedAppointment.id);
    expect(updatedAppointment.dateTime).toEqual(foundAppointment.dateTime);
    expect(updatedAppointment.status).toEqual(foundAppointment.status);
  });

  it('should handle POST /doctors request', async () => {
    const newDoctor = {
      specialty: 'Neurology',
      address: '7828 Clyde Ville',
      phone: '(617) 303-8504 x30926',
      username: 'Magdalena30',
      email: 'Rusty84@hotmail.com',
    };

    const response = await fetch(`/api/doctors`, {
      method: 'POST',
      body: JSON.stringify(newDoctor),
    });

    expect(response.status).toBe(201);
    expect(response.json()).toBeTruthy();
    expect(server.db.doctors.length).toEqual(1);
  });
});

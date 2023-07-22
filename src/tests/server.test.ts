import { faker } from '@faker-js/faker';
import { server } from '../mock-api/msw/server';
import 'whatwg-fetch';

// Test suite for MSW Server
describe('MSW Server', () => {
  // Before all tests in the suite
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'error',
    });
    //server.printHandlers();
  });

  // After all tests in the suite
  afterAll(() => {
    server.close();
  });

  // After each test in the suite
  afterEach(() => {
    server.resetHandlers();
    server.cleanDatabase();
  });

  // Test case for non-existent endpoint handler (GET)
  it('should return a 404 error for non-existent endpoint', async () => {
    const response = await fetch('/non-existent-endpoint');
    const data = await response.json();

    expect(response.status).toEqual(404);
    expect(data).toEqual({
      error: 'Request handler for /non-existent-endpoint not found',
    });
  });

  // Test case for /doctors endpoint handler (GET)
  it('should return a list of doctors', async () => {
    // Seed the database
    server.seeds(db => {
      faker.helpers.multiple(() => db.doctor.create(), { count: 10 });
      //db.doctor.createMany(10);
    });

    const response = await fetch('/doctors');
    const doctors = await response.json();

    expect(response.status).toEqual(200);
    expect(doctors.length).toEqual(10);
    expect(server.db.doctor.count()).toEqual(10);
  });

  // Test case for /doctors/:id endpoint handler (GET)
  it('should return a doctor', async () => {
    // Seed the database
    /* server.seeds(db => {
      const newDoctor = db.doctor.create();
    }); */

    const newDoctor = server.db.doctor.create();

    const response = await fetch(`/doctors/${newDoctor.id}`);
    const doctor = await response.json();

    expect(response.status).toEqual(200);
    expect(doctor).not.toBeNull();
    expect(doctor).not.toBeUndefined();
    expect(doctor.id).toEqual(newDoctor.id);
    expect(server.db.doctor.count()).toEqual(1);
  });

  // Test case for /doctors/:id endpoint handler (GET) with invalid id
  it('should return a 404 error for non-existent doctor', async () => {
    const response = await fetch(`/doctors/non-existent`);
    const data = await response.json();

    expect(response.status).toEqual(404);
  });

  // Test case for /doctors endpoint handler (Delete)
  it('should delete a doctor', async () => {
    // Seed the database
    const newDoctor = server.db.doctor.create();

    const response = await fetch(`/doctors/${newDoctor.id}`, {
      method: 'DELETE',
    });

    expect(response.status).toEqual(200);
    expect(server.db.doctor.count()).toEqual(0);
  });

  // Test case for /doctors endpoint handler (POST)
  it('should create a doctor', async () => {
    const newDoctor = {
      specialty: 'Neurology',
      address: '7828 Clyde Ville',
      phone: '(617) 303-8504 x30926',
      username: 'Magdalena30',
      email: 'Rusty84@hotmail.com',
    };

    const response = await fetch(`/doctors`, {
      method: 'POST',
      body: JSON.stringify(newDoctor),
    });

    const doctor = await response.json();

    expect(response.status).toEqual(201);
    expect(doctor).not.toBeNull();
    expect(doctor).not.toBeUndefined();
    expect(doctor.id).not.toBeNull();
    expect(doctor.id).not.toBeUndefined();
    expect(server.db.doctor.count()).toEqual(1);
  });

  //Test case for /patients endpoint handler (GET)
  it('should return a list of patients', async () => {
    // Seed the database
    server.seeds(db => {
      faker.helpers.multiple(() => db.patient.create(), { count: 5 });
    });

    const response = await fetch('/patients');
    const patients = await response.json();

    expect(response.status).toEqual(200);
    expect(patients.length).toEqual(5);
    expect(server.db.patient.count()).toEqual(5);
  });
});

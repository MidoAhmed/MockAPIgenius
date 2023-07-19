import { createServer, Response } from 'miragejs';
import scenarios from './scenarios';
import { Environment, Scenario } from './constants';
import { Appointment, Doctor, Patient, Prescription } from './models';
import { ApplicationSerializer, AppointmentSerializer } from './serializers';
import {
  doctorFactory,
  patientFactory,
  appointmentFactory,
  prescriptionFactory,
} from './factories';

export function makeServer({ environment = Environment.Development } = {}) {
  // Choose one scenario to switch your development state between different scenarios
  const currentScenario = Scenario.Scenario1;

  const server = createServer({
    environment, // default is development
    namespace: 'api',
    models: {
      doctor: Doctor,
      patient: Patient,
      appointment: Appointment,
      prescription: Prescription,
    },
    factories: {
      doctor: doctorFactory,
      patient: patientFactory,
      appointment: appointmentFactory,
      prescription: prescriptionFactory,
    },
    serializers: {
      application: ApplicationSerializer,
      appointment: AppointmentSerializer,
    },

    // seeds are ignored when environment is "test"
    seeds: scenarios[currentScenario],

    routes() {
      //appointments routes
      this.get('/appointments');

      this.get('/appointments/:id');

      this.del('/appointments/:id');

      this.post('/appointments', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        // Check if doctorId is provided
        if (!attrs.doctorId) {
          return new Response(400, {}, { error: 'doctorId is required' });
        }

        // Check if doctorId is invalid
        if (isNaN(attrs.doctorId)) {
          return new Response(400, {}, { error: 'doctorId is invalid' });
        }

        // Find the doctor
        const doctor = schema.find('doctor', attrs.doctorId);

        // Check if doctor record exists
        if (!doctor) {
          return new Response(404, {}, { error: 'doctor not found' });
        }

        return schema.create('appointment', attrs);
      });

      this.put('/appointments/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const appointment = schema.find('appointment', id);

        // Check if appointment record exists
        if (!appointment) {
          return new Response(404, {}, { error: 'appointment not found' });
        }

        appointment.update(attrs);
        return new Response(204);
      });

      //doctors routes
      this.post('/doctors', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('doctor', attrs);
      });

      this.get('/doctors');

      this.get('/doctors/:id');

      this.del('/doctors/:id');

      this.put('/doctors/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const doctor = schema.find('doctor', id);

        // Check if doctor record exists
        if (!doctor) {
          return new Response(404, {}, { error: 'doctor not found' });
        }

        doctor.update(attrs);
        return new Response(204);
      });
    },
  });

  return server;
}

import { belongsTo, createServer, Model, Response } from 'miragejs';
import { doctorFactory } from './factories/doctorFactory';
import { patientFactory } from './factories/patientFactory';
import { appointmentFactory } from './factories/appointmentFactory';
import { prescriptionFactory } from './factories/prescriptionFactory';
import { ApplicationSerializer } from './serializers/applicationSerializer';
import { AppointmentSerializer } from './serializers/appointmentSerializer';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment, // default is development
    namespace: 'api',
    models: {
      doctor: Model,
      patient: Model,
      appointment: Model.extend({
        doctor: belongsTo('doctor'),
        patient: belongsTo('patient'),
      }),
      prescription: Model.extend({
        appointment: belongsTo('appointment'),
      }),
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

    seeds(server) {
      // seeds are ignored when environment is "test"
      server.createList('appointment', 10);
    },

    routes() {
      this.get('/appointments');

      this.get('/appointments/:id');

      this.del('/appointments/:id');

      /* this.get('/appointments/:id', (schema, request) => {
        const id = request.params.id;
        const appointment = schema.find('appointment', id);
        return appointment ? appointment : new Response(404);
      });
    */

      this.post('/appointments', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('appointment', attrs);
      });

      /* this.put('/appointments/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const appointment = schema.find('appointment', id);
        return appointment ? appointment.update(attrs) : new Response(404);
      });
      */
    },
  });

  return server;
}

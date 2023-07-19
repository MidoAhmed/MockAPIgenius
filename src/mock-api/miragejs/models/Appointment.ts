import { Model, belongsTo } from 'miragejs';

export const Appointment = Model.extend({
  doctor: belongsTo('doctor', {
    inverse: 'appointments',
  }),
  patient: belongsTo('patient', {
    inverse: 'appointments',
  }),
});

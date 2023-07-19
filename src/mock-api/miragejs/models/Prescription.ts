import { Model, belongsTo } from 'miragejs';

export const Prescription = Model.extend({
  appointment: belongsTo('appointment'),
});

import { RestSerializer } from 'miragejs';
import { ApplicationSerializer } from './applicationSerializer';

export const AppointmentSerializer = (
  ApplicationSerializer as typeof RestSerializer
).extend({
  include: ['doctor', 'patient'],
  serializeIds: 'always',
});

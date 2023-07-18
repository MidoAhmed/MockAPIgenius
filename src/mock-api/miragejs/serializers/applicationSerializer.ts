import { RestSerializer } from 'miragejs';

export const ApplicationSerializer = RestSerializer.extend({
  root: false,
  embed: true,
});

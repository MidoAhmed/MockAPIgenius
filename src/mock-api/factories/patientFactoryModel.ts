import { primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

// Create a "patient" factory model
export const patient = {
  id: primaryKey(faker.string.uuid),
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  phone: () => faker.phone.number(),
  address: () => faker.location.streetAddress(),
  medicalHistory: () => faker.lorem.paragraph(),
};

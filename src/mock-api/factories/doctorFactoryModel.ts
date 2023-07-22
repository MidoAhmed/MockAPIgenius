import { primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';
import { Specialty } from '../../shared/enums/Specialty';

// Create a "doctor" factory model
export const doctor = {
  id: primaryKey(faker.string.uuid),
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  phone: () => faker.phone.number(),
  address: () => faker.location.streetAddress(),
  specialty: () => faker.helpers.enumValue(Specialty),
};

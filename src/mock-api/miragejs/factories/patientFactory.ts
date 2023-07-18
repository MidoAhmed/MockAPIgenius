import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { Patient } from '../../../models/Patient';

export const patientFactory = Factory.extend<Partial<Patient>>({
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  phone: () => faker.phone.number(),
  address: () => faker.location.streetAddress(),
  medicalHistory: () => faker.lorem.paragraph(),
});

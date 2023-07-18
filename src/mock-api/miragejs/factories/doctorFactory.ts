import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { Specialty } from '../../../shared/enums/Specialty';
import { Doctor } from '../../../models/Doctor';

export const doctorFactory = Factory.extend<Partial<Doctor>>({
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  phone: () => faker.phone.number(),
  address: () => faker.location.streetAddress(),
  specialty: () => faker.helpers.enumValue(Specialty),
});

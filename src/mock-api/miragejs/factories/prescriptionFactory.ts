import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { Prescription } from '../../../models/Prescription';

export const prescriptionFactory = Factory.extend<Partial<Prescription>>({
  //appointmentId: () => {},
  medication: () => faker.lorem.words(5),
  afterCreate(prescription, server) {
    prescription.update({
      appointment: server.create('appointment'),
    });
  },
} as Record<string, unknown>);

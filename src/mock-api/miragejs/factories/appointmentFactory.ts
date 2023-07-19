import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { AppointmentStatus } from '../../../shared/enums/AppointmentStatus';
import { Appointment } from '../../../models/Appointment';

export const appointmentFactory = Factory.extend({
  //patientId: () => {},
  //providerId: () => {},
  dateTime: () => faker.date.future(),
  status: () => faker.helpers.enumValue(AppointmentStatus),
  afterCreate(appointment, server) {
    appointment.update({
      patient: server.create('patient'),
      doctor: server.create('doctor'),
    });
  },
} as Record<string, unknown>);

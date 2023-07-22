import { factory } from '@mswjs/data';
import { doctor } from './doctorFactoryModel';
import { patient } from './patientFactoryModel';

export const db = factory({
  doctor,
  patient,
});

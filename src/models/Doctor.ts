import { Specialty } from '../shared/enums/Specialty';
import { Appointment } from './Appointment';
import { User } from './User';

export class Doctor extends User {
  specialty: Specialty;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    phone: string,
    specialty: Specialty,
  ) {
    super(id, username, password, email, phone);
    this.specialty = specialty;
  }

  viewAppointments(): void {
    // Logic for viewing appointments
  }

  prescribeMedication(appointment: Appointment): void {
    // Logic for prescribing medication
  }
}

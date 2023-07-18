import { Specialty } from '../shared/enums/Specialty';
import { Appointment } from './Appointment';
import { User } from './User';

export class Doctor extends User {
  specialty: Specialty;

  constructor(
    id: number,
    username: string,
    email: string,
    phone: string,
    address: string,
    specialty: Specialty,
  ) {
    super(id, username, email, phone, address);
    this.specialty = specialty;
  }

  viewAppointments(): void {
    // Logic for viewing appointments
  }

  prescribeMedication(appointment: Appointment): void {
    // Logic for prescribing medication
  }
}

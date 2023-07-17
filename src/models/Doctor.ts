import { Appointment } from './Appointment';
import { User } from './User';

export class Doctor extends User {
  specialty: string;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    phone: string,
    specialty: string,
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

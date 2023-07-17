import { Appointment } from './Appointment';
import { User } from './User';

export class Patient extends User {
  medicalHistory: string;

  constructor(
    id: number,
    username: string,
    password: string,
    email: string,
    phone: string,
    medicalHistory: string,
  ) {
    super(id, username, password, email, phone);
    this.medicalHistory = medicalHistory;
  }

  scheduleAppointment(appointment: Appointment): void {
    // Logic for scheduling an appointment
  }

  cancelAppointment(appointment: Appointment): void {
    // Logic for cancelling an appointment
  }

    viewAppointments(): void {
    // Logic for viewing appointments
    }

    
}

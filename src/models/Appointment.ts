import { AppointmentStatus } from '../shared/enums/AppointmentStatus';

export class Appointment {
  id: number;
  doctorId: number;
  providerId: number;
  dateTime: Date;
  status: AppointmentStatus;

  constructor(
    id: number,
    doctorId: number,
    providerId: number,
    dateTime: Date,
    status: AppointmentStatus,
  ) {
    this.id = id;
    this.doctorId = doctorId;
    this.providerId = providerId;
    this.dateTime = dateTime;
    this.status = status;
  }

  cancel(): void {
    // Logic for cancelling an appointment
  }

  reschedule(dateTime: Date): void {
    // Logic for rescheduling an appointment
  }

  confirm(): void {
    // Logic for confirming an appointment
  }

  decline(): void {
    // Logic for declining an appointment
  }

  complete(): void {
    // Logic for completing an appointment
  }

  miss(): void {
    // Logic for missing an appointment
  }

  request(): void {
    // Logic for requesting an appointment
  }

  approve(): void {
    // Logic for approving an appointment
  }

  view(): void {
    // Logic for viewing an appointment
  }

  prescribe(): void {
    // Logic for prescribing medication
  }

  schedule(): void {
    // Logic for scheduling an appointment
  }
}

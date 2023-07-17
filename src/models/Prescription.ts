export class Prescription {
  id: number;
  appointmentId: number;
  medication: string;

  constructor(id: number, appointmentId: number, medication: string) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.medication = medication;
  }
}

export interface Appointment {
  id: number;
  jobId: number;
  appointmentNumber: string;
  start: string;
  end: string;
  arrivalWindowStart: string;
  arrivalWindowEnd: string;
  status: Status;
  specialInstructions: string;
  createdOn: string;
  modifiedOn: string;
  customerId: number;
  unused: boolean;
}
type Status =
  | "Scheduled"
  | "Dispatched"
  | "Working"
  | "Hold"
  | "Done"
  | "Canceled";
export interface AppointmentAssignment {
  id: number;
  technicianId: number;
  technicianName: string;
  assignedById: number;
  assignedOn: string;
  status: string;
  isPaused: boolean;
  jobId: number;
  appointmentId: number;
}

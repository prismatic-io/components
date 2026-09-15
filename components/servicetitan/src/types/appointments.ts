type Status =
  | "Scheduled"
  | "Dispatched"
  | "Working"
  | "Hold"
  | "Done"
  | "Canceled";
export interface Appointment {
  id: number;
  jobId: number;
  appointmentNumber: string | null;
  start: string;
  end: string;
  arrivalWindowStart: string | null;
  arrivalWindowEnd: string | null;
  status: Status;
  specialInstructions: string | null;
  createdOn: string;
  modifiedOn: string;
  customerId: number;
  unused: boolean;
}
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

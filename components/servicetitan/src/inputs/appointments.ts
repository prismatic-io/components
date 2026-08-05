import { input } from "@prismatic-io/spectral";
import {
  cleanNumberInput,
  cleanNumberValueListInput,
  cleanStringInput,
} from "../util";
import {
  connection,
  customQueryParams,
  end,
  fetchAll,
  includeTotal,
  jobId,
  pagination,
  sort,
  start,
  technicianId,
} from "./common";
export const appointmentId = input({
  label: "Appointment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the appointment.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectAppointment",
});
export const jobAppointmentId = input({
  label: "Job Appointment ID",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "ID of the job appointment",
  placeholder: "1234567890",
  clean: cleanNumberInput,
  dataSource: "selectAppointment",
});
const arrivalWindowStart = input({
  label: "Arrival Window Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window start date/time (in UTC) ",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
const arrivalWindowEnd = input({
  label: "Arrival Window End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window end date/time (in UTC) ",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});
const specialInstructions = input({
  label: "Special Instructions",
  type: "text",
  required: false,
  comments: "Special instructions associated to the appointment",
  example: "Any special instructions",
  placeholder: "Any special instructions",
  clean: cleanStringInput,
});
const technicianIds = input({
  label: "Technician IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "List of IDs of technicians to assign to new appointment",
  placeholder: "1088",
  clean: cleanNumberValueListInput,
  dataSource: "selectTechnician",
});
export const createAppointmentInputs = {
  connection,
  jobId,
  start: {
    ...start,
    required: true,
  },
  end: {
    ...end,
    required: true,
  },
  arrivalWindowStart,
  arrivalWindowEnd,
  technicianId,
  specialInstructions,
};
export const deleteAppointmentInputs = {
  connection,
  appointmentId,
};
export const getAppointmentInputs = {
  connection,
  appointmentId,
};
export const listAppointmentsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const assignTechniciansInputs = {
  connection,
  jobAppointmentId,
  technicianIds: {
    ...technicianIds,
    required: true,
    comments: "Assign these technicians to the appointment.",
  },
};
export const unassignTechniciansInputs = {
  connection,
  jobAppointmentId,
  technicianIds: {
    ...technicianIds,
    required: true,
    comments: "Unassign these technicians to the appointment.",
  },
};
export const listAppointmentsAssignmentInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};

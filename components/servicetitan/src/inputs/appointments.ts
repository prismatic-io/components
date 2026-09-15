import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
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
const appointmentId = input({
  label: "Appointment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the appointment.",
  placeholder: "Enter an appointment ID",
  clean: util.types.toString,
  dataSource: "selectAppointment",
});
const arrivalWindowStart = input({
  label: "Arrival Window Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window start date/time (in UTC)",
  placeholder: "Enter the arrival window start date and time in UTC",
  clean: cleanStringInput,
});
const arrivalWindowEnd = input({
  label: "Arrival Window End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window end date/time (in UTC)",
  placeholder: "Enter the arrival window end date and time in UTC",
  clean: cleanStringInput,
});
const specialInstructions = input({
  label: "Special Instructions",
  type: "text",
  required: false,
  comments: "Special instructions associated to the appointment",
  example: "Any special instructions",
  placeholder: "Enter special instructions",
  clean: cleanStringInput,
});
export const createAppointmentInputs = {
  connection,
  jobId,
  start: {
    ...start,
    required: true,
    clean: util.types.toString,
  },
  end: {
    ...end,
    required: true,
    clean: util.types.toString,
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

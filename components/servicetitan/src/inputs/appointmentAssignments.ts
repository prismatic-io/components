import { input, util } from "@prismatic-io/spectral";
import { cleanNumberValueListInput } from "../util";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  pagination,
  sort,
} from "./common";
const jobAppointmentId = input({
  label: "Job Appointment ID",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "ID of the job appointment",
  placeholder: "Enter a job appointment ID",
  clean: util.types.toNumber,
  dataSource: "selectAppointment",
});
const technicianIds = input({
  label: "Technician IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "List of IDs of technicians to assign to new appointment",
  placeholder: "Enter a technician ID",
  clean: cleanNumberValueListInput,
  dataSource: "selectTechnician",
});
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
    comments: "Unassign these technicians from the appointment.",
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

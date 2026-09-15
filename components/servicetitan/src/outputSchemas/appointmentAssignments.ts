import { listEnvelope } from "./shared";
const appointmentAssignmentSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    technicianId: {
      type: "integer",
      format: "int64",
    },
    technicianName: {
      type: "string",
    },
    assignedById: {
      type: "integer",
      format: "int64",
    },
    assignedOn: {
      type: "string",
      format: "date-time",
    },
    status: {
      type: "string",
      enum: ["Scheduled", "Dispatched", "Working", "Done"],
    },
    isPaused: {
      type: "boolean",
    },
    jobId: {
      type: "integer",
      format: "int64",
    },
    appointmentId: {
      type: "integer",
      format: "int64",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    active: {
      type: "boolean",
    },
  },
  required: [
    "id",
    "technicianId",
    "technicianName",
    "assignedById",
    "assignedOn",
    "status",
    "isPaused",
    "jobId",
    "appointmentId",
    "createdOn",
    "modifiedOn",
    "active",
  ],
};
const appointmentSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    jobId: {
      type: "integer",
      format: "int64",
    },
    appointmentNumber: {
      type: ["string", "null"],
    },
    start: {
      type: "string",
      format: "date-time",
    },
    end: {
      type: "string",
      format: "date-time",
    },
    arrivalWindowStart: {
      type: ["string", "null"],
      format: "date-time",
    },
    arrivalWindowEnd: {
      type: ["string", "null"],
      format: "date-time",
    },
    status: {
      type: "string",
      enum: ["Scheduled", "Dispatched", "Working", "Hold", "Done", "Canceled"],
    },
    specialInstructions: {
      type: ["string", "null"],
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
  },
  required: [
    "id",
    "jobId",
    "start",
    "end",
    "status",
    "createdOn",
    "modifiedOn",
  ],
};
export const listAppointmentsAssignmentOutputSchema = listEnvelope(
  appointmentAssignmentSchema,
);
export const assignTechniciansOutputSchema = appointmentSchema;
export const unassignTechniciansOutputSchema = appointmentSchema;

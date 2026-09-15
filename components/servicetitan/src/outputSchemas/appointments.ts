import { listEnvelope } from "./shared";
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
      format: "multiline",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    unused: {
      type: "boolean",
    },
    createdById: {
      type: "integer",
      format: "int64",
    },
    isConfirmed: {
      type: "boolean",
    },
    active: {
      type: "boolean",
    },
    appointmentSummaries: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          createdOn: {
            type: "string",
            format: "date-time",
          },
          jobAppointmentId: {
            type: "integer",
            format: "int64",
          },
          jobId: {
            type: "integer",
            format: "int64",
          },
          modifiedOn: {
            type: "string",
            format: "date-time",
          },
          notes: {
            type: "string",
            format: "multiline",
          },
          technicianId: {
            type: "integer",
            format: "int64",
          },
        },
        required: [
          "createdOn",
          "jobAppointmentId",
          "jobId",
          "modifiedOn",
          "notes",
          "technicianId",
        ],
      },
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
    "customerId",
    "unused",
    "createdById",
    "isConfirmed",
    "active",
  ],
};
export const createAppointmentOutputSchema = appointmentSchema;
export const getAppointmentOutputSchema = appointmentSchema;
export const listAppointmentsOutputSchema = listEnvelope(appointmentSchema);

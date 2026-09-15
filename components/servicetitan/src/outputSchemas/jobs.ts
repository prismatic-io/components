import { listEnvelope } from "./shared";
const jobSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    jobNumber: {
      type: "string",
    },
    projectId: {
      type: ["integer", "null"],
      format: "int64",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    locationId: {
      type: "integer",
      format: "int64",
    },
    jobStatus: {
      type: "string",
    },
    completedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    businessUnitId: {
      type: "integer",
      format: "int64",
    },
    jobTypeId: {
      type: "integer",
      format: "int64",
    },
    priority: {
      type: "string",
    },
    campaignId: {
      type: "integer",
      format: "int64",
    },
    appointmentCount: {
      type: "integer",
      format: "int64",
    },
    firstAppointmentId: {
      type: "integer",
      format: "int64",
    },
    lastAppointmentId: {
      type: "integer",
      format: "int64",
    },
    recallForId: {
      type: ["integer", "null"],
      format: "int64",
    },
    warrantyId: {
      type: ["integer", "null"],
      format: "int64",
    },
    jobGeneratedLeadSource: {
      type: ["object", "null"],
      properties: {
        jobId: {
          type: ["integer", "null"],
          format: "int64",
        },
        employeeId: {
          type: ["integer", "null"],
          format: "int64",
        },
      },
    },
    noCharge: {
      type: "boolean",
    },
    notificationsEnabled: {
      type: "boolean",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    createdById: {
      type: "integer",
      format: "int64",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    tagTypeIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    leadCallId: {
      type: ["integer", "null"],
      format: "int64",
    },
    partnerLeadCallId: {
      type: ["integer", "null"],
      format: "int64",
    },
    bookingId: {
      type: ["integer", "null"],
      format: "int64",
    },
    soldById: {
      type: ["integer", "null"],
      format: "int64",
    },
    customerPo: {
      type: "string",
    },
    invoiceId: {
      type: "integer",
      format: "int64",
    },
    membershipId: {
      type: ["integer", "null"],
      format: "int64",
    },
    total: {
      type: ["number", "null"],
      format: "decimal",
    },
    createdFromEstimateId: {
      type: ["integer", "null"],
      format: "int64",
    },
    estimateIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    equipmentIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    isAutoDispatched: {
      type: ["boolean", "null"],
    },
    summary: {
      type: ["string", "null"],
      format: "html",
    },
    customFields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          typeId: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
        required: ["typeId", "name", "value"],
      },
    },
    externalData: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          key: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
        required: ["key", "value"],
      },
    },
    summaryOfWork: {
      type: ["string", "null"],
    },
  },
  required: [
    "jobNumber",
    "jobStatus",
    "priority",
    "tagTypeIds",
    "customerPo",
    "estimateIds",
    "id",
    "customerId",
    "locationId",
    "businessUnitId",
    "jobTypeId",
    "campaignId",
    "appointmentCount",
    "firstAppointmentId",
    "lastAppointmentId",
    "noCharge",
    "notificationsEnabled",
    "createdOn",
    "createdById",
    "modifiedOn",
    "invoiceId",
    "equipmentIds",
    "customFields",
    "externalData",
  ],
};
const jobCancelReasonSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    name: {
      type: "string",
    },
    active: {
      type: "boolean",
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
  required: ["id", "name", "active", "createdOn", "modifiedOn"],
};
export const createJobOutputSchema = jobSchema;
export const getJobOutputSchema = jobSchema;
export const updateJobOutputSchema = jobSchema;
export const listJobsOutputSchema = listEnvelope(jobSchema);
export const listJobCancelReasonsOutputSchema = listEnvelope(
  jobCancelReasonSchema,
);

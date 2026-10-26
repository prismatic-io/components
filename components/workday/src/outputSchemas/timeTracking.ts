import {
  idDescriptorReferenceSchema,
  instanceReferenceSchema,
  workerDataSchema,
} from "./shared";
export const calculatedTimeDetailsSchema = {
  type: "object" as const,
  properties: {
    overrideRate: {
      type: "number",
    },
    shiftDate: {
      type: "string",
      format: "date",
    },
    calculatedQuantity: {
      type: "number",
    },
    currency: instanceReferenceSchema,
    calculatedDate: {
      type: "string",
      format: "date",
    },
    calculationTags: {
      type: "array",
      items: idDescriptorReferenceSchema,
    },
    calendarDate: {
      type: "string",
      format: "date",
    },
    id: {
      type: "string",
    },
  },
};
export const timeBlockViewSchema = {
  type: "object" as const,
  properties: {
    customWorktag07: instanceReferenceSchema,
    customWorktag01: instanceReferenceSchema,
    customWorktag13: instanceReferenceSchema,
    customWorktag15: instanceReferenceSchema,
    customWorktag08: instanceReferenceSchema,
    customWorktag14: instanceReferenceSchema,
    customWorktag02: instanceReferenceSchema,
    customWorktag04: instanceReferenceSchema,
    customWorktag09: instanceReferenceSchema,
    customWorktag06: instanceReferenceSchema,
    customWorktag05: instanceReferenceSchema,
    customWorktag03: instanceReferenceSchema,
    customWorktag10: instanceReferenceSchema,
    customWorktag11: instanceReferenceSchema,
    customWorktag12: instanceReferenceSchema,
    calculatedTimeDetails: {
      type: "array",
      items: calculatedTimeDetailsSchema,
    },
    customOrganization10: instanceReferenceSchema,
    appropriation: instanceReferenceSchema,
    customOrganization06: instanceReferenceSchema,
    customOrganization02: instanceReferenceSchema,
    allocationPool: instanceReferenceSchema,
    customOrganization03: instanceReferenceSchema,
    customOrganization04: instanceReferenceSchema,
    customOrganization05: instanceReferenceSchema,
    customOrganization01: instanceReferenceSchema,
    customOrganization07: instanceReferenceSchema,
    customOrganization08: instanceReferenceSchema,
    customOrganization09: instanceReferenceSchema,
    program: instanceReferenceSchema,
    jobProfile: instanceReferenceSchema,
    costCenter: instanceReferenceSchema,
    location: instanceReferenceSchema,
    grant: instanceReferenceSchema,
    businessUnit: instanceReferenceSchema,
    position: instanceReferenceSchema,
    region: instanceReferenceSchema,
    reportedQuantity: {
      type: "number",
    },
    fund: instanceReferenceSchema,
    gift: instanceReferenceSchema,
    status: instanceReferenceSchema,
    comment: {
      type: "string",
    },
    unit: instanceReferenceSchema,
    worker: instanceReferenceSchema,
    calendarDate: {
      type: "string",
      format: "date",
    },
    timeEntryCode: instanceReferenceSchema,
    projectRole: instanceReferenceSchema,
    overrideRate: {
      type: "number",
    },
    projectPlanPhase: instanceReferenceSchema,
    outReason: instanceReferenceSchema,
    project: instanceReferenceSchema,
    doNotBill: {
      type: "boolean",
    },
    projectPlanTask: instanceReferenceSchema,
    currency: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
export const workerTimeAttestationsSchema = {
  type: "object" as const,
  properties: {
    order: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
export const timeClockEventViewSchema = {
  type: "object" as const,
  properties: {
    reference_ID: {
      type: "string",
    },
    timeEntryCode: instanceReferenceSchema,
    projectPlanTask: instanceReferenceSchema,
    project: instanceReferenceSchema,
    customWorktag08: instanceReferenceSchema,
    customWorktag14: instanceReferenceSchema,
    customWorktag04: instanceReferenceSchema,
    customWorktag12: instanceReferenceSchema,
    customWorktag13: instanceReferenceSchema,
    customWorktag09: instanceReferenceSchema,
    customWorktag15: instanceReferenceSchema,
    customWorktag01: instanceReferenceSchema,
    customWorktag07: instanceReferenceSchema,
    customWorktag02: instanceReferenceSchema,
    customWorktag05: instanceReferenceSchema,
    customWorktag11: instanceReferenceSchema,
    customWorktag06: instanceReferenceSchema,
    customWorktag03: instanceReferenceSchema,
    customWorktag10: instanceReferenceSchema,
    allocationPool: instanceReferenceSchema,
    appropriation: instanceReferenceSchema,
    fund: instanceReferenceSchema,
    overrideRate: {
      type: "number",
    },
    position: instanceReferenceSchema,
    eventType: instanceReferenceSchema,
    region: instanceReferenceSchema,
    customOrganization07: instanceReferenceSchema,
    customOrganization02: instanceReferenceSchema,
    customOrganization09: instanceReferenceSchema,
    customOrganization10: instanceReferenceSchema,
    jobProfile: instanceReferenceSchema,
    location: instanceReferenceSchema,
    customOrganization08: instanceReferenceSchema,
    customOrganization06: instanceReferenceSchema,
    grant: instanceReferenceSchema,
    gift: instanceReferenceSchema,
    customOrganization03: instanceReferenceSchema,
    program: instanceReferenceSchema,
    customOrganization01: instanceReferenceSchema,
    customOrganization04: instanceReferenceSchema,
    customOrganization05: instanceReferenceSchema,
    currency: instanceReferenceSchema,
    comment: {
      type: "string",
    },
    businessUnit: instanceReferenceSchema,
    costCenter: instanceReferenceSchema,
    worker: instanceReferenceSchema,
    workerTimeAttestations: {
      type: "array",
      items: workerTimeAttestationsSchema,
    },
    descriptor: {
      type: "string",
    },
    href: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
export const getTimeClockEventsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: timeClockEventViewSchema,
    },
  },
  items: timeClockEventViewSchema,
  required: [],
  additionalProperties: true,
};
export const getTimeClockEventsByIdOutputSchema = timeClockEventViewSchema;
export const getWorkerByIdOutputSchema = workerDataSchema;
export const getWorkersOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: workerDataSchema,
    },
  },
  items: workerDataSchema,
  required: [],
  additionalProperties: true,
};
export const postWorkerTimeBlockOutputSchema = timeBlockViewSchema;
export const updateTimeClockEventsByIdOutputSchema = timeClockEventViewSchema;
export const updateWorkerTimeBlockOutputSchema = timeBlockViewSchema;

import { instanceReferenceSchema, workerDataSchema } from "./shared";

export const skillSourcesSchema = {
  type: "object" as const,
  properties: {
    dateCreated: {
      type: "string",
      format: "date",
    },
    sourceTypeID: {
      type: "string",
    },
    sourceType: {
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

export const displayExplicitSkillRepresentationSchema = {
  type: "object" as const,
  properties: {
    skillSources: {
      type: "array",
      items: skillSourcesSchema,
    },
    skillItem: instanceReferenceSchema,
    remoteID: {
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

export const serviceDatesDataSchema = {
  type: "object" as const,
  properties: {
    hireDate: {
      type: "string",
      format: "date",
    },
    continuousServiceDate: {
      type: "string",
      format: "date",
    },
  },
};

export const getStaffingWorkerByIdOutputSchema = workerDataSchema;

export const getStaffingWorkersOutputSchema = {
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

export const getWorkerExplicitSkillsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: displayExplicitSkillRepresentationSchema,
    },
  },
  items: displayExplicitSkillRepresentationSchema,
  required: [],
  additionalProperties: true,
};

export const getWorkerServiceDatesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: serviceDatesDataSchema,
    },
  },
  items: serviceDatesDataSchema,
  required: [],
  additionalProperties: true,
};

export const initiateJobChangeOutputSchema = {
  type: "object" as const,
  properties: {
    job: instanceReferenceSchema,
    date: {
      type: "string",
      format: "date",
    },
    supervisoryOrganization: instanceReferenceSchema,
    location: instanceReferenceSchema,
    reason: instanceReferenceSchema,
    template: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  required: ["date"],
};

export const initiateOrganizationAssignmentChangeOutputSchema = {
  type: "object" as const,
  properties: {
    date: {
      type: "string",
      format: "date",
    },
    position: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  required: ["date"],
};

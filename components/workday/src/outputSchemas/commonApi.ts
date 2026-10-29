import {
  instanceReferenceSchema,
  instanceSummaryReferenceSchema,
} from "./shared";

export const businessTitleChangeDetailSchema = {
  type: "object" as const,
  properties: {
    subject: instanceReferenceSchema,
    currentBusinessTitle: {
      type: "string",
    },
    proposedBusinessTitle: {
      type: "string",
    },
    due: {
      type: "string",
      format: "date",
    },
    effective: {
      type: "string",
      format: "date",
    },
    initiator: instanceReferenceSchema,
    initiated: {
      type: "string",
      format: "date",
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

export const getCustomerByIdOutputSchema = {
  type: "object" as const,
  properties: {
    name: {
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

export const getOrganizationByIdOutputSchema = instanceSummaryReferenceSchema;

export const getWorkerBusinessTitleChangesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: businessTitleChangeDetailSchema,
    },
  },
  items: businessTitleChangeDetailSchema,
  required: [],
  additionalProperties: true,
};

export const listOrganizationsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: instanceSummaryReferenceSchema,
    },
  },
  items: instanceSummaryReferenceSchema,
  required: [],
  additionalProperties: true,
};

export const postJobChangesOutputSchema = {
  type: "object" as const,
  properties: {
    moveManagersTeam: {
      type: "boolean",
    },
    jobChangeReason: instanceReferenceSchema,
    proposedOrganizations: {
      type: "array",
      items: instanceSummaryReferenceSchema,
    },
    effective: {
      type: "string",
      format: "date",
    },
    supervisoryOrganization: instanceReferenceSchema,
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

export const postWorkerBusinessTitleChangeOutputSchema = {
  type: "object" as const,
  properties: {
    proposedBusinessTitle: {
      type: "string",
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

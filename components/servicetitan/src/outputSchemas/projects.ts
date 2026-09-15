import { listEnvelope } from "./shared";
const projectSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    number: {
      type: "string",
    },
    name: {
      type: ["string", "null"],
    },
    summary: {
      type: ["string", "null"],
      format: "html",
    },
    status: {
      type: ["string", "null"],
    },
    statusId: {
      type: ["integer", "null"],
      format: "int64",
    },
    subStatus: {
      type: ["string", "null"],
    },
    subStatusId: {
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
    projectTypeId: {
      type: ["integer", "null"],
      format: "int64",
    },
    projectManagerIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    businessUnitIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    startDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    targetCompletionDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    actualCompletionDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    contractStartDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    modifiedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    createdOn: {
      type: "string",
      format: "date-time",
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
    jobIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
  },
  required: [
    "id",
    "number",
    "customerId",
    "locationId",
    "projectManagerIds",
    "businessUnitIds",
    "createdOn",
    "customFields",
    "externalData",
    "jobIds",
  ],
};
export const createProjectOutputSchema = projectSchema;
export const getProjectOutputSchema = projectSchema;
export const updateProjectOutputSchema = projectSchema;
export const listProjectsOutputSchema = listEnvelope(projectSchema);

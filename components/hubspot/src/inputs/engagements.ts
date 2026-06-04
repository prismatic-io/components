import { input, util } from "@prismatic-io/spectral";
import { ENGAGEMENT_OBJECTS } from "../constants/engagementObjects";
import { ENGAGEMENT_PROPERTIES } from "../constants/engagementProperties";
import { valueListInputClean } from "../util";

export const engagementObject = input({
  label: "Engagement Object",
  type: "string",
  model: ENGAGEMENT_OBJECTS,
  required: true,
  comments: "Select an engagement object.",
  clean: util.types.toString,
});

export const propertiesToReturn = input({
  label: "Properties To Return",
  type: "string",
  collection: "valuelist",
  required: false,
  model: ENGAGEMENT_PROPERTIES,
  comments:
    "Properties to be returned in the response. If the specified property is not present on the requested object, it will be ignored.",
  clean: valueListInputClean,
});

export const engagementId = input({
  label: "Engagement ID",
  type: "string",
  required: true,
  placeholder: "Enter Engagement ID",
  comments: "The unique identifier of the engagement. A taskId, meetingId, etc.",
  example: "123456",
  dataSource: "selectEngagement",
  clean: util.types.toString,
});

export const associationsJson = input({
  label: "Associations",
  type: "code",
  language: "json",
  required: true,
  comments: "To create and associate a task with existing records.",
  example: JSON.stringify(
    [
      {
        to: {
          id: 101,
        },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 204,
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const batchInputs = input({
  label: "Batch Engagements",
  type: "code",
  language: "json",
  required: true,
  comments: "An array of engagements.",
  clean: util.types.toObject,
  example: JSON.stringify([]),
});

export const engagementIds = input({
  label: "Engagement Ids",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of engagement IDs.",
  dataSource: "selectEngagement",
  clean: valueListInputClean,
});

export const associations = input({
  label: "Associations",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "List of object types to retrieve associated IDs for. If the specified association do not exist, it will be ignored.",
  example: "contact",
  clean: valueListInputClean,
});

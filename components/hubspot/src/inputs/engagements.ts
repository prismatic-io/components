import { input, util } from "@prismatic-io/spectral";
import { ENGAGEMENT_OBJECTS, ENGAGEMENT_PROPERTIES } from "../constants";
import { valueListInputClean } from "../util";
import {
  archived,
  connectionInput,
  idProperty,
  properties,
  timeout,
} from "./common";
const engagementObject = input({
  label: "Engagement Object",
  type: "string",
  model: ENGAGEMENT_OBJECTS,
  required: true,
  comments: "Select an engagement object.",
  clean: util.types.toString,
});
const propertiesToReturn = input({
  label: "Properties To Return",
  type: "string",
  collection: "valuelist",
  required: false,
  model: ENGAGEMENT_PROPERTIES,
  comments:
    "Properties to be returned in the response. If the specified property is not present on the requested object, it will be ignored.",
  clean: valueListInputClean,
});
const engagementId = input({
  label: "Engagement ID",
  type: "string",
  required: true,
  placeholder: "Enter Engagement ID",
  comments:
    "The unique identifier of the engagement. A taskId, meetingId, etc.",
  example: "123456",
  dataSource: "selectEngagement",
  clean: util.types.toString,
});
const associationsJson = input({
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
const engagementIds = input({
  label: "Engagement Ids",
  type: "string",
  collection: "valuelist",
  required: true,
  comments: "A list of engagement IDs.",
  dataSource: "selectEngagement",
  clean: valueListInputClean,
});
const associations = input({
  label: "Associations",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "List of object types to retrieve associated IDs for. If the specified association do not exist, it will be ignored.",
  example: "contact",
  clean: valueListInputClean,
});
export const createEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  associationsJson,
  properties: {
    ...properties,
    comments:
      "A properties object, attributes depend on the engagement type. For possible properties for each engagement type refer to [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks).",
    example: JSON.stringify(
      {
        hs_timestamp: "2019-10-30T03:30:17.883Z",
        hs_task_body: "Send Proposal",
        hubspot_owner_id: "64492917",
        hs_task_subject: "Follow-up for Brian Buyer",
        hs_task_status: "WAITING",
        hs_task_priority: "HIGH",
        hs_task_type: "CALL",
      },
      null,
      2,
    ),
  },
  timeout,
};
export const updateEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  engagementId,
  properties: {
    ...properties,
    comments:
      "A properties object to update, attributes depend on the engagement type. For possible properties for each engagement type refer to [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks).",
    example: JSON.stringify(
      {
        property_date: "1572480000000",
        property_radio: "option_1",
        property_number: "17",
        property_string: "value",
        property_checkbox: "false",
        property_dropdown: "choice_b",
        property_multiple_checkboxes: "chocolate;strawberry",
      },
      null,
      2,
    ),
  },
  idProperty,
  timeout,
};
export const getEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  engagementId,
  propertiesToReturn,
  propertiesWithHistoryToReturn: {
    ...propertiesToReturn,
    label: "Property With History To Return",
    comments:
      "A property to be returned along with it's history of previous values. If the specified property is not present on the requested object, it will be ignored.",
  },
  associations,
  archived,
  idProperty,
  timeout,
};
export const deleteEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  engagementId,
  timeout,
};
export const listEngagementsInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  propertiesToReturn,
  timeout,
};
export const createBatchEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  batchInputs,
  timeout,
};
export const updateBatchEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  batchInputs: {
    ...batchInputs,
    comments:
      "An array of engagement objects to update. Each engagement object must contain the required properties for the specified engagement type. See [HubSpot Engagements API](https://developers.hubspot.com/docs/api/crm/tasks) for more information.",
    example: JSON.stringify(
      [
        {
          id: "string",
          properties: {
            hs_task_body: "Send Proposal",
            hs_timestamp: "2019-10-30T03:30:17.883Z",
            hs_task_status: "WAITING",
            hs_task_subject: "Follow-up for Brian Buyer",
            hs_task_priority: "HIGH",
            hubspot_owner_id: "64492917",
          },
        },
      ],
      null,
      2,
    ),
  },
  timeout,
};
export const archiveBatchEngagementInputs = {
  hubspotConnection: connectionInput,
  engagementObject,
  engagementIds,
  timeout,
};

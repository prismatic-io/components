import { input, util } from "@prismatic-io/spectral";
import { toObjectTypeKey } from "../util";
import { connectionInput, timeout } from "./common";
export const fromObjectType = input({
  label: "From Object Type",
  type: "string",
  required: true,
  placeholder: "Enter from object type",
  comments:
    'The type of the "from" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object defined in the account.',
  example: "0-1",
  clean: toObjectTypeKey,
  dataSource: "selectObjectType",
});
export const toObjectType = input({
  label: "To Object Type",
  type: "string",
  required: true,
  placeholder: "Enter to object type",
  comments:
    'The type of the "to" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object defined in the account.',
  example: "0-3",
  clean: toObjectTypeKey,
  dataSource: "selectObjectType",
});
const fromId = input({
  label: "From ID",
  type: "string",
  required: true,
  placeholder: "Enter From ID",
  comments: "The unique identifier of the first object",
  example: "890435",
  clean: util.types.toString,
});
const toId = input({
  label: "To ID",
  type: "string",
  required: true,
  placeholder: "Enter To ID",
  comments: "The unique identifier of the second object",
  example: "890435",
  clean: util.types.toString,
});
const associateType = input({
  label: "Type Of Association",
  type: "string",
  required: true,
  placeholder: "Enter type of association",
  comments:
    'The association type to apply between the two records: a numeric association type ID or an association label. The available values for the object pair are returned by the "List Association Types" action. Legacy type names such as contact_to_company are not accepted.',
  example: "4",
  clean: util.types.toString,
  dataSource: "selectAssociationType",
});
export const listAssociationTypesInputs = {
  hubspotConnection: connectionInput,
  fromObjectType,
  toObjectType,
  timeout,
};
export const createAssociationsInputs = {
  fromObjectType,
  toObjectType,
  fromId,
  toId,
  associateType,
  timeout,
  hubspotConnection: connectionInput,
};
export const readAssociationsInputs = {
  fromObjectType,
  toObjectType,
  fromId,
  timeout,
  hubspotConnection: connectionInput,
};
export const archiveAssociationsInputs = {
  fromObjectType,
  toObjectType,
  fromId,
  toId,
  associateType,
  timeout,
  hubspotConnection: connectionInput,
};

import { input, util } from "@prismatic-io/spectral";
import { connectionInput, timeout } from "./common";
const fromObjectType = input({
  label: "From Object Type",
  type: "string",
  required: true,
  placeholder: "Enter from object type",
  comments:
    'The type of the "from" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object defined in the account.',
  example: "contact",
  clean: util.types.toString,
});
const toObjectType = input({
  label: "To Object Type",
  type: "string",
  required: true,
  placeholder: "Enter to object type",
  comments:
    'The type of the "to" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object defined in the account.',
  example: "deal",
  clean: util.types.toString,
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
    'Provide a value for the type of association to perform. You can get the set of available values for this input by making a step using the "List Association Types"',
  example: "890435",
  clean: util.types.toString,
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

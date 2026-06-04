import { input } from "@prismatic-io/spectral";

export const fromObjectType = input({
  label: "From Object Type",
  type: "string",
  required: true,
  comments:
    'The type of the "from" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object you have defined.',
  example: "contact",
});

export const toObjectType = input({
  label: "To Object Type",
  type: "string",
  required: true,
  comments:
    'The type of the "to" object. Choose from "Contacts", "Companies", "Deals", "Tickets", "Calls", "Quotes", "Line_items", "Meetings", "Products", "Feedback_submissions", or a custom object you have defined.',
  example: "deal",
});

export const fromId = input({
  label: "From ID",
  type: "string",
  required: true,
  placeholder: "Enter From ID",
  comments: "The unique identifier of the first object",
  example: "890435",
});

export const toId = input({
  label: "To ID",
  type: "string",
  required: true,
  placeholder: "Enter To ID",
  comments: "The unique identifier of the second object",
  example: "890435",
});

export const associateType = input({
  label: "Type Of Association",
  type: "string",
  required: true,
  comments:
    'Provide a value for the type of association to perform. You can get the set of available values for this input by making a step using the "List Association Types"',
  example: "890435",
});

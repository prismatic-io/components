import { input, util } from "@prismatic-io/spectral";
import { WEBHOOK_EVENTS } from "../constants";
import { cleanStringValueListInput } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Contentful connection to use.",
});

export const spaceId = input({
  label: "Space ID",
  type: "string",
  comments: "The unique identifier for the Contentful space.",
  example: "yadj1kx9rmg0",
  placeholder: "Enter space ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectSpace",
});

export const environmentId = input({
  label: "Environment ID",
  type: "string",
  comments: "The unique identifier for the Contentful environment.",
  example: "staging",
  placeholder: "Enter environment ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectEnvironment",
});

export const dataSourceReturn = input({
  label: "Data Source Return",
  type: "string",
  required: true,
  model: [
    { label: "Name", value: "name" },
    { label: "ID", value: "id" },
  ],
  comments: "The field to return from the data source selection (name or ID).",
  default: "id",
  clean: util.types.toString,
});

export const organizationId = input({
  label: "Organization ID",
  type: "string",
  comments: "The unique identifier for the organization.",
  example: "1Qz7ThNuABCytfP4oqkF12",
  placeholder: "Enter organization ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectOrganization",
});

export const contentTypeId = input({
  label: "Content Type ID",
  type: "string",
  comments: "The unique identifier for the content type.",
  example: "2PqfXUJwE8qSYKuM0U6w8M",
  placeholder: "Enter content type ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectContentType",
});

export const webhookTopics = input({
  label: "Events",
  type: "string",
  collection: "valuelist",
  comments: "The event types to subscribe to for this webhook.",
  model: WEBHOOK_EVENTS,
  example: "Entry.create",
  placeholder: "Select events",
  required: true,
  clean: cleanStringValueListInput,
});

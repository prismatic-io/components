import { input, util } from "@prismatic-io/spectral";
import { toOptionalBoolean, toOptionalString } from "../util";
import {
  connectionInput,
  fetchAllInput,
  nameInput,
  pagination,
} from "./common";
const integrationGuidInput = input({
  label: "Integration GUID",
  type: "string",
  required: true,
  placeholder: "Enter integration GUID",
  comments: "The GUID of the outbound integration.",
  example: "IN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const eventGuidInput = input({
  label: "Event GUID",
  type: "string",
  required: true,
  placeholder: "Enter event GUID",
  comments: "The GUID of the integration event.",
  example: "IN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const eventItemGuidInput = input({
  label: "Event Item GUID",
  type: "string",
  required: true,
  placeholder: "Enter event item GUID",
  comments: "The GUID of the item in the integration event.",
  example: "IN1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const reconciledInput = input({
  label: "Reconciled",
  type: "boolean",
  required: true,
  comments: "When true, the event item is reconciled.",
  clean: util.types.toBool,
});
const nameFilterInput = input({
  label: "Name Filter",
  type: "string",
  required: false,
  placeholder: "Enter name to filter",
  comments: "Filter integrations by name.",
  clean: toOptionalString,
});
const enabledFilterInput = input({
  label: "Enabled Filter",
  type: "boolean",
  required: false,
  comments: "When true, only integrations that are enabled are returned.",
  clean: util.types.toBool,
});
const itemsReconciledFilterInput = input({
  label: "Items Reconciled Filter",
  type: "string",
  required: false,
  model: [
    { label: "Any", value: "any" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  comments: "Filter events by whether their items have been reconciled.",
  clean: toOptionalBoolean,
});
const creationDateTimeFromInput = input({
  label: "Creation Date From",
  type: "string",
  required: false,
  placeholder: "Enter creation date from",
  comments: "Filter by creation date from (ISO format).",
  example: "2023-01-01T00:00:00Z",
  clean: toOptionalString,
});
const creationDateTimeToInput = input({
  label: "Creation Date To",
  type: "string",
  required: false,
  placeholder: "Enter creation date to",
  comments: "Filter by creation date to (ISO format).",
  example: "2023-12-31T23:59:59Z",
  clean: toOptionalString,
});
const reconciledFilterInput = input({
  label: "Reconciled Filter",
  type: "string",
  required: false,
  model: [
    { label: "Any", value: "any" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  comments: "Filter by reconciliation status.",
  clean: toOptionalBoolean,
});
const reconciledDateTimeFromInput = input({
  label: "Reconciled Date From",
  type: "string",
  required: false,
  placeholder: "Enter reconciled date from",
  comments: "Filter by reconciled date from (ISO format).",
  example: "2023-01-01T00:00:00Z",
  clean: toOptionalString,
});
const reconciledDateTimeToInput = input({
  label: "Reconciled Date To",
  type: "string",
  required: false,
  placeholder: "Enter reconciled date to",
  comments: "Filter by reconciled date to (ISO format).",
  example: "2023-12-31T23:59:59Z",
  clean: toOptionalString,
});
const outboundEventIntegrationGuidInput = input({
  label: "Integration GUID",
  type: "string",
  required: true,
  placeholder: "Enter integration GUID",
  comments: "The GUID of the outbound event integration.",
  example: "IG4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const outboundEventGuidInput = input({
  label: "Event GUID",
  type: "string",
  required: true,
  placeholder: "Enter event GUID",
  comments: "The GUID of the specific event.",
  example: "IG4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const resourcesReconciledFilterInput = input({
  label: "Resources Reconciled Filter",
  type: "string",
  required: false,
  model: [
    { label: "Any", value: "any" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  comments: "Filter by reconciliation status of resources.",
  clean: toOptionalBoolean,
});
const orderInput = input({
  label: "Order",
  type: "string",
  required: false,
  comments: "Sort order for results.",
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  clean: toOptionalString,
});
const enableInput = input({
  label: "Enabled Status",
  type: "string",
  required: false,
  placeholder: "Enter enabled status",
  comments: "Filter by enabled/disabled status ('true' or 'false').",
  clean: toOptionalString,
});
const reconciledStatusFilterInput = input({
  label: "Reconciled Status Filter",
  type: "string",
  required: false,
  model: [
    { label: "Any", value: "any" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  comments: "Filter by reconciliation status.",
  clean: toOptionalBoolean,
});
const intUpdateGuidInput = input({
  label: "Integration Update GUID",
  type: "string",
  required: true,
  placeholder: "Enter integration update GUID",
  comments: "The GUID of the specific resource update.",
  example: "IG4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const reconcilePayloadInput = input({
  label: "Resources Reconciled",
  type: "boolean",
  required: true,
  comments: "When true, the resources have been reconciled.",
  clean: util.types.toBool,
});
const objectTypeValueListInput = input({
  label: "Object Type",
  type: "string",
  required: true,
  model: [
    { label: "Items", value: "items" },
    { label: "Quality Processes", value: "qualityprocesses" },
    { label: "Changes", value: "changes" },
    { label: "Requests", value: "requests" },
  ],
  comments:
    "Arena resource family the outbound event applies to, such as items, changes, requests or quality processes.",
  clean: util.types.toString,
});
export const getEventInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  eventGuid: eventGuidInput,
};
export const listEventAssociationsInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  itemsReconciled: itemsReconciledFilterInput,
  creationDateTimeFrom: creationDateTimeFromInput,
  creationDateTimeTo: creationDateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getEventItemInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  eventGuid: eventGuidInput,
  eventItemGuid: eventItemGuidInput,
};
export const listEventItemGuidsInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  eventGuid: eventGuidInput,
  reconciled: reconciledFilterInput,
};
export const listEventItemsInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  eventGuid: eventGuidInput,
  reconciled: reconciledFilterInput,
  reconciledDateTimeFrom: reconciledDateTimeFromInput,
  reconciledDateTimeTo: reconciledDateTimeToInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getIntegrationInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
};
export const listIntegrationAdministratorsInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
};
export const listIntegrationFiltersInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
};
export const listIntegrationsInputs = {
  connection: connectionInput,
  name: nameFilterInput,
  enabled: enabledFilterInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listOutboundEventIntegrationAdministratorsInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
};
export const listOutboundEventIntegrationEventsInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
  resourcesReconciled: resourcesReconciledFilterInput,
  fetchAll: fetchAllInput,
  pagination,
  order: orderInput,
};
export const listOutboundEventIntegrationsInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Integration Name",
    placeholder: "Enter integration name",
    comments: "Filter by integration name.",
  },
  enable: enableInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listOutboundEventIntegrationTriggersInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
};
export const listOutboundEventResourcesInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
  eventGuid: outboundEventGuidInput,
  objectType: {
    ...objectTypeValueListInput,
    comments: "The type of object to retrieve resources for.",
  },
  reconciled: reconciledStatusFilterInput,
  reconciledDateTimeFrom: {
    ...reconciledDateTimeFromInput,
    label: "Reconciled Date Time From",
    placeholder: "Enter reconciled date time from",
    comments: "Filter by reconciled datetime range start.",
  },
  reconciledDateTimeTo: {
    ...reconciledDateTimeToInput,
    label: "Reconciled Date Time To",
    placeholder: "Enter reconciled date time to",
    comments: "Filter by reconciled datetime range end.",
  },
  fetchAll: fetchAllInput,
  pagination,
};
export const updateEventItemReconciledInputs = {
  connection: connectionInput,
  integrationGuid: integrationGuidInput,
  eventGuid: eventGuidInput,
  eventItemGuid: eventItemGuidInput,
  reconciled: reconciledInput,
};
export const updateOutboundEventReconciliationInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
  eventGuid: outboundEventGuidInput,
  reconcilePayload: reconcilePayloadInput,
};
export const updateOutboundEventResourceReconciliationInputs = {
  connection: connectionInput,
  integrationGuid: outboundEventIntegrationGuidInput,
  eventGuid: outboundEventGuidInput,
  objectType: {
    ...objectTypeValueListInput,
    comments: "The type of object for the resource.",
  },
  intUpdateGuid: intUpdateGuidInput,
  reconcilePayload: reconcilePayloadInput,
};

import { input, util } from "@prismatic-io/spectral";

export const consumerOrgId = input({
  label: "Consumer Organization ID",
  type: "string",
  required: true,
  comments: "Your consumer organization Id",
  clean: util.types.toString,
});

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const eventmetadata = input({
  label: "Event Metadata",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "The optional boolean to fetch or not this provider's event metadata",
  clean: util.types.toBool,
});

export const id = input({
  label: "Provider ID",
  type: "string",
  required: true,
  comments: "The requested provider Id",
  dataSource: "selectProvider",
  clean: util.types.toString,
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  required: true,
  comments: "The project Id",
  clean: util.types.toString,
});

export const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: true,
  comments: "The workspace Id",
  clean: util.types.toString,
});

export const label = input({
  label: "Provider Label",
  type: "string",
  required: true,
  comments:
    "The label of this Events Provider, as shown on the Adobe Developer Console",
  clean: util.types.toString,
});

export const description = input({
  label: "Provider Description",
  type: "string",
  required: false,
  comments:
    "The description of this Events Provider, as shown on the Adobe Developer Console",
  clean: util.types.toString,
});

export const docsUrl = input({
  label: "Provider Documentation URL",
  type: "string",
  required: false,
  comments:
    "The documentation url of this Events Provider, as shown on the Adobe Developer Console",
  clean: util.types.toString,
});

export const providerId = input({
  label: "Provider ID",
  type: "string",
  required: true,
  comments: "The requested provider Id",
  dataSource: "selectProvider",
  clean: util.types.toString,
});

export const name = input({
  label: "Registration Name",
  type: "string",
  required: true,
  comments:
    "The name of the webhook registration which will be displayed on Developer Console",
  clean: util.types.toString,
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments: "The URL where the events will be delivered",
  clean: util.types.toString,
});

export const eventsOfInterest = input({
  label: "Events of Interest",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify([
    {
      provider: "string",
      event_code: "string",
      provider_id: "string",
    },
  ]),
  comments:
    "The events of interest for this registration. You can get the provider_id (provider not required) and event_code from the list of registrations available for your workspace by using the List All Registrations action.",
  clean: util.types.toString,
});

export const deliveryType = input({
  label: "Delivery Type",
  type: "string",
  model: [
    { label: "Webhook", value: "webhook" },
    { label: "Webhook Batch", value: "webhook_batch" },
    { label: "Journal", value: "journal" },
  ],
  required: true,
  default: "webhook",
  comments: "The delivery type of this registration.",
  clean: util.types.toString,
});

export const runtimeAction = input({
  label: "Runtime Action",
  type: "string",
  required: false,
  comments: "Runtime action to be invoked by the published events",
  clean: util.types.toString,
});

export const enabled = input({
  label: "Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Enable or disable the registration",
  clean: util.types.toBool,
});

export const registrationId = input({
  label: "Registration ID",
  type: "string",
  required: true,
  comments: "The registration Id associated with the registration",
  dataSource: "selectRegistration",
  clean: util.types.toString,
});

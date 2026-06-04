import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { updateServiceExample } from "./examples";

export const serviceId = input({
  label: "Service ID",
  type: "string",
  placeholder: "Enter a service ID",
  example: "PIJ90N7",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the service.",
});

export const serviceObject = input({
  label: "Service",
  type: "code",
  language: "json",
  required: true,
  comments: "The JSON object body describing the service to create.",
  clean: util.types.toObject,
});

export const updateServiceObject = input({
  label: "Service",
  type: "code",
  language: "json",
  comments: "The JSON object body describing the service to update.",
  required: true,
  example: updateServiceExample,
  clean: util.types.toObject,
});


export const servicesSortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  model: [
    { label: "Name", value: "name" },
    { label: "Name Asc", value: "name:asc" },
    { label: "Name Desc", value: "name:desc" },
  ],
  clean: toOptionalString,
  comments: "The field used to sort the results.",
});

export const servicesInclude = input({
  label: "Include",
  type: "string",
  required: false,
  model: [
    { label: "Escalation Policies", value: "escalation_policies" },
    { label: "Teams", value: "teams" },
    { label: "Integrations", value: "integrations" },
    {
      label: "Auto Pause Notifications Parameters",
      value: "auto_pause_notifications_parameters",
    },
  ],
  clean: toOptionalString,
  comments: "The additional details to include in the response.",
});

export const servicesName = input({
  label: "Name",
  type: "string",
  required: false,
  example: "My Service",
  placeholder: "Enter a service name",
  comments:
    "The name to filter results by. Only services with the specified name are returned.",
  clean: toOptionalString,
});

import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { createUserExample } from "./examples";

export const userId = input({
  label: "User ID",
  type: "string",
  placeholder: "Enter a user ID",
  example: "PXPGF42",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the user.",
});

export const userObject = input({
  label: "User",
  type: "code",
  language: "json",
  comments: "The JSON object body describing the user to create.",
  example: createUserExample,
  required: true,
  clean: util.types.toObject,
});

export const includeAttributes = input({
  label: "Include",
  type: "string",
  required: false,
  model: [
    { label: "Contact Methods", value: "contact_methods" },
    { label: "Notification Rules", value: "notification_rules" },
    { label: "Teams", value: "teams" },
    { label: "Subdomains", value: "subdomains" },
  ],
  clean: toOptionalString,
  comments: "The additional models to include in the response.",
});

export const query = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter a search query",
  example: "sampleName",
  clean: toOptionalString,
  comments:
    "The search query used to filter results. Only records whose name matches the query are returned.",
});

import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, verbose, redirect, region } from "./common";
export const strict = input({
  label: "Strict",
  type: "string",
  clean: toOptionalString,
  comments:
    "When true, Mixpanel will validate the provided records and return per-record error messages for records that fail validation. Set to 1 to enable strict validation.",
  placeholder: "Enter 1 to enable strict validation",
  required: false,
  example: "1",
});
export const distinct_id = input({
  label: "Distinct ID",
  type: "string",
  clean: toOptionalString,
  comments:
    "The unique identifier for the user post-identification. Equivalent to $identified_id and will be inferred if not provided.",
  placeholder: "Enter distinct ID",
  required: false,
  example: "user-12345",
});
export const identified_id = input({
  label: "Identified ID",
  type: "string",
  clean: util.types.toString,
  comments: "The identified user ID to merge with the anonymous ID.",
  placeholder: "Enter identified ID",
  required: true,
  example: "user-12345",
});
export const anon_id = input({
  label: "Anon ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The anonymous user ID to merge with the identified ID. Must be in UUID v4 format and not previously merged.",
  placeholder: "Enter anonymous ID (UUID v4)",
  required: true,
  example: "3e2a0d22-7465-4dc3-a2ab-56f8762e1a29",
});
export const project_token = input({
  label: "Project Token",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Mixpanel project token. Find this in Settings > Project Settings in the Mixpanel dashboard.",
  placeholder: "Enter project token",
  required: true,
  example: "725a93138a7d12e00f16912848590ae7",
});
export const alias = input({
  label: "Alias",
  type: "string",
  clean: util.types.toString,
  comments:
    "A new distinct_id to be merged with the original distinct_id. Each alias can only map to one distinct_id.",
  placeholder: "Enter alias ID",
  required: true,
  example: "user-alias-67890",
});
export const createIdentityDeliveryOptions = structuredObjectInput({
  label: "Delivery Options",
  required: false,
  comments:
    "Optional request delivery controls: strict record validation, verbose responses, and redirect URL.",
  inputs: { strict, verbose, redirect },
});
export const createAliasDeliveryOptions = structuredObjectInput({
  label: "Delivery Options",
  required: false,
  comments:
    "Optional request delivery controls: strict record validation, verbose responses, and redirect URL.",
  inputs: { strict, verbose, redirect },
});
export const createIdentityInputs = {
  connection: connectionInput,
  region,
  identified_id,
  anon_id,
  project_token,
  deliveryOptions: createIdentityDeliveryOptions,
};
export const createAliasInputs = {
  connection: connectionInput,
  region,
  distinct_id: { ...distinct_id, required: true, clean: util.types.toString },
  project_token,
  alias,
  deliveryOptions: createAliasDeliveryOptions,
};

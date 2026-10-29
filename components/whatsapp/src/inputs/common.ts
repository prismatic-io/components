import { input } from "@prismatic-io/spectral";
import { cleanCodeInput } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The WhatsApp connection to use.",
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional JSON fields to merge into the request body that are not covered by the standard inputs.",
  required: false,
  example: '{"key": "value"}',
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

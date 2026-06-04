import { input } from "@prismatic-io/spectral";
import { cleanCodeInput } from "../utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  example: "",
  clean: (value: unknown) => cleanCodeInput(value, "Additional Fields"),
});

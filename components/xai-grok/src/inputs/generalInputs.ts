import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "Additional fields that are not supported by the action inputs.",
  clean: util.types.toObject,
});

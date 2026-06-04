import { input, util } from "@prismatic-io/spectral";

export const evidence = input({
  label: "Evidence",
  type: "code",
  language: "json",
  example: JSON.stringify({ cancellation_policy: "policy_123456" }),
  comments: "Evidence to upload to respond to a dispute.",
  required: false,
  clean: util.types.toString,
});

export const submit = input({
  label: "Submit",
  type: "string",
  comments: "Whether to immediately submit evidence to the bank.",
  required: false,
  model: [
    { label: "", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "",
  clean: util.types.toString,
});

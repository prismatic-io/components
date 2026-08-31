import { input, util } from "@prismatic-io/spectral";
import {
  cleanObjectInput,
  cleanStringInput,
  cleanTriStateBoolInput,
} from "../util";
import {
  chargeId,
  connectionInput,
  created,
  cursorPagination,
  metadata,
  paymentIntent,
  timeout,
} from "./common";
export const evidence = input({
  label: "Evidence",
  type: "code",
  language: "json",
  example: JSON.stringify({ cancellation_policy: "policy_123456" }),
  comments: "Evidence to upload to respond to a dispute.",
  placeholder: "Enter dispute evidence",
  required: false,
  clean: cleanObjectInput,
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
  clean: cleanTriStateBoolInput,
});
export const disputeId = input({
  label: "Dispute ID",
  type: "string",
  comments: "The unique identifier for the dispute.",
  example: "dp_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Dispute ID",
  required: true,
  clean: util.types.toString,
});
export const closeDisputeInputs = {
  timeout,
  stripeConnection: connectionInput,
  disputeId,
};
export const getDisputeInputs = {
  timeout,
  stripeConnection: connectionInput,
  disputeId,
};
export const listDisputesInputs = {
  timeout,
  stripeConnection: connectionInput,
  chargeId: {
    ...chargeId,
    label: "Charge ID",
    required: false,
    comments:
      "Only return disputes associated to the charge specified by this charge ID.",
    clean: cleanStringInput,
  },
  paymentIntent,
  created,
  pagination: cursorPagination,
};
export const updateDisputeInputs = {
  timeout,
  stripeConnection: connectionInput,
  disputeId,
  evidence,
  metadata,
  submit,
};

import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connectionInput } from "./common";
import { companyId } from "./employee";





export const webhookSecret = input({
  label: "Webhook Secret",
  type: "password",
  required: false,
  comments:
    "The shared secret used to verify webhook signatures. Configure this in UKG Pro webhook settings and enter the same value here.",
  placeholder: "Enter webhook secret",
  clean: cleanString,
});

export const verifySignature = input({
  label: "Verify Webhook Signature",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, validates the HMAC-SHA256 webhook signature using the webhook secret. Requires Webhook Secret to be configured.",
  clean: util.types.toBool,
});








export const pollEmployeeChangesInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    required: false,
    comments: "Optional company ID to filter changes. Leave empty for all companies.",
  },
};




export const pollNewHireStatusInputs = {
  connection: connectionInput,
};




export const webhookEmployeeLifecycleInputs = {
  connection: connectionInput,
  webhookSecret,
  verifySignature,
};

import { input, util } from "@prismatic-io/spectral";
import { operationCriteriaPayload, operationPayload } from "../examplePayloads";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  validateOnly,
} from "./common";

export const partialFailure = input({
  label: "Partial Failure",
  type: "boolean",
  required: true,
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, successful operations will be carried out and invalid operations will return errors. When false, all operations will be carried out in one transaction if and only if they are all valid. This should always be set to true. See [Partial failure documentation](https://developers.google.com/google-ads/api/docs/best-practices/partial-failures).",
});

export const operations = input({
  label: "Operations",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(operationPayload, null, 2),
  comments:
    "The list of operations to perform on individual campaigns. See [Campaign operations documentation](https://developers.google.com/google-ads/api/reference/rpc/latest/CampaignOperation).",
  clean: util.types.toObject,
});

export const mutateCampaignInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  operations,
  partialFailure,
  managerCustomerId: { ...managerCustomerIdInput, required: false },
  validateOnly,
};

export const mutateCampaignCriteriaInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  operations: {
    ...operations,
    default: JSON.stringify(operationCriteriaPayload, null, 2),
  },
  partialFailure,
  managerCustomerId: { ...managerCustomerIdInput, required: false },
  validateOnly,
};

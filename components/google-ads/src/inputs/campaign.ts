import { input, util } from "@prismatic-io/spectral";
import {
  campaignCriteriaOperationsExampleInput,
  campaignOperationsExampleInput,
} from "../examplePayloads";
import { toOptionalCustomerId } from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  partialFailure,
  validateOnly,
} from "./common";

const operations = input({
  label: "Operations",
  placeholder: "Enter campaign operations as a JSON array",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(campaignOperationsExampleInput, null, 2),
  comments:
    "The list of operations to perform on individual campaigns. See [Campaign operations documentation](https://developers.google.com/google-ads/api/reference/rpc/v26/CampaignOperation).",
  clean: util.types.toObject,
});

export const mutateCampaignInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  operations,
  partialFailure,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  validateOnly,
};

export const mutateCampaignCriteriaInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  operations: {
    ...operations,
    default: JSON.stringify(campaignCriteriaOperationsExampleInput, null, 2),
    placeholder: "Enter campaign criterion operations as a JSON array",
    comments:
      "The list of operations to create, update, or remove individual campaign criteria. See [Campaign criterion operations documentation](https://developers.google.com/google-ads/api/reference/rpc/v26/CampaignCriterionOperation).",
  },
  partialFailure,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  validateOnly,
};

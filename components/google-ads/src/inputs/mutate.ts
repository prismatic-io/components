import { input, util } from "@prismatic-io/spectral";
import { RESPONSE_CONTENT_TYPE_MODEL } from "../constants";
import { cleanString, toOptionalCustomerId } from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  partialFailure,
  validateOnly,
} from "./common";

const mutateOperations = input({
  label: "Mutate Operations",
  placeholder: "Enter mutate operations as a JSON array",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        campaignBudgetOperation: {
          create: {
            resourceName: "customers/1234567890/campaignBudgets/-1",
            name: "Example Budget",
            amountMicros: "50000000",
            deliveryMethod: "STANDARD",
            explicitlyShared: false,
          },
        },
      },
      {
        campaignOperation: {
          create: {
            resourceName: "customers/1234567890/campaigns/-2",
            name: "Example Campaign",
            advertisingChannelType: "SEARCH",
            status: "PAUSED",
            campaignBudget: "customers/1234567890/campaignBudgets/-1",
            manualCpc: {},
            containsEuPoliticalAdvertising:
              "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
          },
        },
      },
      {
        adGroupOperation: {
          create: {
            resourceName: "customers/1234567890/adGroups/-3",
            name: "Example Ad Group",
            campaign: "customers/1234567890/campaigns/-2",
            status: "ENABLED",
            cpcBidMicros: "1000000",
          },
        },
      },
      {
        adGroupCriterionOperation: {
          create: {
            adGroup: "customers/1234567890/adGroups/-3",
            status: "ENABLED",
            keyword: { text: "running shoes", matchType: "PHRASE" },
          },
        },
      },
    ],
    null,
    2,
  ),
  comments:
    "The operations to run in one request, across any resource types (at most 10,000). A new resource can be referenced by later operations through a temporary ID: a negative number in its resource name, such as campaignBudgets/-1. See [Temporary IDs documentation](https://developers.google.com/google-ads/api/docs/batch-processing/temporary-ids).",
  clean: util.types.toObject,
});

const responseContentType = input({
  label: "Response Content Type",
  type: "string",
  required: false,
  model: RESPONSE_CONTENT_TYPE_MODEL,
  comments:
    "What each operation's result returns. Resource Name Only is the default; Mutable Resource also returns the changed resource's fields.",
  clean: cleanString,
});

export const mutateResourcesInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  mutateOperations,
  partialFailure: { ...partialFailure, default: "true" },
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  validateOnly,
  responseContentType,
};

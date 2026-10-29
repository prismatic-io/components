import { input, util } from "@prismatic-io/spectral";

import { cleanOptionalString } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Advertising connection to use.",
});

export const customerIdInput = input({
  label: "Customer ID",
  placeholder: "Enter customer ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the customer.",
  clean: util.types.toString,
  dataSource: "selectCustomerId",
});

export const accountIdInput = input({
  label: "Account ID",
  placeholder: "Enter account ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the advertiser account.",
  clean: util.types.toString,
  dataSource: "selectAccountId",
});

export const campaignIdInput = input({
  label: "Campaign ID",
  placeholder: "Enter campaign ID",
  type: "string",
  required: true,
  comments: "The identifier of the campaign.",
  example: "542512145",
  clean: util.types.toString,
  dataSource: "selectCampaignId",
});

export const adGroupIdInput = input({
  label: "Ad Group ID",
  placeholder: "Enter ad group ID",
  type: "string",
  required: true,
  comments: "The identifier of the ad group.",
  example: "9012345",
  clean: util.types.toString,
  dataSource: "selectAdGroupId",
});

export const returnAdditionalFieldsInput = input({
  label: "Return Additional Fields",
  placeholder: "Enter additional fields",
  type: "string",
  required: false,
  comments:
    "A space-delimited list of additional properties to include in each returned entity. Allowed values depend on the resource and API version.",
  clean: cleanOptionalString,
});

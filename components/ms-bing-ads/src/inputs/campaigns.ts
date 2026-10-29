import { input, util } from "@prismatic-io/spectral";

import { cleanSpaceDelimitedString, cleanStringArray } from "../util";
import {
  accountIdInput,
  connectionInput,
  customerIdInput,
  returnAdditionalFieldsInput,
} from "./common";

const campaignTypeModel = [
  { label: "Audience", value: "Audience" },
  { label: "Dynamic Search Ads", value: "DynamicSearchAds" },
  { label: "Performance Max", value: "PerformanceMax" },
  { label: "Search", value: "Search" },
  { label: "Shopping", value: "Shopping" },
];

const campaignsBodyInput = input({
  label: "Campaigns",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of campaigns to create. Each campaign object follows the Microsoft Advertising Campaign object schema.",
  example: JSON.stringify(
    [
      {
        Name: "My Search Campaign",
        CampaignType: "Search",
        BudgetType: "DailyBudgetStandard",
        DailyBudget: 50.0,
        TimeZone: "PacificTimeUSCanadaTijuana",
        Status: "Paused",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const updateCampaignsBodyInput = {
  ...campaignsBodyInput,
  comments:
    "A JSON array of campaigns to update. Each object must include its Id. All other fields are optional — include only what you want to change.",
  example: JSON.stringify(
    [
      {
        Id: "<campaign-id>",
        Name: "Renamed Campaign",
        DailyBudget: 75.0,
        Status: "Active",
      },
    ],
    null,
    2,
  ),
};

const campaignIdsInput = input({
  label: "Campaign IDs",
  placeholder: "Enter campaign ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of campaign identifiers. For delete and get-by-ids operations.",
  example: "542512145",
  clean: cleanStringArray,
});

const campaignTypeInput = input({
  label: "Campaign Type",
  type: "string",
  collection: "valuelist",
  model: campaignTypeModel,
  required: false,
  comments:
    "The type(s) of campaigns to return. Defaults to Search when omitted. Specify additional types to include non-Search campaigns.",
  clean: cleanSpaceDelimitedString,
});

export const addCampaignsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaigns: campaignsBodyInput,
};

export const updateCampaignsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaigns: updateCampaignsBodyInput,
};

export const deleteCampaignsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignIds: {
    ...campaignIdsInput,
    required: true,
    comments: "An array of campaign identifiers to delete.",
  },
};

export const getCampaignsByAccountIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignType: campaignTypeInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

export const selectCampaignIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true, dataSource: undefined },
  customerId: { ...customerIdInput, required: true, dataSource: undefined },
};

export const getCampaignsByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignIds: {
    ...campaignIdsInput,
    required: true,
    comments: "An array of campaign identifiers to retrieve.",
  },
  campaignType: campaignTypeInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

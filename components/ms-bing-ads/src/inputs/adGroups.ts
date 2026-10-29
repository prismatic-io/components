import { input, util } from "@prismatic-io/spectral";

import { cleanStringArray } from "../util";
import {
  accountIdInput,
  campaignIdInput,
  connectionInput,
  customerIdInput,
  returnAdditionalFieldsInput,
} from "./common";

const adGroupsBodyInput = input({
  label: "Ad Groups",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of ad groups to create. Each object follows the Microsoft Advertising AdGroup object schema.",
  example: JSON.stringify(
    [
      {
        Name: "My Ad Group",
        Status: "Paused",
        StartDate: { Day: 1, Month: 1, Year: 2026 },
        CpcBid: { Amount: 0.5 },
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const adGroupIdsInput = input({
  label: "Ad Group IDs",
  placeholder: "Enter ad group ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of ad group identifiers. For delete and get-by-ids operations.",
  example: "9012345",
  clean: cleanStringArray,
});

export const addAdGroupsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroups: adGroupsBodyInput,
};

export const updateAdGroupsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroups: {
    ...adGroupsBodyInput,
    comments:
      "A JSON array of ad groups to update. Each object must include its Id. All other fields are optional — include only what you want to change.",
    example: JSON.stringify(
      [
        {
          Id: "<ad-group-id>",
          Name: "Renamed Ad Group",
          Status: "Active",
          CpcBid: { Amount: 0.75 },
        },
      ],
      null,
      2,
    ),
  },
};

export const deleteAdGroupsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupIds: {
    ...adGroupIdsInput,
    required: true,
    comments: "An array of ad group identifiers to delete.",
  },
};

export const getAdGroupsByCampaignIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

export const getAdGroupsByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupIds: {
    ...adGroupIdsInput,
    required: true,
    comments: "An array of ad group identifiers to retrieve.",
  },
  returnAdditionalFields: returnAdditionalFieldsInput,
};

export const selectAdGroupIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true, dataSource: undefined },
  customerId: { ...customerIdInput, required: true, dataSource: undefined },
  campaignId: { ...campaignIdInput, dataSource: undefined },
};

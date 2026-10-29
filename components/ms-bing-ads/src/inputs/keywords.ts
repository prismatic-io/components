import { input, util } from "@prismatic-io/spectral";

import { cleanStringArray } from "../util";
import {
  accountIdInput,
  adGroupIdInput,
  campaignIdInput,
  connectionInput,
  customerIdInput,
  returnAdditionalFieldsInput,
} from "./common";

const keywordsBodyInput = input({
  label: "Keywords",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of keywords to create. Each object follows the Microsoft Advertising Keyword object schema.",
  example: JSON.stringify(
    [
      {
        Text: "running shoes",
        MatchType: "Exact",
        Bid: { Amount: 0.75 },
        Status: "Paused",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const keywordIdsInput = input({
  label: "Keyword IDs",
  placeholder: "Enter keyword ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of keyword identifiers. For delete and get-by-ids operations.",
  example: "6012345",
  clean: cleanStringArray,
});

export const addKeywordsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  keywords: keywordsBodyInput,
};

export const updateKeywordsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  keywords: {
    ...keywordsBodyInput,
    comments:
      "A JSON array of keywords to update. Each object must include its Id. All other fields are optional — include only what you want to change.",
    example: JSON.stringify(
      [
        {
          Id: "<keyword-id>",
          Bid: { Amount: 1.0 },
          Status: "Paused",
        },
      ],
      null,
      2,
    ),
  },
};

export const deleteKeywordsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  keywordIds: {
    ...keywordIdsInput,
    required: true,
    comments: "An array of keyword identifiers to delete.",
  },
};

export const getKeywordsByAdGroupIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

export const getKeywordsByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  keywordIds: {
    ...keywordIdsInput,
    required: true,
    comments: "An array of keyword identifiers to retrieve.",
  },
  returnAdditionalFields: returnAdditionalFieldsInput,
};

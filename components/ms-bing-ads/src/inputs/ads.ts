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

const adTypeModel = [
  { label: "App Install", value: "AppInstall" },
  { label: "Dynamic Search", value: "DynamicSearch" },
  { label: "Expanded Text", value: "ExpandedText" },
  { label: "Hotel", value: "Hotel" },
  { label: "Image", value: "Image" },
  { label: "Product", value: "Product" },
  { label: "Responsive Ad", value: "ResponsiveAd" },
  { label: "Responsive Search", value: "ResponsiveSearch" },
  { label: "Text", value: "Text" },
];

const adsBodyInput = input({
  label: "Ads",
  type: "code",
  language: "json",
  required: true,
  comments:
    'A JSON array of ads to create. Each ad needs a Type discriminator using the short AdType value (e.g. ResponsiveSearch, ExpandedText, AppInstall). For a ResponsiveSearch ad, Headlines (3-15) and Descriptions (2-4) are arrays of asset links, each wrapping a text asset whose own Type is the full "TextAsset" value.',
  example: JSON.stringify(
    [
      {
        Type: "ResponsiveSearch",
        Headlines: [
          { Asset: { Text: "Fast Free Shipping", Type: "TextAsset" } },
          { Asset: { Text: "Shop Spring Styles", Type: "TextAsset" } },
          { Asset: { Text: "Top-Rated Running Shoes", Type: "TextAsset" } },
        ],
        Descriptions: [
          {
            Asset: {
              Text: "Shop our spring collection today.",
              Type: "TextAsset",
            },
          },
          { Asset: { Text: "Free returns on all orders.", Type: "TextAsset" } },
        ],
        FinalUrls: ["https://www.contoso.com"],
        Status: "Paused",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const adIdsInput = input({
  label: "Ad IDs",
  placeholder: "Enter ad ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "An array of ad identifiers. For delete and get-by-ids operations.",
  example: "7012345",
  clean: cleanStringArray,
});

const adTypesInput = input({
  label: "Ad Types",
  type: "string",
  collection: "valuelist",
  model: adTypeModel,
  required: true,
  comments: "The type(s) of ads to return for the specified ad group.",
  clean: cleanStringArray,
});

export const addAdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  ads: adsBodyInput,
};

export const updateAdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  ads: {
    ...adsBodyInput,
    comments:
      "A JSON array of ads to update. Each object must include its Id and Type discriminator (the short AdType value, e.g. ResponsiveSearch). All other fields are optional — include only what you want to change.",
    example: JSON.stringify(
      [
        {
          Id: "<ad-id>",
          Type: "ResponsiveSearch",
          Status: "Active",
          FinalUrls: ["https://www.contoso.com"],
        },
      ],
      null,
      2,
    ),
  },
};

export const deleteAdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  adIds: {
    ...adIdsInput,
    required: true,
    comments: "An array of ad identifiers to delete.",
  },
};

export const getAdsByAdGroupIdInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  adTypes: adTypesInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

export const getAdsByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  campaignId: campaignIdInput,
  adGroupId: adGroupIdInput,
  adIds: {
    ...adIdsInput,
    required: true,
    comments: "An array of ad identifiers to retrieve.",
  },
  adTypes: adTypesInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

import { input, util } from "@prismatic-io/spectral";

import { cleanOptionalString, cleanStringArray } from "../util";
import {
  accountIdInput,
  connectionInput,
  customerIdInput,
  returnAdditionalFieldsInput,
} from "./common";

const audienceTypeModel = [
  { label: "Remarketing List", value: "RemarketingList" },
  { label: "Custom Audience", value: "CustomAudience" },
  { label: "In Market Audience", value: "InMarketAudience" },
  { label: "Product Audience", value: "ProductAudience" },
  { label: "Similar Remarketing List", value: "SimilarRemarketingList" },
  { label: "Combined List", value: "CombinedList" },
  { label: "Customer List", value: "CustomerList" },
  { label: "Custom Segment", value: "CustomSegment" },
  {
    label: "Impression Based Remarketing List",
    value: "ImpressionBasedRemarketingList",
  },
];

const audiencesBodyInput = input({
  label: "Audiences",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array of audiences to create. Each object needs a Type discriminator (e.g. CustomerList, RemarketingList) and ParentId (the account ID when Scope is Account, otherwise the customer ID). A RemarketingList additionally requires a valid UET TagId and a Rule.",
  example: JSON.stringify(
    [
      {
        Type: "CustomerList",
        Name: "API Test List",
        Description: "Created via API test.",
        MembershipDuration: 30,
        Scope: "Account",
        ParentId: "<account-id>",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const updateAudiencesBodyInput = input({
  ...audiencesBodyInput,
  comments:
    "A JSON array of audiences to update. Each object must include its Id (returned when the audience was created) and its Type discriminator (e.g. CustomerList). ParentId is read-only and cannot be changed. All other fields are optional — include only what you want to change.",
  example: JSON.stringify(
    [
      {
        Id: "<audience-id>",
        Type: "CustomerList",
        Name: "Renamed audience",
        Description: "Updated via API.",
        MembershipDuration: 60,
      },
    ],
    null,
    2,
  ),
});

const audienceIdsInput = input({
  label: "Audience IDs",
  placeholder: "Enter audience ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of audience identifiers. Leave empty to return all customer- and account-scoped audiences in the account.",
  example: "5012345",
  clean: cleanStringArray,
});

const audienceTypeInput = input({
  label: "Audience Type",
  type: "string",
  model: audienceTypeModel,
  required: false,
  comments:
    "The audience type to return. Required when Audience IDs is empty — the API needs a type to know which audiences to return.",
  clean: cleanOptionalString,
});

export const addAudiencesInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  audiences: audiencesBodyInput,
};

export const updateAudiencesInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  audiences: updateAudiencesBodyInput,
};

export const deleteAudiencesInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  audienceIds: {
    ...audienceIdsInput,
    required: true,
    comments: "An array of audience identifiers to delete.",
  },
};

export const getAudiencesByIdsInputs = {
  connection: connectionInput,
  accountId: { ...accountIdInput, required: true },
  customerId: { ...customerIdInput, required: true },
  audienceIds: audienceIdsInput,
  audienceType: audienceTypeInput,
  returnAdditionalFields: returnAdditionalFieldsInput,
};

import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { ANALYTICS_ENDPOINTS } from "./constants";
import { pollResourceModel, toOptionalString } from "./util";
const cleanId = (idType: string, id: string) => {
  if (id.startsWith(idType)) {
    return id;
  } else {
    return `${idType}/${id}`;
  }
};
export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  example:
    "CjwKCAjwpdqkBhB-EiwA4Kk0u3bXgYx5mXo3nZl6e7jYz1hA0r8D6Gq2b8g7fX9WlX1Jf4bJpQ8YhoCjvsQAvD_BwE",
  placeholder: "Enter a page token",
  comments:
    "If a previous response was truncated, the response includes a `nextPageToken`. To retrieve the next page of results, set this parameter to the value of `nextPageToken` from the previous response.",
  clean: toOptionalString,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter a page size",
  comments: `The maximum number of resources contained in the underlying API response. The API may return fewer values in a page, even if there are additional values to return. If unspecified, 200 is requested, which is also the maximum.`,
  clean: toOptionalString,
});
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const propertyIdInput = input({
  label: "Property ID",
  type: "string",
  required: true,
  example: "properties/111111111",
  placeholder: "Enter a property ID",
  comments:
    "The unique identifier for the GA4 property, in properties/NNNNNNNNN form. A bare numeric ID is accepted and normalized.",
  dataSource: "listProperties",
  clean: (value) => cleanId("properties", util.types.toString(value)),
});
export const appInstanceId = input({
  label: "App Instance ID",
  comments:
    "The unique identifier assigned to an app installation on a device. Sent as app_instance_id in the Measurement Protocol payload.",
  type: "string",
  required: true,
  example: "12345678901234567890123456789012",
  placeholder: "Enter an app instance ID",
  clean: util.types.toString,
});
export const events = input({
  label: "Events To Send",
  comments: "The events to send to Google Analytics",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify([
    {
      name: "campaign_details",
      params: {
        campaign_id: "google_1234",
        campaign: "Summer_fun",
        source: "google",
        medium: "cpc",
        term: "summer+travel",
        content: "logolink",
        session_id: "123",
        engagement_time_msec: "100",
      },
    },
  ]),
});
export const apiSecret = input({
  label: "API Secret",
  type: "password",
  required: true,
  example: "Str5ahciR5SJtWClz1mkRA",
  placeholder: "Enter an API secret",
  comments:
    "The Measurement Protocol API secret. Generate one in the Google Analytics UI under Admin > Data Streams > Measurement Protocol API secrets.",
  clean: util.types.toString,
});
export const firebaseAppId = input({
  label: "Firebase App ID",
  type: "string",
  required: true,
  example: "1:123456789012:web:1234567890123456789012",
  placeholder: "1:123456789012:web:1234567890123456789012",
  comments:
    "The Firebase App ID, found in the Firebase console under" +
    " Project Settings > General > Your Apps > App ID",
  clean: util.types.toString,
});
export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  example: "accounts/000000000",
  placeholder: "Enter an account ID",
  comments:
    "The unique identifier for the GA4 account that owns the properties, in accounts/NNNNNNNNN form.",
  dataSource: "listAccounts",
  clean: util.types.toString,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, retrieves all pages of results.",
  clean: util.types.toBool,
});
const { debugRequest: _, ...restInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  baseUrl: input({
    label: "Base URL",
    type: "string",
    required: true,
    clean: util.types.toString,
    model: Object.values(ANALYTICS_ENDPOINTS).map((endpoint) => ({
      label: endpoint,
      value: endpoint,
    })),
  }),
  ...restInputs,
  url: {
    ...restInputs.url,
    comments:
      "Input the path only (/accounts), the base URL comes from the Base URL input. For example, to connect to the selected base URL followed by /accounts, only /accounts is entered in this field.",
    example: "/accounts",
  },
};
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { pageSize, pageToken },
});
export const listAccountsInputs = {
  fetchAll,
  pagination,
  connection: connectionInput,
};
export const listPropertiesInputs = {
  accountId: accountId,
  fetchAll,
  pagination,
  connection: connectionInput,
};
export const getPropertyInputs = {
  accountId: {
    ...accountId,
    required: false,
  },
  propertyId: propertyIdInput,
  connection: connectionInput,
};
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments:
    "The Google Analytics GA4 resource type to poll for new or updated records.",
  clean: util.types.toString,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created records are included in the trigger output.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records that were modified after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  connection: {
    ...connectionInput,
    comments: "The Google Analytics GA4 connection to use.",
  },
  pollResourceType,
  accountId: {
    ...accountId,
    required: false,
    placeholder: "Enter the account ID (e.g., accounts/000000000)",
    comments:
      "The unique identifier for the Google Analytics account. Required when the Resource Type is 'Properties'.",
  },
  showNewRecords,
  showUpdatedRecords,
};

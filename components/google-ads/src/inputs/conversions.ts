import { input, util } from "@prismatic-io/spectral";
import { clickConversionsExampleInput } from "../examplePayloads";
import { cleanString, toOptionalCustomerId } from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  validateOnly,
} from "./common";
const conversions = input({
  label: "Conversions",
  placeholder: "Enter conversions as a JSON array",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(clickConversionsExampleInput, null, 2),
  comments:
    "The click conversions to upload, each identifying the click (for example, by GCLID) and the conversion action, time, and value. See [Offline conversions documentation](https://developers.google.com/google-ads/api/docs/conversions/upload-offline).",
  clean: util.types.toObject,
});
const eventsInput = input({
  label: "Events",
  placeholder: "Enter conversion events as a JSON array",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        eventTimestamp: "2026-05-15T12:30:00Z",
        transactionId: "ORDER-2026-00123",
        adIdentifiers: {
          gclid: "CjwKCAjw1234567890abcdefGHIJKLmnoPQRStuvwxyz",
        },
        conversionValue: 149.99,
        currency: "USD",
        consent: {
          adUserData: "CONSENT_GRANTED",
          adPersonalization: "CONSENT_GRANTED",
        },
      },
    ],
    null,
    2,
  ),
  comments:
    "The array of conversion events to ingest (max 2000 per request). See [Event resource](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest).",
  clean: util.types.toObject,
});
const destinationsInput = input({
  label: "Destinations",
  placeholder: "Enter destinations as a JSON array",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        operatingAccount: {
          accountType: "GOOGLE_ADS",
          accountId: "1234567890",
        },
        productDestinationId: "987654321",
      },
    ],
    null,
    2,
  ),
  comments:
    "The array of destinations that describe where each event should be ingested. See [Destination reference](https://developers.google.com/data-manager/api/reference/rest/v1/Destination).",
  clean: util.types.toObject,
});
const encodingInput = input({
  label: "Hash Encoding",
  type: "string",
  required: false,
  example: "HEX",
  model: [
    { label: "HEX", value: "HEX" },
    { label: "BASE64", value: "BASE64" },
  ],
  comments:
    "The encoding format to select for hashed user data fields (such as email or phone). Required when `userData` fields are included in events.",
  clean: cleanString,
});
export const ingestOfflineConversionsInputs = {
  connection: connectionInput,
  events: eventsInput,
  destinations: destinationsInput,
  encoding: encodingInput,
  validateOnly,
};
export const uploadCallConversionsInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  conversions: {
    ...conversions,
    example: JSON.stringify(
      [
        {
          callerId: "+16505550100",
          callStartDateTime: "2026-01-15 10:00:00-05:00",
          conversionAction: "customers/1234567890/conversionActions/987654321",
          conversionDateTime: "2026-01-15 10:30:00-05:00",
          conversionValue: 149.99,
          currencyCode: "USD",
          consent: {
            adUserData: "GRANTED",
            adPersonalization: "GRANTED",
          },
          customVariables: [
            {
              conversionCustomVariable:
                "customers/1234567890/conversionCustomVariables/111222333",
              value: "premium",
            },
          ],
        },
      ],
      null,
      2,
    ),
    comments:
      "The call conversions to upload, each identifying the call by caller ID and call start time. See [Call conversions documentation](https://developers.google.com/google-ads/api/docs/conversions/upload-calls).",
  },
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  validateOnly,
};
export const uploadClickConversionsInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  conversions,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  validateOnly,
};

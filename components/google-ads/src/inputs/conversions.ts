import { input, util } from "@prismatic-io/spectral";
import { conversionsPayload } from "../examplePayloads";
import { cleanString } from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  validateOnly,
} from "./common";


const conversions = input({
  label: "Conversions",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(conversionsPayload, null, 2),
  comments:
    "The conversions that are being uploaded. See [Click conversions documentation](https://developers.google.com/google-ads/api/docs/conversions/upload-clicks).",
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
      {
        customVariables: [
          {
            conversionCustomVariable: "string",
            value: "string",
          },
        ],
        consent: {
          adUserData: "UNSPECIFIED | UNKNOWN | GRANTED | DENIED",
          adPersonalization: "UNSPECIFIED | UNKNOWN | GRANTED | DENIED",
        },
        callerId: "string",
        callStartDateTime: "string",
        conversionAction: "string",
        conversionDateTime: "string",
        conversionValue: 123,
        currencyCode: "string",
      },
      null,
      2,
    ),
  },
  managerCustomerId: { ...managerCustomerIdInput, required: false },
  validateOnly,
};

export const uploadClickConversionsInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  conversions,
  managerCustomerId: { ...managerCustomerIdInput, required: false },
  validateOnly,
};

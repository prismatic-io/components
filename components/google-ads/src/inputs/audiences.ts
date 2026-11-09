import { input, util } from "@prismatic-io/spectral";
import {
  CONSENT_STATUS_MODEL,
  TERMS_OF_SERVICE_STATUS_MODEL,
} from "../constants";
import { cleanString, toOptionalCustomerId } from "../util";
import {
  connectionInput,
  customerIdInput,
  encodingInput,
  managerCustomerIdInput,
  validateOnly,
} from "./common";

const audienceId = input({
  label: "Audience",
  placeholder: "Select an audience",
  type: "string",
  required: true,
  example: "9876543210",
  dataSource: "selectUserList",
  comments:
    "The Customer Match audience (user list) of the customer to update. Pick one from the list, or enter its ID.",
  clean: util.types.toString,
});

const audienceMembers = input({
  label: "Audience Members",
  placeholder: "Enter audience members as a JSON array",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        userData: {
          userIdentifiers: [
            {
              emailAddress:
                "205da17f395ab25189a93ec0d8de112eed201c12da3a0aeb5ce35a5fc5414952",
            },
            {
              phoneNumber:
                "468a4b26753815290dc13ee82f453df24fd974c708542d1f3c497c7b4e7e4413",
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
  comments:
    "The audience members, each with up to 10 SHA-256 hashed user identifiers (email address, phone number or address), at most 10,000 per request. See [AudienceMember reference](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember).",
  clean: util.types.toObject,
});

const customerMatchTermsOfService = input({
  label: "Customer Match Terms of Service",
  type: "string",
  required: true,
  model: TERMS_OF_SERVICE_STATUS_MODEL,
  comments:
    "Whether the advertiser accepts the Customer Match terms of service. Google requires Accepted to ingest user data.",
  clean: util.types.toString,
});

const adUserDataConsent = input({
  label: "Ad User Data Consent",
  type: "string",
  required: false,
  model: CONSENT_STATUS_MODEL,
  comments:
    "Request-level consent for using these users' data for advertising. Leave empty to send no request-level consent.",
  clean: cleanString,
});

const adPersonalizationConsent = input({
  label: "Ad Personalization Consent",
  type: "string",
  required: false,
  model: CONSENT_STATUS_MODEL,
  comments:
    "Request-level consent for ad personalization for these users. Leave empty to send no request-level consent.",
  clean: cleanString,
});

const requestId = input({
  label: "Request ID",
  placeholder: "Enter request ID",
  type: "string",
  required: true,
  example: "126365e1-16d0-4c81-9de9-f362711e250a",
  comments:
    "The requestId returned by Ingest Audience Members, Remove Audience Members or Ingest Offline Conversions.",
  clean: util.types.toString,
});

const audienceEncoding = {
  ...encodingInput,
  comments:
    "The encoding of the SHA-256 hashed user identifiers in Audience Members. Required when the members include hashed user data.",
};

const optionalManagerCustomerId = {
  ...managerCustomerIdInput,
  required: false,
  clean: toOptionalCustomerId,
  comments:
    "The Google Ads manager account the request is made through, when the customer is reached through a manager. Accepts hyphenated or number forms.",
};

export const ingestAudienceMembersInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  audienceId,
  audienceMembers,
  customerMatchTermsOfService,
  managerCustomerId: optionalManagerCustomerId,
  encoding: audienceEncoding,
  adUserDataConsent,
  adPersonalizationConsent,
  validateOnly,
};

export const removeAudienceMembersInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  audienceId,
  audienceMembers,
  managerCustomerId: optionalManagerCustomerId,
  encoding: audienceEncoding,
  validateOnly,
};

export const getRequestStatusInputs = {
  connection: connectionInput,
  requestId,
};

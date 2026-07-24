import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../../util";
import {
  account,
  connectionInput,
  connectionOnlyInputs,
  paginationGroupedInputs,
  updateMask,
} from "./common";
const accountName = input({
  label: "Account Name",
  type: "string",
  clean: toOptionalString,
  comments: "Human-readable business name of the Merchant Center account.",
  example: "My Online Store",
  placeholder: "Enter Account Name",
  required: false,
});
const adultContent = input({
  label: "Adult Content",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, indicates the merchant sells adult content.",
  required: true,
});
const timeZone = input({
  label: "Time Zone ID",
  type: "string",
  clean: util.types.toString,
  comments:
    'The account\'s IANA time zone id for display and reporting (e.g. "America/Los_Angeles").',
  example: "America/Los_Angeles",
  placeholder: "America/Los_Angeles",
  required: false,
});
const languageCode = input({
  label: "Language Code",
  type: "string",
  clean: toOptionalString,
  comments:
    "The account's BCP-47 language code, used for display and reporting (e.g. en-US).",
  example: "en-US",
  placeholder: "Enter Language Code",
  required: false,
});
const users = structuredObjectInput({
  label: "Users",
  collection: "valuelist",
  required: false,
  comments:
    "Users with access to the account. Every account (except for subaccounts) must have at least one admin user.",
  inputs: {
    emailAddress: input({
      type: "string",
      label: "Email Address",
      required: true,
      comments: "The email address of the user.",
    }),
    admin: input({
      type: "boolean",
      label: "Admin",
      required: false,
      comments: "Whether the user has admin access.",
    }),
    orderManager: input({
      type: "boolean",
      label: "Order Manager",
      required: false,
      comments: "Whether the user can manage orders.",
    }),
    paymentsManager: input({
      type: "boolean",
      label: "Payments Manager",
      required: false,
      comments: "Whether the user can manage payment settings.",
    }),
    paymentsAnalyst: input({
      type: "boolean",
      label: "Payments Analyst",
      required: false,
      comments: "Whether the user can view payment information.",
    }),
    reportingManager: input({
      type: "boolean",
      label: "Reporting Manager",
      required: false,
      comments: "Whether the user can manage reporting.",
    }),
  },
});
const service = structuredObjectInput({
  label: "Service",
  collection: "valuelist",
  required: true,
  comments:
    "Account service relationships to establish. At least one is required. For a sub-account under an advanced (aggregator) account, choose Account Aggregation and set the provider to the aggregator account resource name (e.g. accounts/123456789).",
  inputs: {
    serviceType: input({
      type: "string",
      label: "Service Type",
      required: true,
      comments: "The type of service relationship to establish.",
      model: [
        { label: "Account Aggregation", value: "accountAggregation" },
        { label: "Account Management", value: "accountManagement" },
        { label: "Campaigns Management", value: "campaignsManagement" },
        { label: "Comparison Shopping", value: "comparisonShopping" },
        { label: "Local Listing Management", value: "localListingManagement" },
        { label: "Products Management", value: "productsManagement" },
      ],
    }),
    provider: input({
      type: "string",
      label: "Provider",
      required: true,
      comments:
        'Reference to the provider account, e.g. "providers/123" or "accounts/123456789".',
    }),
    externalAccountId: input({
      type: "string",
      label: "External Account ID",
      required: false,
      comments: "The external account identifier for the service.",
    }),
  },
});
export const createAccountInputs = {
  ...connectionOnlyInputs,
  accountName: { ...accountName, clean: util.types.toString, required: true },
  service,
  adultContent: { ...adultContent, required: false },
  timeZone,
  languageCode,
  users,
};
export const deleteAccountInputs = {
  ...connectionOnlyInputs,
  account,
};
export const getAccountInputs = {
  ...connectionOnlyInputs,
  account,
};
export const listAccountsInputs = {
  ...connectionOnlyInputs,
  ...paginationGroupedInputs,
};
export const updateAccountInputs = {
  ...connectionOnlyInputs,
  account,
  accountName,
  timeZone,
  languageCode,
  updateMask: {
    ...updateMask,
    comments:
      "Comma-separated list of fields to update (e.g. accountName,timeZone,languageCode). Fields omitted from the mask are left unchanged.",
    example: "accountName,timeZone",
  },
};
export const selectAccountMerchantInputs = {
  connection: connectionInput,
};

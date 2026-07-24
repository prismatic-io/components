import { input, util } from "@prismatic-io/spectral";
import {
  jsonInputClean,
  toOptionalString,
  valueListInputClean,
} from "../../util";
import {
  connectionInput,
  fetchAll,
  kind,
  merchantId,
  pagination,
} from "./common";
const view = input({
  label: "View",
  type: "string",
  clean: toOptionalString,
  comments:
    "Controls which fields will be populated. Acceptable values are: 'merchant' and 'css'. The default value is 'merchant'.",
  placeholder: "Select view",
  model: [
    {
      label: "Merchant",
      value: "merchant",
    },
    {
      label: "CSS",
      value: "css",
    },
  ],
  required: false,
});
const label = input({
  label: "Label",
  type: "string",
  clean: toOptionalString,
  comments:
    "If view is set to 'css', only return accounts that are assigned label with given ID.",
  example: "12345",
  placeholder: "Enter Label ID",
  required: false,
});
const name = input({
  label: "Name",
  type: "string",
  clean: toOptionalString,
  comments:
    "If set, only the accounts with the given name (case sensitive) will be returned.",
  example: "My Account Name",
  placeholder: "Enter Account Name",
  required: false,
});
const accountId = input({
  label: "Account ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Merchant Center account ID. For single merchant accounts, this is the same as merchantId. For multi-client accounts, this represents a specific sub-account ID. Found in Merchant Center settings.",
  example: "987654321",
  placeholder: "Enter Account ID",
  required: true,
  dataSource: "selectAccount",
});
const websiteUrl = input({
  label: "Website URL",
  type: "string",
  clean: util.types.toString,
  comments: "The merchant's website.",
  example: "https://www.example.com",
  placeholder: "Enter Website URL",
  required: true,
});
const adultContent = input({
  label: "Adult Content",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, indicates the merchant sells adult content.",
  required: true,
});
const sellerId = input({
  label: "Seller ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Client-specific, locally-unique, internal ID for the child account.",
  example: "SELLER-12345",
  placeholder: "Enter Seller ID",
  required: true,
});
const cssId = input({
  label: "CSS ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "ID of the CSS (Comparison Shopping Service) that the account belongs to. CSS is a program allowing third-party shopping comparison services to display product listings. Only applicable for CSS-managed accounts.",
  example: "98765",
  placeholder: "Enter CSS ID",
  required: true,
});
const labelIds = input({
  label: "Label IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Manually created label IDs that are assigned to the account by CSS.",
  example: "12345",
  placeholder: "Enter Label IDs",
  clean: valueListInputClean,
});
export const productHighlights = input({
  label: "Product Highlights",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Bullet points describing the most relevant highlights of a product.",
  example: "Made from 100% organic cotton",
  placeholder: "Enter Product Highlights",
  clean: valueListInputClean,
});
const accountManagement = input({
  label: "Account Management",
  type: "string",
  clean: toOptionalString,
  comments: "Specifies whether account management is manual or automatic.",
  placeholder: "Select management type",
  model: [
    {
      label: "Manual",
      value: "manual",
    },
    {
      label: "Automatic",
      value: "automatic",
    },
  ],
  required: false,
});
const automaticLabelIds = input({
  label: "Automatic Label IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Automatically created label IDs that are assigned to the account by CSS Center.",
  example: "67890",
  placeholder: "Enter Automatic Label IDs",
  clean: valueListInputClean,
});
const users = input({
  label: "User",
  type: "code",
  language: "json",
  comments:
    "Users with access to the account. Every account (except for subaccounts) must have at least one admin user.",
  example: JSON.stringify([
    {
      emailAddress: "string",
      admin: true,
      orderManager: false,
      paymentsManager: false,
      paymentsAnalyst: false,
      reportingManager: false,
    },
  ]),
  clean: jsonInputClean,
});
const youtubeChannelLinks = input({
  label: "YouTube Channel Links",
  type: "code",
  language: "json",
  comments:
    "Linked YouTube channels that are active or pending approval. To create a new link request, add a new link with status active to the list. It will remain in a pending state until approved or rejected in the YT Creator Studio interface. To delete an active link, or to cancel a link request, remove it from the list.",
  example: JSON.stringify([
    {
      channelId: "string",
      status: "string",
    },
  ]),
  clean: jsonInputClean,
});
const googleMyBusinessLink = input({
  label: "Google My Business Link",
  type: "code",
  language: "json",
  comments:
    "The Business Profile which is linked or in the process of being linked with the Merchant Center account.",
  example: JSON.stringify({
    gmbEmail: "string",
    status: "string",
    gmbAccountId: "string",
  }),
  clean: jsonInputClean,
});
const businessInformation = input({
  label: "Business Information",
  type: "code",
  language: "json",
  comments:
    "The account's business details, including physical address, phone number, customer service contacts, and business registration numbers.",
  example: JSON.stringify({
    address: {
      streetAddress: "string",
      locality: "string",
      region: "string",
      postalCode: "string",
      country: "string",
    },
    phoneNumber: "string",
    phoneVerificationStatus: "string",
    customerService: {
      url: "string",
      email: "string",
      phoneNumber: "string",
    },
    koreanBusinessRegistrationNumber: "string",
  }),
  clean: jsonInputClean,
});
const automaticImprovements = input({
  label: "Automatic Improvements",
  type: "code",
  language: "json",
  comments:
    "The automatic improvements of the account can be used to automatically update items, improve images and shipping. Each section inside AutomaticImprovements is updated separately.",
  example: JSON.stringify({
    itemUpdates: {
      accountItemUpdatesSettings: {
        allowPriceUpdates: false,
        allowAvailabilityUpdates: false,
        allowStrictAvailabilityUpdates: false,
        allowConditionUpdates: false,
      },
      effectiveAllowPriceUpdates: false,
      effectiveAllowAvailabilityUpdates: false,
      effectiveAllowStrictAvailabilityUpdates: false,
      effectiveAllowConditionUpdates: false,
    },
    imageImprovements: {
      accountImageImprovementsSettings: {
        allowAutomaticImageImprovements: false,
      },
      effectiveAllowAutomaticImageImprovements: false,
    },
    shippingImprovements: {
      allowShippingImprovements: false,
    },
  }),
  clean: jsonInputClean,
});
const adsLinks = input({
  label: "Ads Links",
  type: "code",
  language: "json",
  comments:
    "Linked Ads accounts that are active or pending approval. To create a new link request, add a new link with status active to the list. It will remain in a pending state until approved or rejected either in the Ads interface or through the Google Ads API. To delete an active link, or to cancel a link request, remove it from the list.",
  example: JSON.stringify([
    {
      adsId: "string",
      status: "string",
    },
  ]),
  clean: jsonInputClean,
});
const conversionSettings = input({
  label: "Conversion Settings",
  type: "code",
  language: "json",
  comments: "Settings for conversion tracking.",
  example: JSON.stringify({
    freeListingsAutoTaggingEnabled: false,
  }),
  clean: jsonInputClean,
});
const accountWriteInputs = {
  name: {
    ...name,
    comments: "Display name for the account.",
    required: true,
    clean: util.types.toString,
  },
  kind,
  websiteUrl,
  adultContent,
  sellerId,
  users,
  youtubeChannelLinks,
  googleMyBusinessLink,
  businessInformation,
  automaticImprovements,
  adsLinks,
  cssId,
  labelIds,
  accountManagement,
  automaticLabelIds,
  conversionSettings,
};
export const createAccountInputs = {
  connectionInput,
  merchantId,
  ...accountWriteInputs,
};
export const deleteAccountInputs = {
  connectionInput,
  merchantId,
  accountId,
};
export const getAccountInputs = {
  connectionInput,
  merchantId,
  accountId,
  view,
};
export const listAccountsInputs = {
  connectionInput,
  merchantId,
  fetchAll,
  pagination,
  view,
  label,
  name,
};
export const updateAccountInputs = {
  connectionInput,
  merchantId,
  accountId,
  ...accountWriteInputs,
};
export const selectAccountInputs = {
  connection: connectionInput,
  merchantId: {
    ...merchantId,
    comments:
      "The ID of the managing account. Used to list sub-accounts under this merchant.",
  },
};

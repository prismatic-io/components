import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import {
  BASE_URL,
  DELIVERY_MODE,
  QUERY_TYPES,
  SHARE_STATUS,
  VERIFICATION_STATUS,
  WEBHOOK_EVENT_TYPES,
} from "./constants";
import { asStringArray, toOptionalNumber, toOptionalString } from "./util";

const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});


const cardId = input({
  label: "Card ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the card.",
  example: "73791e85-09f5-4098-983c-e677a8bd123b",
  placeholder: "Enter a card ID",
  dataSource: "selectCard",
  clean: util.types.toString,
});

const cardTitle = input({
  label: "Card Title",
  type: "string",
  required: true,
  comments: "The title of the card.",
  example: "My Card Title",
  placeholder: "Enter a card title",
  clean: util.types.toString,
});

const cardContent = input({
  label: "Card Content",
  type: "string",
  required: true,
  comments: "The content/body of the card.",
  example: "Subject: Welcome! Hello [Name].",
  placeholder: "Enter card content",
  clean: util.types.toString,
});

const shareStatus = input({
  label: "Share Status",
  type: "string",
  required: false,
  model: SHARE_STATUS,
  default: "TEAM",
  comments: "The sharing status of the card.",
  placeholder: "Select a share status",
  clean: toOptionalString,
});


const collectionId = input({
  label: "Collection ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the collection.",
  example: "0ea16439-ba25-4dca-a1b4-15861a9b123f",
  placeholder: "Enter a collection ID",
  dataSource: "selectCollection",
  clean: util.types.toString,
});


const folderId = input({
  label: "Folder ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the folder.",
  example: "8b7bd513-9910-4116-989e-9a0ed9339380",
  dataSource: "selectFolder",
  placeholder: "Enter a folder ID",
  clean: util.types.toString,
});

const folderTitle = input({
  label: "Folder Title",
  type: "string",
  required: true,
  comments: "The title of the folder.",
  example: "My Folder",
  placeholder: "Enter a folder title",
  clean: util.types.toString,
});

const folderDescription = input({
  label: "Folder Description",
  type: "string",
  required: false,
  comments: "A description of the folder.",
  example: "This folder contains...",
  placeholder: "Enter a folder description",
  clean: toOptionalString,
});

const parentFolder = input({
  label: "Parent Folder ID",
  type: "string",
  required: false,
  comments: "The ID of the parent folder (optional for nested folders).",
  example: "a350b7c1-e0d2-43b1-8e49-fc4d123b31a7",
  dataSource: "selectFolder",
  placeholder: "Enter a parent folder ID",
  clean: toOptionalString,
});


const verificationStatus = input({
  label: "Verification Status",
  type: "string",
  required: false,
  model: VERIFICATION_STATUS,
  comments: "The verification status to set for the card.",
  placeholder: "Select a verification status",
  example: "VERIFIED",
  clean: toOptionalString,
});

const verificationReason = input({
  label: "Verification Reason",
  type: "string",
  required: false,
  comments: "Optional reason for the verification status.",
  example: "Information is current and accurate",
  placeholder: "Enter a verification reason",
  clean: toOptionalString,
});


const additionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments: "Additional properties to include in the request.",
  example: JSON.stringify(
    {
      verificationInterval: 90,
      tags: ["important", "updated"],
      customField: "value",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Fetch all records using pagination.",
  clean: util.types.toBool,
});


const targetUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments: "The URL where webhook events will be sent.",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});

const webhookEventTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  model: WEBHOOK_EVENT_TYPES,
  default: ["card-created", "card-updated"],
  placeholder: "Select event types",
  comments:
    "Select which event types should trigger the webhook. <strong>Important:</strong> Max 10 event types can be selected.",
  clean: asStringArray,
});

const webhookActive = input({
  label: "Active",
  type: "boolean",
  required: false,
  default: "true",
  comments: "Whether the webhook subscription is active.",
  clean: util.types.toBool,
});

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the webhook.",
  example: "969123fb-6436-4a4e-8a78-20d79ff43804",
  placeholder: "Enter webhook ID",
  clean: util.types.toString,
});


export const createCardInputs = {
  connection: connectionInput,
  cardTitle,
  cardContent,
  collectionId,
  shareStatus,
  additionalProperties: {
    ...additionalProperties,
    example: JSON.stringify({ verificationInterval: "90" }),
  },
};

export const updateCardInputs = {
  connection: connectionInput,
  cardId,
  cardTitle: { ...cardTitle, required: false, clean: toOptionalString },
  cardContent: { ...cardContent, required: false, clean: toOptionalString },
  shareStatus: {
    ...shareStatus,
    required: false,
    clean: toOptionalString,
    default: undefined,
  },
  additionalProperties,
};

export const getCardInputs = {
  connection: connectionInput,
  cardId,
};

export const deleteCardInputs = {
  connection: connectionInput,
  cardId,
};

export const verifyCardInputs = {
  connection: connectionInput,
  cardId,
  verificationStatus,
  verificationReason,
};

export const unverifyCardInputs = {
  connection: connectionInput,
  cardId,
  verificationReason,
};

export const getCardFoldersInputs = {
  connection: connectionInput,
  cardId,
};

export const listCardVerifiersInputs = {
  connection: connectionInput,
  cardId,
};

export const createFolderInputs = {
  connection: connectionInput,
  folderTitle,
  collectionId,
  folderDescription,
  parentFolder,
};

export const updateFolderInputs = {
  connection: connectionInput,
  folderId,
  folderTitle: { ...folderTitle, required: false, clean: toOptionalString },
  folderDescription,
  parentFolder,
};

export const getFolderInputs = {
  connection: connectionInput,
  folderId,
};

export const deleteFolderInputs = {
  connection: connectionInput,
  folderId,
};

export const getFolderItemsInputs = {
  connection: connectionInput,
  folderId,
  fetchAll: {
    ...fetchAll,
    comments: "Turn on to fetch more than 50 folders.",
  },
};

const searchTerms = input({
  label: "Search Terms",
  type: "string",
  required: true,
  comments: "Search terms to use in the search.",
  example: "user guide tutorial",
  placeholder: "Enter search terms",
  clean: util.types.toString,
});

export const searchFoldersInputs = {
  connection: connectionInput,
  searchTerms,
  collectionId: { ...collectionId, required: false, clean: toOptionalString },
};

export const getCollectionInputs = {
  connection: connectionInput,
  collectionId,
};

export const listCollectionGroupAccessInputs = {
  connection: connectionInput,
  collectionId,
};

const q = input({
  label: "Query",
  type: "string",
  required: false,
  comments:
    "Advanced query using [Guru query language](https://developer.getguru.com/docs/guru-query-language) syntax.",
  example: "title:guide AND author:john",
  placeholder: "Enter query language syntax",
  clean: toOptionalString,
});

const queryType = input({
  label: "Query Type",
  type: "string",
  required: false,
  comments: "The type of query to search for.",
  model: QUERY_TYPES,
  default: "cards",
  example: "cards",
  placeholder: "Select a query type",
  clean: toOptionalString,
});

const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  comments: "The maximum number of results to return.",
  example: "50",
  placeholder: "Enter max results",
  clean: toOptionalNumber,
});

export const searchCardsInputs = {
  connection: connectionInput,
  q,
  searchTerms: { ...searchTerms, required: false, clean: toOptionalString },
  queryType,
  maxResults,
  fetchAll: {
    ...fetchAll,
    comments: "Turn on to fetch more than 50 cards.",
  },
};

const search = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "The search term to use in the search.",
  example: "user guide tutorial",
  placeholder: "Enter search term",
  clean: toOptionalString,
});

export const listFoldersInputs = {
  connection: connectionInput,
  q,
  search,
  fetchAll: {
    ...fetchAll,
    comments: "Turn on to fetch more than 110 folders.",
  },
};

const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The user's last name.",
  example: "Doe",
  placeholder: "Enter last name",
  clean: util.types.toString,
});

const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The user's first name.",
  example: "John",
  placeholder: "Enter first name",
  clean: util.types.toString,
});

const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments:
    "The user's email address. <strong>Important:</strong> Must be an existing Guru user.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

const groupId = input({
  label: "Group ID",
  type: "string",
  required: true,
  comments: "The ID of the group.",
  example: "5f123b24-a3dc-4cc9-9f5a-d78fc1ffa43f",
  placeholder: "Enter group ID",
  dataSource: "selectUserGroup",
  clean: util.types.toString,
});

export const addUserGroupMemberInputs = {
  connection: connectionInput,
  firstName,
  lastName,
  email,
  groupId,
};

const memberId = input({
  label: "Member ID",
  type: "string",
  required: true,
  comments: "The ID of the member.",
  example: "john.doe@example.com",
  placeholder: "Enter member ID",
  clean: util.types.toString,
});

export const deleteUserGroupMemberInputs = {
  connection: connectionInput,
  groupId,
  memberId,
};

export const listUserGroupsInputs = {
  connection: connectionInput,
};

export const whoAmIInputs = {
  connection: connectionInput,
};

export const listTeamMembersInputs = {
  connection: connectionInput,
  search,
  fetchAll: {
    ...fetchAll,
    comments: "Turn on to fetch more than 50 members.",
  },
};

export const listCollectionsInputs = {
  connection: connectionInput,
  search,
};

const teamId = input({
  label: "Team ID",
  type: "string",
  required: true,
  comments: "The ID of the team.",
  example: "5f123b24-a3dc-4cc9-9f5a-d78fc1ffa43f",
  placeholder: "Enter team ID",
  clean: util.types.toString,
});

const fromDate = input({
  label: "From Date",
  type: "string",
  required: false,
  comments: "The start date of the time range in YYYY-MM-DD format.",
  example: "2024-01-01",
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: toOptionalString,
});

const toDate = input({
  label: "To Date",
  type: "string",
  required: false,
  comments: "The end date of the time range in YYYY-MM-DD format.",
  example: "2024-12-31",
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: toOptionalString,
});

export const getTeamAnalyticsInputs = {
  connection: connectionInput,
  teamId,
  fromDate,
  toDate,
  fetchAll: {
    ...fetchAll,
    comments: "Turn on to fetch more than 500 events.",
  },
};

const deliveryMode = input({
  label: "Delivery Mode",
  type: "string",
  required: true,
  comments: "The delivery mode of the webhook subscription.",
  model: DELIVERY_MODE,
  default: "BATCH",
  placeholder: "Select a delivery mode",
  clean: util.types.toString,
});

export const createWebhookSubscriptionInputs = {
  connection: connectionInput,
  targetUrl,
  webhookEventTypes,
  webhookActive,
  deliveryMode,
};

export const webhookInputs = {
  connection: connectionInput,
  webhookEventTypes,
  webhookActive,
  deliveryMode,
};

export const updateWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookId,
  targetUrl,
  webhookEventTypes,
  webhookActive,
  deliveryMode,
};

export const deleteWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookId,
};

export const getWebhookSubscriptionInputs = {
  connection: connectionInput,
  webhookId,
};

export const listWebhookSubscriptionsInputs = {
  connection: connectionInput,
};

export const deleteAllWebhookSubscriptionsInputs = {
  connection: connectionInput,
};

const testData = input({
  label: "Test Data",
  type: "code",
  language: "json",
  required: true,
  comments: "The data to send to the webhook.",
  example: JSON.stringify(
    {
      id: "64753163-9817-4500-9651-96177c32e3d1",
      eventType: "card-created",
      user: "bob@getguru.com",
      eventDate: "2021-04-13T13:53:00.000+0000",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const testWebhookInputs = {
  connection: connectionInput,
  webhookId,
  testData,
};

const { debugRequest: _, ...destructuredInputs } = httpClientInputs;
export const rawRequestInputs: {
  connection: typeof connectionInput;
} & Omit<typeof httpClientInputs, "debugRequest"> = {
  connection: connectionInput,
  ...destructuredInputs,
  url: {
    ...destructuredInputs.url,
    comments: `Input the path only (/cards), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/cards, only /cards is entered in this field.`,
    example: "/cards",
  },
};


export const selectCardInputs = {
  connection: connectionInput,
  q,
  searchTerms: { ...searchTerms, required: false, clean: toOptionalString },
  queryType,
};

export const selectCollectionInputs = {
  connection: connectionInput,
  search,
};

export const selectFolderInputs = {
  connection: connectionInput,
  q,
  search,
};

export const selectMemberInputs = {
  connection: connectionInput,
  search,
};

export const selectUserGroupInputs = {
  connection: connectionInput,
};

export const selectWebhookSubscriptionInputs = {
  connection: connectionInput,
};

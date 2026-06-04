import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput, cleanStringInput } from "./utils";
import { ID_CONSTRAINTS_TEXT } from "./constants";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The connection to use for Gmail authorization.",
});

export const userIdInput = input({
  label: "Gmail User ID",
  type: "string",
  required: false,
  placeholder: "Enter user ID or email",
  example: "me",
  default: "me",
  clean: (val) => util.types.toString(val, "me"),
  comments:
    "The user ID or email address to query. Use 'me' for the currently authenticated user (default).",
});

export const messageIdInput = input({
  label: "Message ID",
  type: "string",
  required: true,
  placeholder: "Enter message ID",
  clean: util.types.toString,
  example: "18c1e2a4b5f6g7h8",
  comments: "The unique identifier of the Gmail message.",
  dataSource: "selectMessage",
});

export const topicNameInput = input({
  label: "Topic Name",
  type: "string",
  required: true,
  placeholder: "Enter Pub/Sub topic name",
  clean: util.types.toString,
  example: "projects/my-project-123456/topics/gmail-notifications",
  comments: "The full Pub/Sub topic name in the format: projects/{project-id}/topics/{topic-id}",
});

export const labelIdsInput = input({
  label: "Label ID",
  type: "string",
  collection: "valuelist",
  placeholder: "Select label IDs",
  comments:
    "Gmail labels to filter notifications. System labels (INBOX, SENT, DRAFT, etc.) correspond to pre-defined elements in the Gmail interface.",
  example: '["INBOX", "IMPORTANT"]',
  dataSource: "selectLabel",
  required: true,
  clean: (value: unknown) => (value as unknown[]).map((val: unknown) => util.types.toString(val)),
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, fetches all pages of results using pagination.",
  default: "false",
  clean: util.types.toBool,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  required: false,
  placeholder: "Enter maximum number of results",
  example: "100",
  comments: "The maximum number of results to return per page.",
  clean: cleanNumberInput,
});

export const addMetadata = input({
  label: "Add Metadata",
  type: "boolean",
  required: false,
  comments:
    "When true, includes additional metadata for each message. This will increase response time.",
  default: "false",
  clean: util.types.toBool,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  placeholder: "Enter page token from previous response",
  clean: (val) => util.types.toString(val) || undefined,
  required: false,
  comments: "Page token from the previous response when looping through paginated results.",
  example: "09876543210abcdefg",
});

export const query = input({
  label: "Query String",
  type: "string",
  placeholder: "Enter search query",
  clean: (val) => util.types.toString(val) || undefined,
  required: false,
  comments:
    "Filter messages using Gmail search syntax. Supports the same query format as the Gmail search box.",
  example: "from:user@example.com is:unread after:2024/01/01",
});

export const labelIds = input({
  label: "Labels",
  type: "string",
  collection: "valuelist",
  dataSource: "selectLabel",
  placeholder: "Select labels",
  comments: "Filter messages by Gmail label IDs.",
  example: '["INBOX", "UNREAD"]',
  clean: (values) =>
    ((values as unknown[]) || []).map((value: unknown) => util.types.toString(value)),
});

export const from = input({
  label: "From",
  type: "string",
  required: false,
  comments:
    "The sender email address or alias. This is the email address that will appear in the From field.",
  placeholder: "Enter sender email address",
  example: "John Doe <john.doe@example.com>",
  clean: cleanStringInput,
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  clean: util.types.toString,
  comments: "The Google Cloud project ID containing the Pub/Sub resources.",
  required: true,
  example: "my-gcp-project-123456",
  placeholder: "Enter project ID",
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  clean: util.types.toString,
  comments: `The ID of the subscription to be created. ${ID_CONSTRAINTS_TEXT}`,
  required: true,
  example: "my-subscription-123456",
  placeholder: "Enter subscription ID",
});

export const topicId = input({
  label: "Topic ID",
  type: "string",
  clean: util.types.toString,
  comments: `The ID of the Pub/Sub topic to be created. ${ID_CONSTRAINTS_TEXT}`,
  required: true,
  example: "my-topic-123456",
  placeholder: "Enter topic ID",
});

const historyId = input({
  label: "History ID",
  type: "string",
  required: true,
  placeholder: "Enter history ID",
  example: "9876543210",
  comments: "The history ID to start retrieving history records from.",
  clean: util.types.toString,
});

export const getEventHistoryInputs = {
  connection: connectionInput,
  userId: userIdInput,
  historyId,
  pageToken: {
    ...pageToken,
    comments:
      "Page token from the previous response when looping through paginated history results.",
  },
  fetchAll,
  maxResults,
};

const labelId = input({
  label: "Label ID",
  type: "string",
  required: false,
  placeholder: "Enter label ID",
  comments: "The label ID to filter history messages by.",
  example: "INBOX",
  dataSource: "selectLabel",
  clean: cleanStringInput,
});

const getMessageDetails = input({
  label: "Get Message Details",
  type: "boolean",
  required: false,
  comments:
    "When true, includes the message details in the response. <b>This will increase response time.</b>",
  default: "false",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  userId: userIdInput,
  labelId,
  getMessageDetails,
};

export const getWatchStatusInputs = {
  expiration: input({
    label: "Watch Expiration",
    type: "string",
    required: true,
    placeholder: "Enter watch expiration timestamp",
    comments: "The expiration timestamp (in milliseconds) from a previous Gmail watch response.",
    example: "1704153600000",
    clean: util.types.toString,
  }),
};

export const pushNotificationWebhookInputs = {
  connection: connectionInput,
  projectId,
  topicId,
  subscriptionId,
  labelIds: labelIdsInput,
  userId: userIdInput,
};

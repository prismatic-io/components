import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The connection to use for authenticating requests to Google Cloud Pub/Sub.",
});

export const version = input({
  label: "API Version",
  type: "string",
  clean: util.types.toString,
  default: "v1",
  comments: "The API version to use for constructing the base URL for requests.",
  required: false,
  example: "v1",
  placeholder: "Enter API version",
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

export const topic = input({
  label: "Topic",
  type: "string",
  clean: util.types.toString,
  comments:
    "The name of the topic. Can be either the topic name (e.g., 'my-topic') or the full resource path (e.g., 'projects/my-project/topics/my-topic').",
  required: true,
  example: "my-topic",
  placeholder: "Enter topic name",
  dataSource: "topics",
});

export const subscription = input({
  label: "Subscription",
  type: "string",
  clean: util.types.toString,
  comments:
    "The name of the subscription. Can be either the subscription name (e.g., 'my-subscription') or the full resource path (e.g., 'projects/my-project/subscriptions/my-subscription').",
  required: true,
  example: "my-subscription",
  placeholder: "Enter subscription name",
  dataSource: "subscriptions",
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  clean: util.types.toString,
  comments: "The page token returned by a previous list call to request the next page of results.",
  required: false,
  example: "DBsPVgscdHRpdWhSGwQLQVd-",
  placeholder: "Enter page token",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  clean: util.types.toInt,
  comments: "The maximum number of results to return per page.",
  required: false,
  example: "100",
  placeholder: "Enter page size",
});

export const labels = input({
  label: "Labels",
  type: "code",
  language: "json",
  comments:
    "Labels to organize and group resources. See [Creating and Updating Labels](https://cloud.google.com/pubsub/docs/labels) for more information.",
  example: JSON.stringify(
    {
      environment: "production",
      team: "engineering",
      cost_center: "cc-1234",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const satisfiesPzs = input({
  label: "Satisfies PZS",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, indicates the topic satisfies physical zone separation. This is an output-only field reserved for future use.",
  required: false,
  default: "false",
});

export const messageStoragePolicy = input({
  label: "Message Storage Policy",
  type: "code",
  language: "json",
  comments:
    "Policy constraining the Google Cloud regions where messages may be stored. See [Message Storage Policy](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#MessageStoragePolicy) for more information.",
  example: JSON.stringify(
    {
      allowedPersistenceRegions: ["us-east1", "us-west1", "europe-west1"],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const kmsKeyName = input({
  label: "KMS Key Name",
  type: "string",
  clean: util.types.toString,
  comments:
    "The resource name of the Cloud KMS CryptoKey used to protect access to messages published on this topic. See [Customer-Managed Encryption Keys](https://cloud.google.com/pubsub/docs/cmek) for more information.",
  required: false,
  example: "projects/my-project/locations/us-east1/keyRings/my-keyring/cryptoKeys/my-key",
  placeholder: "Enter KMS key resource name",
});

export const schemaSettings = input({
  label: "Schema Settings",
  type: "code",
  language: "json",
  comments:
    "Settings for validating messages against a schema. See [Schema Settings](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#SchemaSettings) for more information.",
  example: JSON.stringify(
    {
      schema: "projects/my-project/schemas/my-schema",
      encoding: "JSON",
      firstRevisionId: "1a2b3c4d",
      lastRevisionId: "5e6f7g8h",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const messageRetentionDuration = input({
  label: "Message Retention Duration",
  type: "string",
  clean: util.types.toString,
  comments:
    "The minimum duration to retain a message after publication. Must be between 10 minutes (600s) and 31 days (2678400s). Format: duration in seconds with up to nine fractional digits, ending with 's' (e.g., '3600s' for 1 hour).",
  required: false,
  example: "86400s",
  placeholder: "Enter duration (e.g., 86400s)",
});

export const updateMask = input({
  label: "Update Mask",
  type: "string",
  clean: util.types.toString,
  comments:
    "Comma-separated list of field paths to update. See [Field Masks](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics/patch#query-parameters) for more information.",
  required: true,
  example: "labels,messageRetentionDuration",
  placeholder: "Enter comma-separated field paths",
});

export const resource = input({
  label: "Resource",
  type: "string",
  clean: util.types.toString,
  comments:
    "The resource name for which the policy is being requested. See [Resource Names](https://cloud.google.com/apis/design/resource_names) for more information.",
  required: true,
  example: "projects/my-project/topics/my-topic",
  placeholder: "Enter resource name",
});

export const requestedPolicyVersion = input({
  label: "Requested Policy Version",
  type: "string",
  clean: util.types.toInt,
  comments:
    "The maximum policy version to use for formatting the policy. Valid values are 0, 1, and 3. Policies with conditional bindings must use version 3.",
  required: false,
  example: "3",
  placeholder: "Enter policy version (0, 1, or 3)",
});

export const policy = input({
  label: "Policy",
  type: "code",
  language: "json",
  comments:
    "The complete IAM policy to apply to the resource. See [Policy](https://cloud.google.com/pubsub/docs/reference/rest/v1/Policy) for more information.",
  example: JSON.stringify(
    {
      bindings: [
        {
          role: "roles/pubsub.publisher",
          members: ["serviceAccount:my-service@my-project.iam.gserviceaccount.com"],
        },
      ],
      version: 1,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const pushConfig = input({
  label: "Push Config",
  type: "code",
  language: "json",
  comments:
    "Configuration for push delivery. See [PushConfig](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions#PushConfig) for more information.",
  example: JSON.stringify(
    {
      pushEndpoint: "https://example.com/push",
      attributes: {
        "x-goog-version": "v1",
      },
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const bigqueryConfig = input({
  label: "BigQuery Config",
  type: "code",
  language: "json",
  comments:
    "Configuration for BigQuery delivery. See [BigQueryConfig](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions#BigQueryConfig) for more information.",
  example: JSON.stringify(
    {
      table: "projects/my-project/datasets/my_dataset/tables/my_table",
      useTopicSchema: true,
      writeMetadata: true,
      dropUnknownFields: false,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const cloudStorageConfig = input({
  label: "Cloud Storage Config",
  type: "code",
  language: "json",
  comments:
    "Configuration for Cloud Storage delivery. See [CloudStorageConfig](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions#CloudStorageConfig) for more information.",
  example: JSON.stringify(
    {
      bucket: "my-bucket",
      filenamePrefix: "pubsub-messages/",
      filenameSuffix: ".json",
      maxDuration: "300s",
      maxBytes: 10000000,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const ackDeadlineSeconds = input({
  label: "Ack Deadline Seconds",
  type: "string",
  clean: util.types.toInt,
  comments:
    "The time (in seconds) Pub/Sub waits for acknowledgment before resending the message. Must be between 10 and 600 seconds. Default is 10 seconds if not specified.",
  required: false,
  example: "60",
  placeholder: "Enter acknowledgment deadline in seconds",
});

export const retainAckedMessages = input({
  label: "Retain Acked Messages",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, acknowledged messages are retained in the subscription's backlog until they fall outside the messageRetentionDuration window. Required for seeking to past timestamps.",
  required: false,
  default: "false",
});

export const enableMessageOrdering = input({
  label: "Enable Message Ordering",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, messages with the same orderingKey are delivered to subscribers in the order they are received by Pub/Sub.",
  required: false,
  default: "false",
});

export const expirationPolicy = input({
  label: "Expiration Policy",
  type: "code",
  language: "json",
  comments:
    "Policy specifying when the subscription expires. Default TTL is 31 days if not set. See [ExpirationPolicy](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions#ExpirationPolicy) for more information.",
  example: JSON.stringify(
    {
      ttl: "2678400s",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const filter = input({
  label: "Filter",
  type: "string",
  clean: util.types.toString,
  comments:
    "A filter expression to select which messages are delivered. See [Filtering Messages](https://cloud.google.com/pubsub/docs/filtering) for syntax.",
  required: false,
  example: 'attributes.environment = "production"',
  placeholder: "Enter filter expression",
});

export const deadLetterPolicy = input({
  label: "Dead Letter Policy",
  type: "code",
  language: "json",
  comments:
    "Policy for dead lettering undeliverable messages. See [Dead Letter Topics](https://cloud.google.com/pubsub/docs/dead-letter-topics) for more information.",
  example: JSON.stringify(
    {
      deadLetterTopic: "projects/my-project/topics/dead-letter-topic",
      maxDeliveryAttempts: 5,
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const retryPolicy = input({
  label: "Retry Policy",
  type: "code",
  language: "json",
  comments:
    "Policy for retrying message delivery. See [RetryPolicy](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.subscriptions#RetryPolicy) for more information.",
  example: JSON.stringify(
    {
      minimumBackoff: "10s",
      maximumBackoff: "600s",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const detached = input({
  label: "Detached",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the subscription is detached from its topic and will not receive messages or retain backlog.",
  required: false,
  default: "false",
});

export const enableExactlyOnceDelivery = input({
  label: "Enable Exactly Once Delivery",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, Pub/Sub guarantees exactly-once delivery semantics for messages on this subscription.",
  required: false,
  default: "false",
});

export const topicMessageRetentionDuration = input({
  label: "Topic Message Retention Duration",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output-only field indicating the minimum duration messages are retained in the topic. Format: duration in seconds ending with 's' (e.g., '86400s').",
  required: false,
  example: "86400s",
  placeholder: "Enter duration (e.g., 86400s)",
});

export const state = input({
  label: "State",
  type: "string",
  clean: util.types.toString,
  comments: "Output-only field indicating whether the subscription can receive messages.",
  model: [
    {
      label: "STATE_UNSPECIFIED",
      value: "STATE_UNSPECIFIED",
    },
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "RESOURCE_ERROR",
      value: "RESOURCE_ERROR",
    },
  ],
  example: "ACTIVE",
  placeholder: "Select state",
});

export const pushEndpoint = input({
  label: "Push Endpoint",
  type: "string",
  clean: util.types.toString,
  comments: "The URL endpoint to which messages should be pushed.",
  required: false,
  example: "https://example.com/webhook/pubsub",
  placeholder: "Enter push endpoint URL",
});

export const attributes = input({
  label: "Attributes",
  type: "code",
  language: "json",
  comments:
    "Endpoint configuration attributes for message delivery. The x-goog-version attribute controls the push message format. See [Push Delivery](https://cloud.google.com/pubsub/docs/push) for more information.",
  example: JSON.stringify(
    {
      "x-goog-version": "v1",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const oidcToken = input({
  label: "OIDC Token",
  type: "code",
  language: "json",
  comments:
    "Configuration for generating an OIDC JWT token as an Authorization header for push requests. See [Authentication](https://cloud.google.com/pubsub/docs/push#setting_up_for_push_authentication) for more information.",
  example: JSON.stringify(
    {
      serviceAccountEmail: "my-service-account@my-project.iam.gserviceaccount.com",
      audience: "https://example.com",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const returnImmediately = input({
  label: "Return Immediately",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, the system responds immediately even if no messages are available. <strong>Warning:</strong> Setting this to true adversely impacts performance and is discouraged.",
  required: false,
  default: "false",
});

export const maxMessages = input({
  label: "Max Messages",
  type: "string",
  clean: util.types.toInt,
  comments:
    "The maximum number of messages to return. Must be a positive integer. Pub/Sub may return fewer messages than specified.",
  required: true,
  example: "100",
  placeholder: "Enter maximum number of messages",
});

export const topicNameOrFullFormat = input({
  label: "Topic Name or Full Format",
  type: "string",
  clean: util.types.toBool,
  comments:
    "Select whether the topic input is a full resource path (e.g., 'projects/my-project/topics/my-topic') or just the topic name (e.g., 'my-topic').",
  model: [
    {
      label: "Full Format (projects/projectId/topics/topicName)",
      value: "true",
    },
    {
      label: "Topic Name Only",
      value: "false",
    },
  ],
  required: true,
  placeholder: "Select topic format",
});

export const subscriptionNameOrFullFormat = input({
  label: "Subscription Name or Full Format",
  type: "string",
  clean: util.types.toBool,
  comments:
    "Select whether the subscription input is a full resource path (e.g., 'projects/my-project/subscriptions/my-subscription') or just the subscription name (e.g., 'my-subscription').",
  model: [
    {
      label: "Full Format (projects/projectId/subscriptions/subscriptionName)",
      value: "true",
    },
    {
      label: "Subscription Name Only",
      value: "false",
    },
  ],
  required: true,
  placeholder: "Select subscription format",
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The URL endpoint to which messages are sent. This is typically the webhook URL of a sibling flow.",
  clean: util.types.toString,
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  placeholder: "Enter webhook URL",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, fetches all pages of results using pagination.",
  default: "false",
});

export const listSubscriptionsInputs = {
  connectionInput,
  projectId,
  fetchAll,
  pageToken: {
    ...pageToken,
    comments:
      "The value returned by the last ListSubscriptionsResponse; indicates that this is a continuation of a prior subscriptions.list call, and that the system should return the next page of data.",
  },
  pageSize: {
    ...pageSize,
    comments: "Maximum number of subscriptions to return.",
  },
};

export const listTopicsInputs = {
  connectionInput,
  projectId,
  fetchAll,
  pageToken,
  pageSize,
};

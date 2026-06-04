import { input, util } from "@prismatic-io/spectral";

export const subscriptionId = input({
  label: "Subscription ID",
  comments:
    "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectSubscription",
});

export const resourceGroupName = input({
  label: "Resource Group Name",
  comments: "Name of the Resource group within the Azure subscription.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const namespaceName = input({
  label: "Namespace Name",
  comments: "The namespace name",
  type: "string",
  required: true,
  clean: (value: unknown) => {
    const data = util.types.toString(value);
    return data.replace(/\s/g, "-");
  },
  dataSource: "selectNamespaceByResourceGroup",
});

export const queueName = input({
  label: "Queue Name",
  comments: "The queue name.",
  type: "string",
  required: true,
  clean: (value: unknown) => {
    const data = util.types.toString(value);
    return data.replace(/\s/g, "-");
  },
  dataSource: "selectQueue",
});

export const topicName = input({
  label: "Topic Name",
  comments: "The topic name.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectTopic",
});

export const subscriptionName = input({
  label: "Subscription Name",
  comments: "The subscription name.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectSubscriptionByTopic",
});

export const ruleName = input({
  label: "Rule Name",
  comments: "The rule name.",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectRule",
});

export const $skip = input({
  label: "Skip",
  comments:
    "Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const $top = input({
  label: "Top",
  comments:
    "May be used to limit the number of results to the most recent N usageDetails.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const autoDeleteOnIdle = input({
  label: "Auto Delete On Idle",
  comments:
    "ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const defaultMessageTimeToLive = input({
  label: "Default Message Time To Live",
  comments:
    "ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const duplicateDetectionHistoryTimeWindow = input({
  label: "Duplicate Detection History Time Window",
  comments:
    "ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const enableBatchedOperations = input({
  label: "Enable Batched Operations",
  comments:
    "Value that indicates whether server-side batched operations are enabled.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const enableExpress = input({
  label: "Enable Express",
  comments:
    "Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const enablePartitioning = input({
  label: "Enable Partitioning",
  comments:
    "Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const maxMessageSizeInKilobytes = input({
  label: "Max Message Size in Kilobytes",
  comments:
    "Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today, and the default is 1024.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const maxSizeInMegabytes = input({
  label: "Max Size in Megabytes",
  comments:
    "Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const requiresDuplicateDetection = input({
  label: "Requires Duplicate Detection",
  comments: "Value indicating if this topic requires duplicate detection.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const status = input({
  label: "Status",
  comments: "Status of the messaging entity.",
  type: "string",
  required: false,
  clean: util.types.toString,
  example:
    "Use one: Active, Disabled, Restoring, SendDisabled, ReceiveDisabled, Creating, Deleting, Renaming ,Unknown",
});

export const supportOrdering = input({
  label: "Support Ordering",
  comments: "Value that indicates whether the topic supports ordering.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const clientId = input({
  label: "Client ID",
  comments:
    "Indicates the Client ID of the application that created the client-affine subscription.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const isDurable = input({
  label: "Is Durable",
  comments:
    "For client-affine subscriptions, this value indicates whether the subscription is durable or not.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const isShared = input({
  label: "Is Shared",
  comments:
    "For client-affine subscriptions, this value indicates whether the subscription is shared or not.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const deadLetteringOnFilterEvaluationExceptions = input({
  label: "Dead Lettering On Filter Evaluation Exceptions",
  comments:
    "Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const deadLetteringOnMessageExpiration = input({
  label: "Dead Lettering On Message Expiration",
  comments:
    "Value that indicates whether a subscription has dead letter support when a message expires.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const forwardDeadLetteredMessagesTo = input({
  label: "Forward Dead Lettered Messages To",
  comments: "Queue/Topic name to forward the Dead Letter message.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const forwardTo = input({
  label: "Forward To",
  comments: "Queue/Topic name to forward the messages.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const isClientAffine = input({
  label: "Is Client Affine",
  comments:
    "Value that indicates whether the subscription has an affinity to the client id.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const lockDuration = input({
  label: "Lock Duration",
  comments:
    "ISO 8601 lock duration timespan for the subscription. The default value is 1 minute.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const maxDeliveryCount = input({
  label: "Max Delivery Count",
  comments: "Number of maximum deliveries.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const requiresSession = input({
  label: "Requires Session",
  comments:
    "Value indicating if a subscription supports the concept of sessions.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const location = input({
  label: "Location",
  comments: "The geo-location where the resource lives",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const identityType = input({
  label: "Identity Type",
  comments: "Type of managed service identity.",
  type: "string",
  required: true,
  clean: util.types.toString,
  model: [
    {
      label: "None",
      value: "None",
    },
    {
      label: "SystemAssigned",
      value: "SystemAssigned",
    },
    {
      label: "UserAssigned",
      value: "UserAssigned",
    },
    {
      label: "SystemAssigned",
      value: "SystemAssigned",
    },
  ],
});

export const userAssignedIdentities = input({
  label: "Identity User Assigned Identities",
  type: "code",
  language: "json",
  comments: "Properties for User Assigned Identities",
  example: `{
    "<identityId1>": {
      "clientId": "<clientId1>",
      "principalId": "<principalId1>"
    },
    "<identityId2>": {
      "clientId": "<clientId2>",
      "principalId": "<principalId2>"
    }
  }`,
  required: false,
  clean: util.types.toString,
});

export const alternateName = input({
  label: "Alternate Name",
  comments: "Alternate name for the namespace.",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const filterType = input({
  label: "Filter Type",
  comments: "Filter type that is evaluated against a BrokeredMessage.",
  example: "SqlFilter, CorrelationFilter",
  type: "string",
  required: false,
  clean: util.types.toString,
});

export const disableLocalAuth = input({
  label: "Disable Local Auth",
  comments:
    "This property disables SAS authentication for the Service Bus namespace.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const requireInfrastructureEncryption = input({
  label: "Require Infrastructure Encryption",
  comments: "Enable Infrastructure Encryption (Double Encryption)",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const zoneRedundant = input({
  label: "Zone Redundant",
  comments:
    "Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const keySource = input({
  label: "Key Source",
  comments: "Enumerates the possible value of keySource for Encryption",
  type: "string",
  required: false,
  example: "Microsoft.KeyVault",
  clean: util.types.toString,
});

export const keyVaultProperties = input({
  label: "Key Vault Properties",
  type: "code",
  language: "json",
  comments: "Properties of the Key Vault",
  example: `[{
    "identity": {
      "userAssignedIdentity": "<userAssignedIdentityId>"
    },
    "keyName": "<keyName>",
    "keyVaultUri": "<keyVaultUri>",
    "keyVersion": "<keyVersion>"
  }]`,
  required: false,
  clean: util.types.toString,
});

export const privateEndpointConnections = input({
  label: "Private Endpoint Connections",
  type: "code",
  language: "json",
  comments: "List of private endpoint connections.",
  example: `[{
    "id": "<resourceId>",
    "location": "<location>",
    "name": "<resourceName>",
    "properties": {
      "privateEndpoint": {
        // PrivateEndpoint properties
      },
      "privateLinkServiceConnectionState": {
        // ConnectionState properties
      },
      "provisioningState": "<provisioningState>"
    },
    "systemData": {
      // systemData properties
    },
    "type": "<resourceType>"
  }]`,
  required: false,
  clean: util.types.toString,
});

export const sku = input({
  label: "SKU",
  type: "code",
  language: "json",
  comments: "SKU of the namespace.",
  example: `{
    "capacity": 2,
    "name": "<name>",
    "tier": "<tier>"
  }
  `,
  required: false,
  clean: util.types.toString,
});

export const tags = input({
  label: "Tags",
  type: "code",
  language: "json",
  comments: "Resource tags.",
  required: false,
  clean: util.types.toString,
});

export const action = input({
  label: "Action",
  type: "code",
  language: "json",
  comments:
    "Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.",
  example: `{
    "compatibilityLevel": 20,
    "requiresPreprocessing": true,
    "sqlExpression": "MyProperty='ABC'"
  }`,
  required: false,
  clean: util.types.toString,
});

export const correlationFilter = input({
  label: "Correlation Filter",
  type: "code",
  language: "json",
  comments: "Represents the correlation filter expression.",
  example: `{
    "contentType": "application/json",
    "correlationId": "123456",
    "label": "Important Message",
    "messageId": "7890",
    "properties": {},
    "replyTo": "my-reply-queue",
    "replyToSessionId": "session-1",
    "requiresPreprocessing": true,
    "sessionId": "session-123",
    "to": "my-destination"
  }
  `,
  required: false,
  clean: util.types.toString,
});

export const version = input({
  label: "Version",
  type: "string",
  comments: "Version of the API.",
  example: `2016-06-01`,
  default: "2016-06-01",
  required: false,
  clean: util.types.toString,
});

export const sqlFilter = input({
  label: "SQL Filter",
  type: "code",
  language: "json",
  comments:
    "Represents a filter which is a composition of an expression and an action that is executed in the pub/sub pipeline.",
  example: `{
    "compatibilityLevel": 20,
    "requiresPreprocessing": true,
    "sqlExpression": "MyProperty='ABC'"
  }
  `,
  required: false,
  clean: util.types.toString,
});

export const messages = input({
  label: "Messages",
  type: "string",
  collection: "valuelist",
  comments: "List of messages to send to the queue.",
  required: true,
  clean: (value: unknown) => {
    if (Array.isArray(value)) {
      return value;
    }
    return [util.types.toString(value)];
  },
});

export const amountOfMessages = input({
  label: "Amount of Messages",
  comments: "Amount of messages to receive from the queue.",
  type: "string",
  required: true,
  clean: (value: unknown) => util.types.toInt(value, 20),
});

export const maxTimeToWait = input({
  label: "Max Time To Wait",
  comments:
    "Max time to wait (in seconds) for messages to receive from the queue. Default is 60 seconds.",
  type: "string",
  required: true,
  default: "60",
  clean: (value: unknown) => util.types.toNumber(value, 60),
});

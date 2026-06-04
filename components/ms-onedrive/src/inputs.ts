import { input, util } from "@prismatic-io/spectral";
import { cleanExpirationDateTime } from "ms-utils";

export const oneDriveConnection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft OneDrive connection to use.",
});

export const siteId = input({
  label: "Site",
  type: "string",
  required: true,
  example:
    "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bae9019,712a596e-90a1-49e3-9b48-bfa80bee8740",
  placeholder: "Enter site ID",
  comments: "The unique identifier of the SharePoint site.",
  dataSource: "selectSite",
});

export const groupId = input({
  label: "Group",
  type: "string",
  required: true,
  example: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  placeholder: "Enter group ID",
  comments: "The unique identifier of the Microsoft 365 group.",
  dataSource: "listGroups",
});

export const driveId = input({
  label: "Drive",
  type: "string",
  required: true,
  example: "b!t18F8ybsHUq1z3LTz8xvZqP8zaSWjkFNhsME-Fepo75dTf9vQKfeRblBZjoSQrd7",
  placeholder: "Enter drive ID",
  comments: "The unique identifier of the drive.",
  dataSource: "listDrives",
});

export const dir = input({
  label: "Directory",
  type: "string",
  required: true,
  example: "/myFolder/examples",
  placeholder: "Enter directory path",
  comments:
    "The directory path of the file. Use a forward slash (/) to access the root directory.",
});

export const itemId = input({
  label: "Item Id",
  type: "string",
  required: true,
  example: "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK",
  placeholder: "Enter item ID",
  comments: "The unique identifier of the drive item (file or folder).",
  dataSource: "listFilesInDirectory",
});

export const path = input({
  label: "Path",
  type: "string",
  required: true,
  example: "/myfiles/myfile.txt",
  placeholder: "Enter file or folder path",
  comments:
    "The path to the desired SharePoint resource. The root directory does not need to be included.",
});

export const search = input({
  label: "Search",
  type: "string",
  required: true,
  example: "myFile",
  placeholder: "Enter search text",
  comments: "The text to search for within the current drive.",
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  example: "exampleFile.txt",
  placeholder: "Enter file name",
  comments: "The new name for the file.",
});

export const requestBody = input({
  label: "Request Body",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      name: "newFileName.txt",
      description: "Updated file description",
    },
    null,
    2,
  ),
  comments: "The JSON request body for the operation.",
  clean: util.types.toObject,
});

export const userId = input({
  label: "User",
  type: "string",
  required: true,
  example: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  placeholder: "Enter user ID or email",
  comments: "The unique identifier or email address of the user.",
  dataSource: "listUsers",
});

export const fileData = input({
  label: "File Data",
  type: "data",
  required: true,
  comments: "The binary content of the file to upload.",
  clean: util.types.toData,
});

export const values = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Optional key-value pairs to include in the request body.",
});

export const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  example: "3000",
  placeholder: "Enter timeout in milliseconds",
  comments: "The maximum time in milliseconds to wait for a response.",
  clean: util.types.toString,
});

export const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter page size",
  comments: "The maximum number of results to return per page.",
  clean: util.types.toString,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  example: "X%2744537079ghv",
  placeholder: "Enter page token",
  comments: "The token for retrieving the next page of results.",
  clean: util.types.toString,
});

export const changeType = input({
  label: "Change Type",
  type: "string",
  required: true,
  comments:
    "The type of changes that should generate notifications for this subscription. OneDrive only supports 'updated'.",
  example: "updated",
  placeholder: "Select change type",
  default: "updated",
  clean: util.types.toString,
});

export const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments:
    "The URL where webhook notifications will be delivered. Must be accessible from Microsoft Graph.",
  example: "https://contoso.azurewebsites.net/api/webhook-receiver",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "The Microsoft Graph resource path to monitor for changes. See [Microsoft Graph documentation](https://learn.microsoft.com/en-us/graph/api/resources/subscription) for valid resource paths.",
  example: "/me/drive/root",
  placeholder: "Enter resource path",
  clean: util.types.toString,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: true,
  comments:
    "The date and time when the subscription expires in ISO 8601 format. Maximum is 30 days from now for OneDrive resources.",
  example: "2025-12-31T23:59:59.000Z",
  placeholder: "Enter expiration date (ISO 8601)",
  clean: cleanExpirationDateTime,
});

export const clientState = input({
  label: "Client State",
  type: "string",
  required: false,
  comments:
    "An optional validation token that is passed back in each notification for verification purposes.",
  example: "client-specific-validation-token",
  placeholder: "Enter client state token",
  clean: util.types.toString,
});

export const subscriptionId = input({
  label: "Subscription Id",
  type: "string",
  required: true,
  comments: "The unique identifier of the subscription.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  placeholder: "Enter subscription ID",
  dataSource: "selectSubscription",
  clean: util.types.toString,
});

export const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows multiple subscriptions for the same endpoint.",
  clean: util.types.toBool,
});

export const showInstanceSubscriptions = input({
  label: "Show Instance Subscriptions",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, shows only subscriptions associated with this instance.",
  clean: util.types.toBool,
});

export const deltaURL = input({
  label: "Delta URL",
  type: "string",
  required: true,
  comments:
    "The URL to track changes in a driveItem and its children over time. You can also use the @odata.nextLink or @odata.deltaLink from a previous response to resume tracking changes. See [Microsoft Graph delta query documentation](https://learn.microsoft.com/en-us/graph/delta-query-overview).",
  example: "/drives/{drive-id}/root/delta",
  placeholder: "Enter delta URL or token",
  default: "/drives/{drive-id}/root/delta",
  clean: util.types.toString,
});

export const $select = input({
  label: "$select Parameter",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of properties to include in the response. See [Microsoft Graph $select documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#select-parameter).",
  example: "givenName,surname",
  placeholder: "Enter properties to select",
  clean: util.types.toString,
});

export const $expand = input({
  label: "$expand Parameter",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of related resources to include in the response. See [Microsoft Graph $expand documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#expand-parameter).",
  example: "members",
  placeholder: "Enter relationships to expand",
  clean: util.types.toString,
});

export const $top = input({
  label: "$top Parameter",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per page. See [Microsoft Graph $top documentation](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#top-parameter).",
  example: "5",
  placeholder: "Enter maximum results",
  clean: util.types.toString,
});

export const expirationDays = input({
  label: "Expiration Days",
  type: "string",
  comments:
    "Number of days to extend the subscription (1-30). Maximum is 30 days for OneDrive resources.",
  example: "3",
  placeholder: "Enter number of days",
  default: "3",
  required: false,
  clean: (value: unknown) => {
    const days = util.types.toNumber(value);
    return days > 0 && days <= 30 ? days : 3;
  },
});

export const instanceDeployWebhookInputs = {
  oneDriveConnection,
  resource: {
    ...resource,
    comments:
      "The Microsoft Graph resource path to monitor. Examples: /me/drive/root, /drives/{drive-id}/root",
    default: "/me/drive/root",
  },
  changeType: {
    ...changeType,
    comments:
      "The type of changes to monitor. OneDrive primarily supports 'updated'.",
  },
  clientState: {
    ...clientState,
    comments:
      "Optional validation token sent with each notification. Use to verify notifications originate from Microsoft Graph.",
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
    comments:
      "Optional expiration date/time for the subscription. If not provided, defaults to 3 days from now. Maximum is 30 days for OneDrive resources.",
  },
};

export const renewSubscriptionInputs = {
  oneDriveConnection,
  subscriptionId,
  expirationDays,
};

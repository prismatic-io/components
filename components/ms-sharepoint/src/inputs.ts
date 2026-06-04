import { input, util } from "@prismatic-io/spectral";
import { cleanExpirationDateTime } from "ms-utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft SharePoint connection to use.",
});

export const siteId = input({
  label: "Site Id",
  type: "string",
  required: true,
  placeholder: "Enter SharePoint site ID",
  comments: "The unique identifier of a SharePoint site.",
  dataSource: "listSites",
  example:
    "example.sharepoint.com,c45de8832-a4969-479d-aeb2-7nAh8321,48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
});

export const driveId = input({
  label: "Drive",
  type: "string",
  required: true,
  placeholder: "Enter drive ID",
  comments: "The unique identifier of a SharePoint drive.",
  example: "b!WumF-zsD8ku93Y0QqhKM9jVTjPefo6RGrpVCkPpe547Qrf38sox_TYIFuj9sqJhv",
  dataSource: "listDrives",
  clean: util.types.toString,
});

export const folderId = input({
  label: "Folder ID",
  placeholder: "Enter folder ID",
  type: "string",
  required: false,
  example: "01Q7VXAXZW7LCB32ODBRCKZNSJIC544FXU",
  comments: "The unique identifier of a SharePoint folder. Leave empty to use root folder.",
  dataSource: "listFolders",
  clean: (value) => {
    const folderId = util.types.toString(value);
    if (folderId.trim() === "") {
      return "root";
    }
    return folderId;
  },
});

export const listId = input({
  label: "List Id",
  type: "string",
  required: true,
  placeholder: "Enter list ID",
  comments: "The unique identifier of a SharePoint site list.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  dataSource: "selectSiteList",
});

export const itemId = input({
  label: "Item Id",
  type: "string",
  required: true,
  placeholder: "Enter item ID",
  comments: "The unique identifier of a SharePoint item.",
  dataSource: "listItemsInSiteList",
  example: "01Q7VXROAW7LCB32ODBRCKZNSJIC544XAQ",
});

export const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  placeholder: "Enter page limit",
  example: "100",
  comments: "The maximum number of results to return per page.",
  clean: util.types.toNumber,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter pagination token",
  example: "X%2744537079ghv",
  comments: "The token for the desired page from a previous response.",
  clean: util.types.toString,
});

export const optInFields = input({
  label: "Opt In Fields",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  example: "name, description, id",
  comments: "Comma-separated list of fields to return. Overrides the default result set.",
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  placeholder: "Enter file name",
  comments: "The name of the file including extension.",
  example: "reports.csv",
});

export const fileData = input({
  label: "File Data",
  type: "data",
  required: true,
  comments:
    "The file content to upload to SharePoint. Reference a file from a previous step or provide file data.",
  clean: util.types.toData,
});

export const parentId = input({
  label: "Parent Id",
  type: "string",
  required: true,
  placeholder: "Enter parent ID",
  comments: "The unique identifier of the parent folder or drive item.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: true,
  collection: "keyvaluelist",
  placeholder: "Enter field key-value pairs",
  comments:
    "Key-value pairs to set as properties on the drive item. Each key represents a field name and its corresponding value.",
});

export const changeType = input({
  label: "Change Type",
  type: "string",
  required: true,
  placeholder: "Enter change type",
  comments:
    "The type of changes that should generate notifications. Common values: updated, created, deleted.",
  example: "updated",
  default: "updated",
  clean: util.types.toString,
});

export const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  placeholder: "Enter notification URL",
  comments: "The URL where Microsoft Graph will deliver webhook notifications when changes occur.",
  example: "https://contoso.azurewebsites.net/api/webhook-receiver",
  clean: util.types.toString,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  placeholder: "Enter resource path",
  comments: "The Microsoft Graph resource path to monitor for changes.",
  example: "/me/drive/root",
  clean: util.types.toString,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: true,
  placeholder: "Enter expiration date/time",
  comments: "The date and time when the subscription will expire if not updated or renewed.",
  example: "2018-01-01T11:23:00.000Z",
  clean: cleanExpirationDateTime,
});

export const clientState = input({
  label: "Client State",
  type: "string",
  required: false,
  placeholder: "Enter client state value",
  comments:
    "An optional validation token included in each notification to verify the notification source.",
  example: "client-specific string",
  clean: util.types.toString,
});

export const subscriptionId = input({
  label: "Subscription Id",
  type: "string",
  required: true,
  placeholder: "Enter subscription ID",
  comments: "The unique identifier of the subscription to manage.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  dataSource: "listSubscriptions",
  clean: util.types.toString,
});

export const allowDuplicates = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows creating multiple subscriptions for the same endpoint.",
  clean: util.types.toBool,
});

export const showInstanceSubscriptions = input({
  label: "Show Instance Subscriptions",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, filters results to show only subscriptions created by this instance.",
  clean: util.types.toBool,
});

export const deltaURL = input({
  label: "URL to fetch for delta",
  type: "string",
  required: true,
  placeholder: "Enter delta URL or link",
  comments:
    "The URL to track changes in a driveItem and its children over time. You can also paste the @odata.nextLink or @odata.deltaLink from a previous response to resume tracking changes.",
  example: "/drives/{drive-id}/root/delta",
  default: "/drives/{drive-id}/root/delta",
  clean: util.types.toString,
});

export const $select = input({
  label: "$select Parameter",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated field names",
  comments:
    "Filters properties (columns). https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#select-parameter",
  example: "givenName,surname",
  clean: util.types.toString,
});

export const $expand = input({
  label: "$expand Parameter",
  type: "string",
  required: false,
  placeholder: "Enter relationship to expand",
  comments:
    "Retrieves related resources. https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#expand-parameter",
  example: "members",
  clean: util.types.toString,
});

export const $top = input({
  label: "$top Parameter",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  comments:
    "Sets the page size of results. https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#top-parameter",
  example: "5",
  clean: util.types.toString,
});

export const dir = input({
  label: "Directory",
  type: "string",
  required: false,
  placeholder: "Enter directory path",
  comments:
    "The Graph API path to list resources from. Replace {siteId} or {driveId} with relevant ID values. https://learn.microsoft.com/en-us/graph/api/drive-list?view=graph-rest-1.0&tabs=http",
  example: "Drives: /sites/{siteId}/drives - Folders: /drives/{driveId}/root/children",
  default: "/me/drive/root/children",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "When true, retrieves all results by automatically following pagination.",
  clean: util.types.toBool,
});

export const recursive = input({
  label: "Recursive",
  type: "boolean",
  required: false,
  comments: "When true, returns files from all subfolders in addition to the specified folder.",
  clean: util.types.toBool,
});

const parentItemId = input({
  label: "Parent Item Id",
  type: "string",
  required: true,
  placeholder: "Enter parent item ID",
  comments: "The unique identifier of the parent folder. Use 'root' for the drive root.",
  example: "root",
  clean: util.types.toString,
});

export const folderName = input({
  label: "Folder Name",
  type: "string",
  required: true,
  example: "MyFolder",
  placeholder: "Enter folder name",
  comments: "The name of the folder.",
  clean: util.types.toString,
});

export const createFolderInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to create the folder in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to create the folder in.",
  },
  parentItemId: {
    ...parentItemId,
    comments: "Provide the id of the parent element to create the folder in.",
  },
  folderName: {
    ...folderName,
    comments: "Provide the name of the new folder.",
  },
};

export const moveFileInputs = {
  connection,
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to move the file in.",
  },
  itemId: {
    ...itemId,
    comments: "Provide the id of the file to move.",
  },
  parentItemId: {
    ...parentItemId,
    label: "Destination Parent Id",
    comments: "Provide the Id of the destination parent element to move file to.",
  },
};

export const listItemsInputs = {
  connection,
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to list the items in.",
  },
  folderId: {
    ...folderId,
    comments: "Provide the id of the folder to list the items in.",
    required: true,
  },
};

export const renameFolderInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to rename the folder in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to rename the folder in.",
  },
  folderId: {
    ...folderId,
    comments: "Provide the id of the folder to rename.",
    required: true,
  },
  folderName: {
    ...folderName,
    comments: "Provide the new name of the folder.",
  },
};

export const query = input({
  label: "Query",
  type: "string",
  required: true,
  example: "Invoices",
  placeholder: "Enter search query",
  comments: "The search query to find items by name.",
  clean: util.types.toString,
});

export const searchItemsInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to search the items in.",
  },
  query: {
    ...query,
    comments: "Provide the query to search for items by name.",
  },
};

export const itemPath = input({
  label: "Item Path",
  type: "string",
  required: true,
  example: "MyFolder/example.txt",
  placeholder: "Enter item path",
  comments: "The path to the file or folder, relative to the drive root.",
  clean: util.types.toString,
});

export const expirationDays = input({
  label: "Expiration Days",
  type: "string",
  placeholder: "Enter number of days",
  comments:
    "Number of days to extend the subscription. Maximum is 30 days for SharePoint/OneDrive resources.",
  example: "3",
  default: "3",
  required: false,
  clean: (value: unknown) => {
    const days = util.types.toNumber(value);
    return days > 0 && days <= 30 ? days : 3;
  },
});

export const includeSubfolders = input({
  label: "Include Subfolders",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When enabled, changes in subfolders will also be tracked recursively.",
  clean: util.types.toBool,
});

export const checkItemExistsInputs = {
  connection,
  siteId: {
    ...siteId,
    comments: "Provide the id of the site to check the item in.",
  },
  driveId: {
    ...driveId,
    comments: "Provide the id of the drive to check the item in.",
  },
  itemPath: {
    ...itemPath,
    comments: "Provide the path to the file or folder, relative to the drive root.",
  },
};

export const instanceDeployWebhookInputs = {
  connection,
  resource: {
    ...resource,
    comments:
      "The Microsoft Graph resource path to monitor. Examples: /me/drive/root, /sites/{site-id}/drive/root, /drives/{drive-id}/root",
  },
  changeType,
  clientState: {
    ...clientState,
    comments:
      "Optional validation token sent with each notification. Use to verify notifications originate from Microsoft Graph.",
  },
  expirationDateTime: {
    ...expirationDateTime,
    required: false,
    comments:
      "Optional expiration date/time for the subscription. If not provided, defaults to 3 days from now. Maximum is 30 days for SharePoint/OneDrive resources.",
  },
};

export const deleteAllSubscriptionsInputs = {
  connection,
  notificationUrl: {
    ...notificationUrl,
    comments:
      "The notification URL used when creating subscriptions for this instance. Only subscriptions with this URL will be deleted. If not provided, all subscriptions for this flow will be deleted.",
    required: false,
  },
};

export const renewSubscriptionInputs = {
  connection,
  subscriptionId,
  expirationDays,
};

export const folderPollingTriggerInputs = {
  connection,
  driveId,
  folderId: {
    ...folderId,
    comments: "The ID of the folder to monitor for changes.",
    required: true,
  },
  includeSubfolders,
};

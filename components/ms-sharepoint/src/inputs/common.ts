import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanExpirationDateTime } from "ms-utils";
import { toOptionalNumber, toOptionalString, toValueOrRoot } from "../util/clean";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft SharePoint connection to use.",
});

export const siteId = input({
  label: "Site ID",
  type: "string",
  required: true,
  placeholder: "Enter SharePoint site ID",
  comments: "The unique identifier of a SharePoint site.",
  dataSource: "listSites",
  example:
    "example.sharepoint.com,c45de8832-a4969-479d-aeb2-7nAh8321,48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  clean: util.types.toString,
});

export const driveId = input({
  label: "Drive ID",
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
  clean: toValueOrRoot,
});

export const listId = input({
  label: "List ID",
  type: "string",
  required: true,
  placeholder: "Enter list ID",
  comments: "The unique identifier of a SharePoint site list.",
  example: "48bf81d7-2d37-40a9-b47b-c1d1960d00f87",
  dataSource: "selectSiteList",
  clean: util.types.toString,
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  placeholder: "Enter item ID",
  comments: "The unique identifier of a SharePoint item.",
  dataSource: "listItemsInSiteList",
  example: "01Q7VXROAW7LCB32ODBRCKZNSJIC544XAQ",
  clean: util.types.toString,
});

const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  placeholder: "Enter page limit",
  example: "100",
  comments: "The maximum number of results to return per page.",
  clean: util.types.toNumber,
});

const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter pagination token",
  example: "X%2744537079ghv",
  comments: "The token for the desired page from a previous response.",
  clean: toOptionalString,
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page-size and page-token controls for paging through results.",
  inputs: {
    pageLimit,
    pageToken,
  },
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
  placeholder: "Enter expiration date/time (ISO 8601)",
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
  clean: toOptionalString,
});

export const $top = input({
  label: "Top",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  comments:
    "Sets the page size of results. See [top parameter](https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http#top).",
  example: "5",
  clean: toOptionalNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const parentItemId = input({
  label: "Parent Item ID",
  type: "string",
  required: true,
  placeholder: "Enter parent item ID",
  comments: "The unique identifier of the parent folder. Use 'root' for the drive root.",
  example: "root",
  clean: util.types.toString,
});

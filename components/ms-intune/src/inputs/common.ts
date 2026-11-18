import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayInput,
  cleanBodyInput,
  cleanOptionalNumberInput,
  cleanStringInput,
  generateApiVersionModel,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Intune connection to use.",
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  model: generateApiVersionModel(),
  required: true,
  comments: "The version of the API to use.",
  clean: cleanStringInput,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  comments:
    "OData filter expression to filter results. Supports operators like eq, ne, startswith, contains.",
  required: false,
  placeholder: "Enter filter expression",
  example: "startswith(givenName,'J')",
  default: "",
  clean: cleanStringInput,
});

export const $select = input({
  label: "Select",
  type: "string",
  comments:
    "Comma-separated list of properties to include in the response. Reduces payload size.",
  required: false,
  placeholder: "Enter properties to select",
  example: "id,displayName,mail",
  clean: cleanStringInput,
});

export const $expand = input({
  label: "Expand",
  type: "string",
  comments:
    "Comma-separated list of relationships to expand and include in the response.",
  required: false,
  placeholder: "Enter relationships to expand",
  example: "members,owners",
  clean: cleanStringInput,
});

export const $orderBy = input({
  label: "Order By",
  type: "string",
  comments:
    "Property to sort results by. Add 'asc' or 'desc' suffix for sort direction.",
  required: false,
  placeholder: "Enter sort expression",
  example: "displayName desc",
  clean: cleanStringInput,
});

export const $top = input({
  label: "Top",
  type: "number",
  comments: "Maximum number of results to return per page.",
  required: false,
  placeholder: "Enter page size",
  example: "50",
  clean: cleanOptionalNumberInput,
});

export const $skip = input({
  label: "Skip",
  type: "number",
  comments:
    "Number of results to skip, counted from 0. Use with $top for manual pagination.",
  required: false,
  placeholder: "Enter number to skip",
  example: "100",
  clean: cleanOptionalNumberInput,
});

export const $count = input({
  label: "Count",
  type: "boolean",
  comments: "When true, retrieves the total count of matching resources.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const $search = input({
  label: "Search",
  type: "string",
  comments:
    "Returns results based on search criteria. Use format 'property:value' for specific searches.",
  required: false,
  placeholder: "Enter search query",
  example: "displayName:Marketing",
  clean: cleanStringInput,
});

export const $format = input({
  label: "Format",
  type: "string",
  comments: "Response format. Typically 'json' for JSON output.",
  required: false,
  placeholder: "Enter response format",
  example: "json",
  clean: cleanStringInput,
});

export const $skipToken = input({
  label: "Skip Token",
  type: "string",
  comments:
    "Token from a previous response's @odata.nextLink to retrieve the next page of results.",
  required: false,
  placeholder: "Enter skip token from previous response",
  example: "X%274453707402000100000017...",
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "When true, automatically fetches all pages of results.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const odataParams = {
  $filter,
  $select,
  $expand,
  $orderBy,
  $top,
  $skip,
  $count,
  $search,
  $format,
  $skipToken,
};

export const odataGroupParams = {
  $count,
  $expand,
  $filter,
  $orderBy,
  $search,
  $select,
  $top,
};

export const odataSoftwareUpdatesParams = {
  $select,
  $expand,
  $search,
  $format,
  $skipToken,
};

export const bodyFields = input({
  label: "Body Fields",
  type: "code",
  language: "json",
  comments:
    "Additional JSON properties to include in the request body. These will be merged with other input values.",
  required: false,
  example: JSON.stringify({ customField: "value" }, null, 2),
  clean: cleanBodyInput,
});

export const mobileAppId = input({
  label: "Mobile App ID",
  comments: "Unique identifier for the mobile app (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter mobile app ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMobileApp",
});

export const groupId = input({
  label: "Group ID",
  comments:
    "The unique identifier of the group to assign the app to (UUID format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter group ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectGroup",
});

export const intent = input({
  label: "Intent",
  comments:
    "The intent of the assignment for the managed app. A 'Required' option will force the app to be installed on the device. An 'Available' option will make the app available for the user to install. An 'Uninstall' option will remove the app from the device. An 'Available Without Enrollment' option will make the app available for the user to install without enrolling the device.",
  example: "available",
  model: [
    { label: "Available", value: "available" },
    { label: "Required", value: "required" },
    { label: "Uninstall", value: "uninstall" },
    {
      label: "Available Without Enrollment",
      value: "availableWithoutEnrollment",
    },
  ],
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const target = input({
  label: "Target",
  type: "string",
  comments:
    "The mobile app assignment target type. Common values include allLicensedUsersAssignmentTarget, groupAssignmentTarget, allDevicesAssignmentTarget.",
  required: true,
  example: "microsoft.graph.allLicensedUsersAssignmentTarget",
  placeholder: "Enter target type",
  clean: util.types.toString,
});

export const settings = input({
  label: "Settings",
  type: "string",
  comments:
    "The mobile app assignment settings type. The value depends on the app platform (e.g., windowsUniversalAppXAppAssignmentSettings, iosLobAppAssignmentSettings).",
  required: true,
  example: "microsoft.graph.windowsUniversalAppXAppAssignmentSettings",
  placeholder: "Enter settings type",
  clean: util.types.toString,
});

export const groupIdForMembers = input({
  ...groupId,
  comments: "The unique identifier of a MS365 or Security group.",
  dataSource: "selectGroup",
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: false,
  comments:
    "The date and time when the webhook subscription expires in UTC format (ISO 8601). The maximum duration varies by resource type. [Learn more](https://learn.microsoft.com/en-us/graph/api/resources/subscription?view=graph-rest-1.0)",
  example: "2025-12-31T23:59:59.0000000Z",
  placeholder: "Enter expiration date/time",
  clean: cleanStringInput,
});

export const changeType = input({
  label: "Change Type",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "The type of change that will trigger notifications. Select one or more change types to monitor. Users and groups accept Updated and Deleted only: a new or soft-deleted user or group arrives as Updated, and selecting Created makes Microsoft Graph reject the subscription.",
  model: [
    { label: "Created", value: "created" },
    { label: "Updated", value: "updated" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanArrayInput,
});

export const resource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "The Microsoft Graph resource path to monitor for changes. Of the resources this component manages, Microsoft Graph v1.0 sends change notifications for users and groups only (for example, users, users/{id}, groups or groups/{id}). [Learn more](https://learn.microsoft.com/en-us/graph/api/resources/change-notifications-api-overview?view=graph-rest-1.0)",
  example: "users",
  placeholder: "Enter resource path",
  clean: util.types.toString,
});

import { input, util } from "@prismatic-io/spectral";
import { cleanFunctionValueList } from "../util";
import {
  SEARCH_USER_ROLES,
  SORT_BY_FIELD_OPTIONS,
  STATUS_TYPES,
} from "../constants";
import type {
  SearchSortOrder,
  SearchSubtypes,
  SearchVisibility,
} from "../types";
import { connection, externalId, groupId, pageSize } from "./common";

const ownershipScope = input({
  label: "Ownership Scope",
  placeholder: "Select ownership scope",
  model: ["OWNED", "SHARED", "SHARED_AND_OWNED"].map((scope) => {
    return {
      value: scope,
      label: scope,
    };
  }),
  comments:
    "Ownership scope of the agreement documents to include in this search request. Default is 'OWNED'.",
  type: "string",
  clean: util.types.toString,
  required: true,
});

const dateLessThanExpirationDate = input({
  label: "Expiration Less Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateGreaterThanExpirationDate = input({
  label: "Expiration Greater Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateMaxExpirationDate = input({
  label: "Expiration Max Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateMinExpirationDate = input({
  label: "Expiration Min Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateLessThanCreatedDate = input({
  label: "Created Less Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateGreaterThanCreatedDate = input({
  label: "Created Greater Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateMaxCreatedDate = input({
  label: "Created Max Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
  clean: util.types.toString,
});

const dateMinCreatedDate = input({
  label: "Created Min Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard. Range terms can be defined as less-than/greater-than or min/max.",
  clean: util.types.toString,
});

const dateLessThanModifiedDate = input({
  label: "Modified Less Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard.",
  clean: util.types.toString,
});

const dateGreaterThanModifiedDate = input({
  label: "Modified Greater Than Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard.",
  clean: util.types.toString,
});

const dateMaxModifiedDate = input({
  label: "Modified Max Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59Z",
  comments:
    "The maximum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard.",
  clean: util.types.toString,
});

const dateMinModifiedDate = input({
  label: "Modified Min Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-01-01T00:00:00Z",
  comments:
    "The minimum allowed date-time that is allowed in the result set. Values for each range field must adhere to the ISO-8601 standard.",
  clean: util.types.toString,
});


export const modifiedDate = input({
  label: "Modified Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601 format)",
  example: "2024-12-31T23:59:59+00:00",
  clean: util.types.toString,
  comments:
    "A range filter against the last date the agreement was modified by user action (signing, cancelling, etc.). The modified value updates with every action until the agreement reaches a terminal status (Completed/Canceled/Expired). Format would be date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system, such as 2007-12-03T10:15:30+01:00. Range terms can be defined as less-than/greater-than or min/max. If terms are mixed the JSON will be considered malformed.",
});

const assetId = input({
  label: "Asset ID(s)",
  type: "string",
  required: false,
  placeholder: "Enter Asset IDs",
  example: '["3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6"]',
  collection: "valuelist",
  comments:
    "A filter against case-sensitive agreement asset ID for which you would like to retrieve the information.",
  clean: cleanFunctionValueList,
});

const libraryDocumentId = input({
  label: "Library Document ID",
  type: "string",
  required: false,
  placeholder: "Enter Library Document ID",
  example: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
  clean: util.types.toString,
  comments:
    "A filter against case-sensitive library document ID that was used to create an agreement. This filter will only apply for the sender of the agreement since signers don't have the knowledge of how the agreement was created. Also, this filter only applies to library documents with type DOCUMENT but not FORM_FIELD_LAYER.",
});

const parentId = input({
  collection: "valuelist",
  label: "Parent ID",
  type: "string",
  required: false,
  placeholder: "Enter Parent IDs",
  example: '["3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6"]',
  clean: cleanFunctionValueList,
  comments:
    "A filter against case-sensitive parent ID for which you would like to retrieve agreement asset information.",
});

const participantEmail = input({
  collection: "valuelist",
  label: "Participant Email",
  type: "string",
  required: false,
  placeholder: "Enter email addresses",
  example: '["john.doe@example.com", "jane.smith@example.com"]',
  clean: cleanFunctionValueList,
  comments:
    "A filter against participant emails for which you would like to retrieve agreement asset information.",
});

const queryableFields = input({
  label: "Queryable Fields",
  type: "string",
  required: false,
  placeholder: "Enter field names",
  clean: cleanFunctionValueList,
  collection: "valuelist",
  comments:
    "A list of field names against which string query specified in the 'query' field above is executed. For more information, see the <a href=\"https://helpx.adobe.com/sign/using/adobesign-search-users-agreements.html#NamePrefix\">Acrobat Sign search documentation</a>.",
});

const searchRole = input({
  label: "Role",
  type: "string",
  collection: "valuelist",
  placeholder: "Select roles",
  model: SEARCH_USER_ROLES.map((role) => {
    return {
      value: role,
      label: role,
    };
  }),
  clean: cleanFunctionValueList,
  comments: "A filter against the roles the user has on agreement assets.",
});

const sortByField = input({
  label: "Sort By Field",
  type: "string",
  placeholder: "Select sort field",
  model: SORT_BY_FIELD_OPTIONS.map((field) => {
    return {
      value: field,
      label: field,
    };
  }),
  required: false,
  clean: util.types.toString,
  comments: "Defines the field by which the results will be ordered.",
});

const sortOrder = input({
  label: "Sort Order",
  type: "string",
  placeholder: "Select sort order",
  model: ["ASC", "DESC"].map((order) => {
    return {
      value: order,
      label: order,
    };
  }),
  required: false,
  clean: (value: unknown) => {
    return util.types.toString(value) as SearchSortOrder;
  },
  comments: "Sets the direction of the order.",
});

const startIndex = input({
  label: "Start Index",
  type: "string",
  required: false,
  placeholder: "Enter start index",
  example: "0",
  clean: util.types.toNumber,
  comments:
    "0-based first row (offset) of the search results to return. The value must be greater than or equal to 0 and less than 10000. If not provided, the default value is 0 and returns results from the very first row, without offset.",
});

const searchStatus = input({
  label: "Status",
  type: "string",
  collection: "valuelist",
  placeholder: "Select status values",
  clean: cleanFunctionValueList,
  model: STATUS_TYPES.map((status) => {
    return {
      value: status,
      label: status,
    };
  }),
  comments:
    "A filter against the detailed status of the agreement asset. <strong>Note:</strong> PARTIAL and DRAFT agreements are not supported for search.",
});

const subTypes = input({
  label: "Sub Types",
  type: "string",
  required: false,
  placeholder: "Select sub type",
  clean: (value: unknown) => {
    return util.types.toString(value) as SearchSubtypes;
  },
  model: ["DOCUMENT", "FORM_FIELD_LAYER"].map((subType) => {
    return {
      value: subType,
      label: subType,
    };
  }),
  comments:
    "A filter against the agreement asset sub types. Only agreement assets with type LIBRARY_TEMPLATE currently have this field populated.",
});

const searchType = input({
  label: "Type",
  type: "string",
  required: false,
  placeholder: "Select type",
  clean: util.types.toString,
  model: [
    "AGREEMENT",
    "MEGASIGN_CHILD",
    "WIDGET_INSTANCE",
    "MEGASIGN_PARENT",
    "LIBRARY_TEMPLATE",
    "WIDGET",
  ].map((searchType) => {
    return {
      value: searchType,
      label: searchType,
    };
  }),
  comments: "A filter against the agreement asset type.",
});

const searchUserId = input({
  label: "User ID",
  type: "string",
  required: false,
  placeholder: "Enter User IDs",
  example: '["CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ"]',
  clean: cleanFunctionValueList,
  collection: "valuelist",
  comments: "A filter against the user for account sharing.",
});

const visibility = input({
  label: "Visibility",
  type: "string",
  required: false,
  placeholder: "Select visibility",
  clean: (value: unknown) => {
    return util.types.toString(value) as SearchVisibility;
  },
  model: ["SHOW_HIDDEN", "SHOW_VISIBLE", "SHOW_ALL"].map((visibility) => {
    return {
      value: visibility,
      label: visibility,
    };
  }),
  comments:
    "A filter indicating the visibility level of agreements that get returned in the response.",
});

const searchWorkflowId = input({
  label: "Workflow ID",
  type: "string",
  required: false,
  placeholder: "Enter Workflow IDs",
  example: '["3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6"]',
  clean: cleanFunctionValueList,
  collection: "valuelist",
  comments:
    "A filter against case-sensitive workflow ID for which you would like to retrieve agreement asset information. Workflow ID is passed in the call to the agreement asset creation API.",
});

const searchQuery = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter search query",
  example: "contract agreement",
  clean: util.types.toString,
  comments:
    'This field provides text search capability against terms in the field values of agreements that are visible to the user making the request. For more information about how text searching works, see the <a href="https://helpx.adobe.com/sign/using/adobesign-search-users-agreements.html#HowSearchWorks">Acrobat Sign search documentation</a>.',
});


export const searchScope = input({
  label: "Scope",
  type: "string",
  required: true,
  placeholder: "Select scope",
  clean: util.types.toString,
  model: ["AGREEMENT_ASSETS"].map((scope) => {
    return {
      value: scope,
      label: scope,
    };
  }),
  comments:
    "A resource scope. 'AGREEMENT_ASSETS' is the only value that is supported right now which includes the following resources: agreements, megaSigns, libraryDocuments and widgets.",
});

export const searchResourcesInputs = {
  connection,
  ownershipScope,
  externalId: {
    ...externalId,
    collection: "valuelist" as const,
    clean: cleanFunctionValueList,
    comments:
      "A filter against case-sensitive external id for which you would" +
      " like to retrieve agreement asset information. External id is passed" +
      "in the call to the agreement asset creation API. Supply them in a" +
      "comma-separated manner.",
  },
  groupId: {
    ...groupId,
    collection: "valuelist" as const,
    clean: cleanFunctionValueList,
    comments:
      "A filter against group identifier(s), as returned by" +
      " the group creation API or retrieved from the API to fetch groups.",
  },
  assetId,
  libraryDocumentId,
  pageSize: {
    ...pageSize,
    comments:
      "The number of results to return per page. If not provided, it is decided by your application settings.",
  },
  parentId,
  participantEmail,
  queryableFields,
  searchRole,
  sortByField,
  sortOrder,
  startIndex,
  searchStatus,
  subTypes,
  searchType,
  searchUserId,
  visibility,
  searchWorkflowId,
  searchQuery,
  dateGreaterThanCreatedDate,
  dateGreaterThanExpirationDate,
  dateGreaterThanModifiedDate,
  dateLessThanCreatedDate,
  dateLessThanExpirationDate,
  dateLessThanModifiedDate,
  dateMaxCreatedDate,
  dateMaxExpirationDate,
  dateMaxModifiedDate,
  dateMinCreatedDate,
  dateMinExpirationDate,
  dateMinModifiedDate,
};

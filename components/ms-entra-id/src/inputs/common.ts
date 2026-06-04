import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanGroupTypes, toOptionalString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Entra ID connection to use.",
});

export const odataParams = {
  $deltatoken: input({
    label: "Delta Token",
    type: "string",
    required: false,
    placeholder: "Enter delta token",
    example: "deltatoken",
    comments:
      "A state token returned in the @odata.deltaLink URL of the previous delta function call for the same user collection, indicating the completion of that round of change tracking.",
    clean: toOptionalString,
  }),
  $filter: input({
    label: "Filter",
    type: "string",
    comments:
      "An OData filter expression to narrow results. For example: startswith(givenName,'J').",
    required: false,
    placeholder: "Enter filter expression",
    example: "startswith(givenName,'J')",
    default: "",
    clean: toOptionalString,
  }),
  $select: input({
    label: "Select",
    type: "string",
    comments:
      "A comma-separated list of OData properties to include in the response, reducing payload size.",
    required: false,
    placeholder: "Enter field names",
    example: "givenName,surname",
    clean: toOptionalString,
  }),
  $expand: input({
    label: "Expand",
    type: "string",
    comments:
      "A comma-separated list of OData relationships to expand and include in the response.",
    required: false,
    placeholder: "Enter expand value",
    example: "members",
    clean: toOptionalString,
  }),
  $orderby: input({
    label: "Order By",
    type: "string",
    comments:
      "An OData expression to sort results, such as 'displayName desc' or 'createdDateTime asc'.",
    required: false,
    placeholder: "Enter order by expression",
    example: "displayName desc",
    clean: toOptionalString,
  }),
  $top: input({
    label: "Top",
    type: "string",
    comments:
      "The maximum number of items to return in the result set (OData $top).",
    required: false,
    placeholder: "Enter page size",
    example: "10",
    clean: toOptionalString,
  }),
  $skip: input({
    label: "Skip",
    type: "string",
    comments:
      "Indexes into a result set. Also used by some APIs to implement paging and can be used together with $top to manually page results. Starts at 0.",
    required: false,
    placeholder: "Enter skip count",
    example: "10",
    clean: toOptionalString,
  }),
  $count: input({
    label: "Count",
    type: "boolean",
    comments:
      "When true, retrieves the total count of matching resources. Requires 'Eventual Consistency Level Header' to be enabled.",
    required: false,
    default: "false",
    clean: util.types.toBool,
  }),
  $search: input({
    label: "Search",
    type: "string",
    comments:
      "An OData search expression to return results matching the criteria. Requires Eventual Consistency Level Header.",
    required: false,
    placeholder: "Enter search criteria",
    example: "pizza",
    clean: toOptionalString,
  }),
  $format: input({
    label: "Format",
    type: "string",
    comments: "The media format for the response (e.g., json, atom).",
    required: false,
    placeholder: "Enter format",
    example: "json",
    clean: toOptionalString,
  }),
  $skiptoken: input({
    label: "Skip Token",
    type: "string",
    comments:
      "Retrieves the next page of results from result sets that span multiple pages.",
    required: false,
    placeholder: "Enter skip token",
    example: "skiptoken",
    clean: toOptionalString,
  }),
};

export const additionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties that are not covered by the other inputs. This should be a JSON object and will be merged with the other inputs.",
  clean: (value: unknown) => cleanCodeInput(value, "Additional Properties"),
  example: JSON.stringify({ uniqueName: "Test Name" }, null, 2),
});

export const userId = input({
  label: "User ID",
  comments: "The unique identifier of the user.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter User ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const groupId = input({
  label: "Group ID",
  comments: "The unique identifier of the group.",
  example: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  placeholder: "Enter Group ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectGroup",
});

export const eventualConsistencyLevelHeader = input({
  label: "Eventual Consistency Level Header",
  comments:
    "When true, adds the ConsistencyLevel: eventual header to the request. Required for some OData query parameters such as $count and $search.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const memberId = input({
  label: "Member ID",
  comments: "The unique identifier of the member.",
  type: "string",
  required: true,
  placeholder: "Enter Member ID",
  example: "12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
  dataSource: "selectGroupMember",
});

export const groupTypes = input({
  label: "Group Types",
  type: "string",
  required: false,
  comments: "The type of group and its membership.",
  example: "Unified",
  placeholder: "Select a group type",
  model: [
    { label: "Microsoft 365 (Unified)", value: "Unified" },
    { label: "Dynamic Membership", value: "DynamicMembership" },
    {
      label: "Microsoft 365 / Dynamic Membership",
      value: "Unified,DynamicMembership",
    },
  ],
  clean: cleanGroupTypes,
});

export const uniqueName = input({
  label: "Unique Name",
  comments:
    "The client-provided alternate key used to uniquely identify the resource for upsert operations.",
  type: "string",
  required: true,
  placeholder: "Enter unique name",
  clean: util.types.toString,
});

export const useAsUpsert = input({
  label: "Use as Upsert",
  type: "boolean",
  required: true,
  comments:
    "When true, creates a new record if it does not exist. When false, only updates an existing record.",
  default: "true",
  clean: util.types.toBool,
});

export const deltaURL = input({
  label: "Delta URL",
  type: "string",
  required: true,
  comments:
    "The URL to track changes in an object and its children over time. Use @odata.nextLink or @odata.deltaLink to get the next set of changes.",
  example: "/users/delta",
  placeholder: "Enter delta URL",
  clean: util.types.toString,
});

export const returnMinimal = input({
  label: "Return Minimal",
  type: "boolean",
  comments:
    "When true, returns only the object properties that have changed since the last round when using @odata.deltaLink.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const getAllPaginatedResults = input({
  label: "Get All Paginated Results",
  type: "boolean",
  comments:
    "When true, automatically fetches all pages of results using pagination. Ignores the 'Top' input.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: true,
  comments:
    "Specifies the date and time when the webhook subscription expires. The time is in UTC, and can be an amount of time from subscription creation that varies for the resource subscribed to. Format: ISO 8601 (e.g., 2016-11-20T18:23:45.9356913Z).",
  example: "2016-11-20T18:23:45.9356913Z",
  placeholder: "Enter expiration date time (ISO 8601)",
  clean: util.types.toString,
});

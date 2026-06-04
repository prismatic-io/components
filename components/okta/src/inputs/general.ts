import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { cleanString } from "../util/clean";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Okta connection to use.",
});

export const search = input({
  label: "Search",
  type: "string",
  comments:
    "A search string to filter results. See Okta's documentation for supported search fields and operators [click here](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=search&t=request).",
  required: false,
  example: 'profile.firstName eq "John"',
  placeholder: "Enter a search string",
  clean: cleanString,
});

export const q = input({
  label: "q",
  type: "string",
  comments:
    "Searches for apps with name or label properties that starts with the q value using the startsWith operation.",
  required: false,
  example: "Okta",
  placeholder: "Enter a query string",
  clean: cleanString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  comments:
    "A filter string to narrow down results. See Okta's documentation for supported filter fields and operators [click here](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/listUsers!in=query&path=filter&t=request).",
  required: false,
  example: 'lastUpdated gt "2013-06-01T00:00:00.000Z"',
  placeholder: "Enter a filter string",
  clean: cleanString,
});

export const after = input({
  label: "After",
  type: "string",
  comments:
    "The cursor for the next page of results. This value is obtained from the `Link` header of the response.",
  required: false,
  example: "abc123",
  placeholder: "Enter a cursor value",
  clean: cleanString,
});

export const limit = input({
  label: "Limit",
  type: "string",
  comments: "Specifies the number of results returned. Defaults to 200.",
  required: false,
  example: "100",
  placeholder: "Enter a limit",
  clean: cleanString,
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  comments:
    "Specifies field to sort by (for search queries only). This can be any single property, for example sortBy=profile.lastName. Users with the same value for the sortBy property will be ordered by id.",
  required: false,
  example: "profile.lastName",
  placeholder: "Enter a sort field",
  clean: cleanString,
});

export const sortOrder = input({
  label: "Sort Order",
  type: "string",
  comments:
    "Specifies the sort order: asc or desc (for search queries only). Sorting is done in ASCII sort order (that is, by ASCII character value), but isn't case sensitive. sortOrder is ignored if sortBy isn't present.",
  required: false,
  placeholder: "Enter a sort order",
  model: [
    { label: "Ascending", value: "ASCENDING" },
    { label: "Descending", value: "DESCENDING" },
  ],
  clean: cleanString,
});

export const extraParameters = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  comments:
    "List of additional parameters to include in the request. This can be used to include parameters that are not explicitly supported by this component. See Okta's API documentation for a list of supported parameters.",
  required: false,
  example: '{"after": "abc123"}',
  clean: (value: unknown) => {
    return util.types.keyValPairListToObject(value as KeyValuePair[]);
  },
});

export const extraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  comments:
    "List of additional body parameters to include in the request. This can be used to include parameters that are not explicitly supported by this component. See Okta's API documentation for a list of supported parameters.",
  required: false,
  example: JSON.stringify({ key: "value" }, null, 2),
  clean: util.types.toObject,
});

export const expand = input({
  label: "Expand",
  type: "string",
  comments:
    "Indicates whether to expand the credentials for the user. By default, credentials are not returned in the response.",
  required: false,
  example: "blocks",
  placeholder: "Enter expand parameter",
  clean: cleanString,
});

export const since = input({
  label: "Since",
  type: "string",
  comments:
    "Filters the lower time bound of the log events published property for bounded queries or persistence time for polling queries.",
  required: false,
  example: "7 days prior to until",
  placeholder: "Enter since value",
  clean: cleanString,
});

export const until = input({
  label: "Until",
  type: "string",
  comments:
    "Filters the upper time bound of the log events published property for bounded queries or persistence time for polling queries.",
  required: false,
  example: "current time",
  placeholder: "Enter until value",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "When true, fetches all pages of results using pagination.",
  required: false,
  clean: util.types.toBool,
});

export const listInputs = {
  fetchAll,
  search,
  filter,
  q,
  after,
  limit,
  sortBy,
  sortOrder,
  extraParameters,
  connection,
};

export const getSystemLogInputs = {
  fetchAll,
  since,
  until,
  filter,
  q,
  after,
  limit,
  sortOrder,
  connection,
};

export const listRealmsInputs = {
  fetchAll,
  limit,
  after,
  search,
  sortBy,
  sortOrder,
  connection,
};

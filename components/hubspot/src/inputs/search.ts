import { input, util } from "@prismatic-io/spectral";
import { MAX_SEARCH_LIMIT, SEARCH_ENDPOINTS } from "../constants";
import { toOptionalInt } from "../util";
import { connectionInput, fetchAll, objectType, timeout } from "./common";
export const propertyName = input({
  label: "Property Name",
  type: "string",
  required: true,
  example: "dealname",
  dataSource: "selectProperty",
  comments:
    "The property to search on. Ensure the spelling and capitalization match the property exactly.",
  clean: util.types.toString,
});
export const operator = input({
  label: "Operator",
  type: "string",
  required: true,
  comments:
    "The comparison operator applied to the property value in the search filter.",
  model: [
    { label: "Equal To", value: "EQ" },
    { label: "Less Than", value: "LT" },
    { label: "Less Than Or Equal TO", value: "LTE" },
    { label: "Greater Than", value: "GT" },
    { label: "Greater Than Or Equal To", value: "GTE" },
    { label: "Less Than Or Equal To", value: "BETWEEN" },
    { label: "In", value: "IN" },
    { label: "Not In", value: "NOT_IN" },
    { label: "Has Property", value: "HAS_PROPERTY" },
    { label: "Not Has Property", value: "NOT_HAS_PROPERTY" },
    { label: "Contains Token", value: "CONTAINS_TOKEN" },
    { label: "Not Contains Token", value: "NOT_CONTAINS_TOKEN" },
  ],
  clean: util.types.toString,
});
export const searchEndpoint = input({
  label: "Search Endpoint",
  type: "string",
  required: true,
  model: SEARCH_ENDPOINTS,
  comments:
    "The endpoint to search for objects or engagements. For Custom objects don't forget to fill the Object Type input.",
  clean: util.types.toString,
});
export const searchProperties = input({
  label: "Search Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Include properties such as filters and sorts, or specify the properties to be returned. If empty, only the default properties will be returned. On the polling triggers, `sorts` is ignored (they sort by the object's last-modified property ascending so polling can resume) and `filters`/`filterGroups` are combined with the recurrence's date window using AND. For more information, see [HubSpot CRM Search API](https://developers.hubspot.com/docs/api/crm/search).",
  example: JSON.stringify(
    {
      sorts: [
        {
          propertyName: "createdate",
          direction: "DESCENDING",
        },
      ],
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});
const searchLimit = input({
  label: "Search Limit",
  type: "string",
  required: true,
  default: "10",
  example: "10",
  placeholder: "10",
  comments: `The number of records to return. The maximum value is ${MAX_SEARCH_LIMIT}.`,
  clean: toOptionalInt,
});
export const searchInputs = {
  hubspotConnection: connectionInput,
  searchEndpoint,
  searchProperties,
  objectType: {
    ...objectType,
    required: false,
    comments:
      "The type of custom object to search for. Required for the Custom objects search endpoint.",
  },
  searchLimit,
  fetchAll: {
    ...fetchAll,
    comments: `Turn this ON to get more than ${MAX_SEARCH_LIMIT} results. Note that this can be a large amount of data.`,
  },
  timeout,
};

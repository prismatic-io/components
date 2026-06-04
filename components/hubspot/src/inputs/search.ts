import { input, util } from "@prismatic-io/spectral";
import { SEARCH_ENDPOINTS } from "../constant";
import { MAX_SEARCH_LIMIT } from "../constants";
import { cleanNumberInput } from "../util";

export const propertyName = input({
  label: "Property Name",
  type: "string",
  required: true,
  example: "dealname",
  dataSource: "selectProperty",
  comments:
    "The property to search on. Ensure the spelling and capitalization are correct for the property you want to use.",
});

export const operator = input({
  label: "Operator",
  type: "string",
  required: true,
  comments: "The operator used to search on.",
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
    "Include properties such as filters and sorts, or specify the properties to be returned. If empty, only the default properties will be returned. For more information, see [HubSpot CRM Search API](https://developers.hubspot.com/docs/api/crm/search).",
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

export const searchLimit = input({
  label: "Search Limit",
  type: "string",
  required: true,
  default: "10",
  example: "10",
  placeholder: "10",
  comments: `The number of records to return. The maximum value is ${MAX_SEARCH_LIMIT}.`,
  clean: cleanNumberInput,
});

import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const indexName = input({
  label: "Index Name",
  placeholder: "acme_query_suggestions",
  type: "string",
  required: true,
  example: "acme_query_suggestions",
  comments: "Provide a string value for the index name.",
  dataSource: "selectIndex",
});

export const queryString = input({
  label: "Query String",
  placeholder: "query=george%20clo&hitsPerPage=2&getRankingInfo=1",
  type: "string",
  required: false,
  example: "query=george%20clo&hitsPerPage=2&getRankingInfo=1",
  comments: "Provide a string value for the query string. This is optional.",
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments:
    "Retrieve a specific page. Pages are zero-based. The page size is set to 100. This parameter isn’t set by default, and all indices are retrieved at once.",
  clean: util.types.toInt,
});

export const forwardToReplicas = input({
  label: "Forward to Replicas",
  type: "boolean",
  required: false,
  comments: "The change is also propagated to replicas of this index.",
  clean: util.types.toBool,
});

export const settings = input({
  label: "Settings",
  type: "code",
  language: "json",
  example: JSON.stringify({
    searchableAttributes: ["name", "address"],
    customRanking: ["desc(followers)"],
  }),
  required: true,
  comments: "A mapping of settings parameters you can use on an index.",
  clean: (value) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const requests = input({
  label: "Requests",
  type: "code",
  language: "json",
  example: JSON.stringify([
    {
      action: "addObject",
      indexName: "contacts",
      body: {
        name: "Betty Jane Mccamey",
        company: "Vita Foods Inc.",
        email: "betty@mccamey.com",
      },
    },
    {
      action: "addObject",
      indexName: "public_contacts",
      body: {
        name: "Gayla Geimer",
        company: "Ortman Mccain Co",
        email: "gayla@geimer.com",
      },
    },
  ]),
  required: true,
  comments: "An array of operations to batch.",
  clean: (value) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const requestsInput = input({
  label: "Requests",
  type: "code",
  language: "json",
  default: JSON.stringify(
    [
      {
        indexName: "acme",
        params: "filters=objectID:ff68be7beb72da7db241ffeca4b62f09739ef79f",
      },
      {
        indexName: "acme-test-2",
        params: "filters=objectID:b5c24740f0b7a94318193ab136fc3d70eea71f1c",
      },
    ],
    null,
    2,
  ),
  required: true,
  comments:
    "Provide a JSON object where each key-value pair represents an index-query pair for the search.",
  clean: (requestsInput) => {
    return util.types.isJSON(util.types.toString(requestsInput))
      ? JSON.parse(util.types.toString(requestsInput))
      : requestsInput;
  },
});

export const strategyInput = input({
  label: "Strategy",
  type: "string",
  required: true,
  example: "none",
  comments:
    "Provide a strategy. The possible values are 'none' and 'stopIfEnoughMatches'. This is optional.",
});

export const facetNameInput = input({
  label: "Facet Name",
  placeholder: "hierarchy.lvl0",
  type: "string",
  required: true,
  example: "example_facet",
  comments: "Provide a string value for the facet name.",
});

export const facetQueryInput = input({
  label: "Facet Query",
  placeholder: "Articles",
  type: "string",
  required: false,
  example: "example_query",
  comments: "Provide a string value for the facet query. This is optional.",
});

export const maxFacetHitsInput = input({
  label: "Max Facet Hits",
  placeholder: "10",
  type: "string",
  required: false,
  example: "10",
  comments:
    "Provide a number for the maximum number of facet hits to return. This is optional.",
});

export const paramsInput = input({
  label: "Search Parameters",
  placeholder: "filters=language:en",
  type: "string",
  required: false,
  example: "filters=language:en",
  comments:
    "Provide a URL-encoded string for search parameters. This is optional.",
});

export const cursorInput = input({
  label: "Cursor",
  placeholder: "example_cursor",
  type: "string",
  required: false,
  example:
    "cursor:AhNmaWx0ZXJzPWxhbmd1YWdlOmVuAgEoMjAyMjJlNjNjNjliZGQ1NWRkYzcyOGU3Y2M4M2M2ZDRiODI3ZmQ1Mw==",
  comments: "Provide a string value for the cursor. This is optional.",
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created indices in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated indices in trigger results.",
  clean: util.types.toBool,
});

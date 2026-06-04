import { action, input, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl, createClient } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const addUser = action({
  display: {
    label: "Link User to Account",
    description: "Link a User by email to specified Account",
  },
  perform: async (_context, { connection, accountId, email }) => {
    const client = createClient({ connection });
    const response = await client.management.accountUserLinks.insert({
      accountId,
      requestBody: {
        permissions: {
          local: ["EDIT", "MANAGE_USERS"],
        },
        userRef: {
          email,
        },
      },
    });

    return {
      data: response?.data,
    };
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    email: input({
      label: "Email",
      type: "string",
      required: true,
      clean: util.types.toString,
    }),
  },
});

const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Paginated listing of Accounts",
  },
  perform: async (_context, { connection, startIndex, itemsPerPage }) => {
    const client = createClient({
      connection,
    });
    const response = await client.management.accounts.list({
      "start-index": startIndex,
      "max-results": itemsPerPage,
    });
    return {
      data: response?.data,
    };
  },
  inputs: {
    connection: connectionInput,
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
  },
});

const getCustomMetric = action({
  display: {
    label: "Get Custom Metric",
    description: "Get a Custom Metric",
  },
  inputs: {
    connection: connectionInput,
    customMetricId: input({
      label: "Custom Metric ID",
      type: "string",
      required: true,
      dataSource: "getCustomMetric",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
  },
  perform: async (
    _context,
    { webPropertyId, accountId, customMetricId, connection },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.customMetrics.get({
      webPropertyId,
      accountId,
      customMetricId,
    });
    return { data };
  },
});

export const listCustomMetrics = action({
  display: {
    label: "List Custom Metrics",
    description: "List Custom Metrics for the given Web Property",
  },
  inputs: {
    connection: connectionInput,
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
  },
  perform: async (
    _context,
    { connection, accountId, webPropertyId, startIndex, itemsPerPage },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.customMetrics.list({
      accountId,
      webPropertyId,
      "start-index": startIndex,
      "max-results": itemsPerPage,
    });
    return { data };
  },
});

const getCustomDimension = action({
  display: {
    label: "Get Custom Dimension",
    description: "Get a Custom Dimensions",
  },
  inputs: {
    connection: connectionInput,
    customDimensionId: input({
      label: "Custom Dimension ID",
      type: "string",
      required: true,
      dataSource: "selectCustomDimension",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
  },
  perform: async (
    _context,
    { webPropertyId, accountId, customDimensionId, connection },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.customDimensions.get({
      webPropertyId,
      accountId,
      customDimensionId,
    });
    return { data };
  },
});
export const listCustomDimensions = action({
  display: {
    label: "List Custom Dimensions",
    description: "List Custom Dimensions for the given Web Property",
  },
  inputs: {
    connection: connectionInput,
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
  },
  perform: async (
    _context,
    { connection, accountId, webPropertyId, startIndex, itemsPerPage },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.customDimensions.list({
      accountId,
      webPropertyId,
      "start-index": startIndex,
      "max-results": itemsPerPage,
    });
    return { data };
  },
});

const getWebProperty = action({
  display: {
    label: "Get Web Property",
    description: "Get Web Property",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
  },
  perform: async (_context, { webPropertyId, accountId, connection }) => {
    const client = createClient({ connection });
    const { data } = await client.management.webproperties.get({
      webPropertyId,
      accountId,
    });
    return { data };
  },
});

export const listWebProperties = action({
  display: {
    label: "List Web Properties",
    description: "List Web Properties associated with the specified Account ID",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
  },
  perform: async (
    _context,
    { accountId, connection, startIndex, itemsPerPage },
  ) => {
    const client = createClient({ connection: connection });
    const { data } = await client.management.webproperties.list({
      accountId,
      "start-index": startIndex,
      "max-results": itemsPerPage,
    });
    return { data };
  },
});

const getProfile = action({
  display: {
    label: "Get Profile",
    description: "Get a Google Analytics Profile",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
    profileId: input({
      label: "Profile ID",
      type: "string",
      required: true,
      dataSource: "profiles",
      clean: util.types.toString,
    }),
  },
  perform: async (
    _context,
    { connection, accountId, webPropertyId, profileId },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.profiles.get({
      accountId,
      webPropertyId,
      profileId,
    });
    return { data };
  },
});

export const listProfiles = action({
  display: {
    label: "List Profiles",
    description: "List Profiles associated with the specified Account ID",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      default: "~all",
      dataSource: "accountNames",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      default: "~all",
      dataSource: "getWebProperty",
      clean: util.types.toString,
    }),
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
  },
  perform: async (
    _context,
    { connection, accountId, webPropertyId, itemsPerPage, startIndex },
  ) => {
    const client = createClient({ connection });
    const { data } = await client.management.profiles.list({
      accountId,
      webPropertyId,
      "start-index": startIndex,
      "max-results": itemsPerPage,
    });
    return { data };
  },
});

const getData = action({
  display: {
    label: "Get View Data",
    description: "Get Analytics data for a View (profile)",
  },
  inputs: {
    connection: connectionInput,
    startDate: input({
      label: "Start Date",
      type: "string",
      example: "2022-02-01",
      clean: (value) => util.types.toDate(value).toISOString().split("T")[0],
      required: true,
    }),
    endDate: input({
      label: "End Date",
      type: "string",
      example: "2022-02-02",
      clean: (value) => util.types.toDate(value).toISOString().split("T")[0],
      required: true,
    }),

    ids: input({
      label: "Profile ID",
      type: "string",
      required: true,
      example: "840123345",
      dataSource: "profiles",
      clean: (value) =>
        util.types.toString(value).startsWith("ga:")
          ? util.types.toString(value)
          : `ga:${util.types.toString(value)}`,
    }),
    dimensions: input({
      label: "Standard Dimensions",
      type: "string",
      example: "ga:browser",
      collection: "valuelist",
      required: false,
    }),
    metrics: input({
      label: "Standard Metrics",
      type: "string",
      example: "ga:pageviews",
      collection: "valuelist",
      required: false,
    }),
    segment: input({
      label: "Analytics Segment",
      type: "string",
      required: false,
      clean: util.types.toString,
    }),
    customMetrics: input({
      label: "Additional Metrics",
      type: "string",
      clean: util.types.toString,
      required: false,
      comments:
        "Must be a comma seperated list of metrics i.e. 'ga:sesions,ga:pageviews'",
    }),
    customDimensions: input({
      label: "Additional Dimensions",
      type: "string",
      required: false,
      clean: util.types.toString,
      comments:
        "Must be a comma seperated list of dimensions i.e. 'ga:browser,ga:city'",
    }),
    filters: input({
      label: "Filters",
      type: "string",
      collection: "valuelist",
      required: false,
    }),
    startIndex: input({
      label: "Start Index",
      type: "string",
      default: "1",
      required: true,
      clean: util.types.toInt,
    }),
    itemsPerPage: input({
      label: "Items Per Page",
      type: "string",
      default: "1000",
      required: true,
      clean: util.types.toInt,
    }),
    includeEmpty: input({
      label: "Include Empty Rows",
      type: "boolean",
      default: "false",
      required: true,
      clean: util.types.toBool,
    }),
  },
  perform: async (
    _context,
    { connection, ids, startDate, endDate, includeEmpty, segment, ...params },
  ) => {
    const client = createClient({ connection: connection });

    let dimensions = params.dimensions
      .map((d) => util.types.toString(d))
      .join(",");
    if (params.customDimensions) {
      dimensions = dimensions.concat(`,${params.customDimensions}`);
    }

    let metrics = params.metrics.map((m) => util.types.toString(m)).join(",");
    if (params.customMetrics) {
      metrics = metrics.concat(`,${params.customMetrics}`);
    }

    const response = await client.data.ga.get({
      dimensions,
      metrics,
      ids,
      ...(segment ? { segment } : {}),
      ...(params.filters.join(",")
        ? { filters: params.filters.join(",") }
        : {}),
      "start-index": util.types.toNumber(params.startIndex),
      "max-results": util.types.toNumber(params.itemsPerPage),
      "start-date": startDate,
      "end-date": endDate,
      "include-empty-rows": util.types.toBool(includeEmpty),
    });
    return {
      data: response.data,
    };
  },
});

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Analytics",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/management/accounts), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/management/accounts, only /management/accounts is entered in this field.`,
      example: "/management/accounts",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection.token?.access_token}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default {
  listAccounts,
  listProfiles,
  listWebProperties,
  listCustomDimensions,
  listCustomMetrics,
  addUser,
  getData,
  getWebProperty,
  getCustomDimension,
  getCustomMetric,
  getProfile,
  rawRequest,
};

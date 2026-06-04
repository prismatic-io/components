import type { analytics_v3 } from "@googleapis/analytics";
import { dataSource, type Element, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

const getCustomMetric = dataSource({
  display: {
    label: "Custom Metrics",
    description: "A picklist of Custom Metrics",
  },
  inputs: {
    connection: connectionInput,
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      clean: util.types.toString,
    }),
  },
  perform: async (_context, { connection, accountId, webPropertyId }) => {
    const client = createClient({ connection });
    let nextLink = null;
    const itemsPerPage = 1000;
    let index = 1;
    const metrics: analytics_v3.Schema$CustomMetric[] = [];
    do {
      const { data } = await client.management.customMetrics.list({
        accountId,
        webPropertyId,
        "start-index": index,
        "max-results": itemsPerPage,
      });
      if (data.items) {
        metrics.push(...data.items);
      }
      index++;
      nextLink = data.nextLink;
    } while (nextLink);
    const elements = metrics.map<Element>((metric) => {
      return {
        key: util.types.toString(metric.id),
        label: util.types.toString(metric.name),
      };
    });
    return { result: elements };
  },
  dataSourceType: "picklist",
});

const getWebProperty = dataSource({
  display: {
    label: "Web Property",
    description: "A picklist of Web Properties",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      default: "~all",
      clean: util.types.toString,
    }),
  },
  perform: async (_context, { connection, accountId }) => {
    const client = createClient({ connection });
    let nextLink = null;
    const itemsPerPage = 1000;
    let index = 1;
    const webProperties: analytics_v3.Schema$Webproperty[] = [];
    do {
      const { data } = await client.management.webproperties.list({
        accountId,
        "start-index": index,
        "max-results": itemsPerPage,
      });
      if (data.items) {
        webProperties.push(...data.items);
      }
      index++;
      nextLink = data.nextLink;
    } while (nextLink);

    const elements = webProperties.map<Element>((property) => {
      return {
        key: util.types.toString(property.id),
        label: util.types.toString(property.name),
      };
    });
    return { result: elements };
  },
  dataSourceType: "picklist",
});

const accountNames = dataSource({
  display: {
    label: "Account Names",
    description: "A picklist of account names",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient({
      connection: connection,
    });
    const response = await client.management.accounts.list({
      "start-index": 1,
    });
    const options = response?.data?.items?.map<Element>(({ name, id }) => ({
      label: name || "",
      key: id || "",
    }));

    return { result: options ?? [] };
  },
  dataSourceType: "picklist",
});

const profiles = dataSource({
  display: {
    label: "Views (Profiles)",
    description: "A picklist of views (profiles)",
  },
  inputs: {
    connection: connectionInput,
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      default: "~all",
      clean: util.types.toString,
    }),
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      default: "~all",
      clean: util.types.toString,
    }),
  },
  perform: async (_context, params) => {
    const client = createClient({
      connection: params.connection,
    });
    const response = await client.management.profiles.list({
      accountId: params.accountId,
      webPropertyId: params.webPropertyId,
      "start-index": 1,
      "max-results": 1000,
    });
    const options = response?.data?.items?.map<Element>(
      ({ name, id, webPropertyId }) => ({
        label: `${name} (${webPropertyId})` || "",
        key: id || "",
      }),
    );

    return { result: options ?? [] };
  },
  dataSourceType: "picklist",
});

const selectCustomDimension = dataSource({
  display: {
    label: "Select Custom Dimension",
    description:
      "A picklist of custom dimensions for the specified web property.",
  },
  inputs: {
    connection: connectionInput,
    webPropertyId: input({
      label: "Web Property ID",
      type: "string",
      required: true,
      example: "UA-12345678-1",
      clean: util.types.toString,
    }),
    accountId: input({
      label: "Account ID",
      type: "string",
      required: true,
      example: "37746615",
      clean: util.types.toString,
    }),
  },
  perform: async (_context, { connection, accountId, webPropertyId }) => {
    const client = createClient({ connection });
    let nextLink = null;
    const itemsPerPage = 1000;
    let index = 1;
    const dimensions: analytics_v3.Schema$CustomDimension[] = [];
    do {
      const { data } = await client.management.customDimensions.list({
        accountId,
        webPropertyId,
        "start-index": index,
        "max-results": itemsPerPage,
      });
      if (data.items) {
        dimensions.push(...data.items);
      }
      index++;
      nextLink = data.nextLink;
    } while (nextLink);
    const elements = dimensions
      .map<Element>((dimension) => ({
        key: util.types.toString(dimension.id),
        label: util.types.toString(dimension.name),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result: elements };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Custom Dimension", key: "ga:dimension1" }],
  },
});

export default {
  accountNames,
  getCustomMetric,
  getWebProperty,
  profiles,
  selectCustomDimension,
};

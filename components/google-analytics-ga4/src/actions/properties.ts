import { action, input, util } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import {
  getPropertyExamplePayload,
  listPropertiesExamplePayload,
  runReportExamplePayload,
} from "../examplePayloads";
import {
  accountId,
  connectionInput,
  getPropertyInputs,
  listPropertiesInputs,
  propertyIdInput,
} from "../inputs";
import type { Property } from "../types";
import { paginateRecords } from "../util";

const listProperties = action({
  display: {
    label: "List Properties",
    description: "List Google Analytics GA4 properties for an account",
  },
  inputs: listPropertiesInputs,
  perform: async (context, { connection, accountId, pageSize, pageToken, fetchAll }) => {
    const client = createAnalyticsClient({
      connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });
    const data = await paginateRecords<Property, "properties">(
      client,
      "/properties",
      {
        filter: `parent:${accountId}`,
        pageSize,
        pageToken,
      },
      fetchAll,
      "properties",
    );
    return { data };
  },
  examplePayload: listPropertiesExamplePayload,
});

const getProperty = action({
  display: {
    label: "Get Property",
    description: "Get property by ID",
  },
  inputs: getPropertyInputs,
  perform: async (context, params) => {
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "adminv1beta",
      debug: context.debug.enabled,
    });
    const { data } = await client.get<Property>(params.propertyId);
    return { data };
  },
  examplePayload: getPropertyExamplePayload,
});

const runReport = action({
  display: {
    label: "Run Report",
    description: "Run a customized report on your Google Analytics event data",
  },
  inputs: {
    connection: connectionInput,
    accountId: { ...accountId, required: false },
    propertyId: propertyIdInput,
    requestBody: input({
      label: "Request Body",
      type: "code",
      language: "json",
      required: true,
      comments:
        "See [Google Analytics API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport) for details on what dimensions, metrics, etc., you can specify.",
      default: JSON.stringify(
        {
          dimensions: [
            {
              name: "pageTitle",
            },
          ],
          metrics: [
            {
              name: "sessions",
            },
          ],
          dateRanges: [
            {
              startDate: "7daysAgo",
              endDate: "yesterday",
            },
          ],
          dimensionFilter: {
            notExpression: {
              filter: {
                fieldName: "pageTitle",
                stringFilter: {
                  value: "My Homepage",
                },
              },
            },
          },
        },
        null,
        2,
      ),
      clean: util.types.toObject,
    }),
  },
  perform: async (context, params) => {
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "datav1beta",
      debug: context.debug.enabled,
    });
    const { data } = await client.post(`${params.propertyId}:runReport`, params.requestBody);
    return { data };
  },
  examplePayload: runReportExamplePayload,
});

export default { getProperty, listProperties, runReport };

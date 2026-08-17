import { action, input, outputSchema, util } from "@prismatic-io/spectral";
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
import {
  getPropertyOutputSchema,
  listPropertiesOutputSchema,
  runReportOutputSchema,
} from "../outputSchemas";
import type { Property } from "../types";
import { paginateRecords } from "../util";
const listProperties = action({
  display: {
    label: "List Properties",
    description: "List Google Analytics GA4 properties for an account",
  },
  inputs: listPropertiesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPropertiesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, accountId, pagination, fetchAll }) => {
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
        pageSize: pagination.pageSize,
        pageToken: pagination.pageToken,
      },
      fetchAll,
      "properties",
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { accountId },
  ): Promise<{
    data: unknown;
  }> => {
    const properties = listPropertiesExamplePayload.data.properties as Record<
      string,
      unknown
    >[];
    return {
      data: {
        ...listPropertiesExamplePayload.data,
        properties: properties.map((property) => ({
          ...property,
          parent: accountId,
          account: accountId,
        })),
      },
    };
  },
  examplePayload: listPropertiesExamplePayload,
});
const getProperty = action({
  display: {
    label: "Get Property",
    description: "Get property by ID",
  },
  inputs: getPropertyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPropertyOutputSchema,
  }),
  performSafety: "safe",
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
    description: "Run a customized report on Google Analytics event data.",
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
        "See [Google Analytics API documentation](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport) for details on what dimensions, metrics, etc., can be specified.",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runReportOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "datav1beta",
      debug: context.debug.enabled,
    });
    const { data } = await client.post(
      `${params.propertyId}:runReport`,
      params.requestBody,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { requestBody },
  ): Promise<{
    data: unknown;
  }> => {
    const { dimensions, metrics } = requestBody as {
      dimensions?: {
        name: string;
      }[];
      metrics?: {
        name: string;
      }[];
    };
    const example = runReportExamplePayload.data;
    const dimensionHeaders = dimensions?.length
      ? dimensions.map(({ name }) => ({ name }))
      : example.dimensionHeaders;
    const metricHeaders = metrics?.length
      ? metrics.map(({ name }) => ({ name }))
      : example.metricHeaders;
    return {
      data: {
        ...example,
        dimensionHeaders,
        metricHeaders,
        rows: example.rows.map((row) => ({
          dimensionValues: dimensionHeaders.map(
            (_header, index) =>
              row.dimensionValues[index] ?? row.dimensionValues[0],
          ),
          metricValues: metricHeaders.map(
            (_header, index) => row.metricValues[index] ?? row.metricValues[0],
          ),
        })),
      },
    };
  },
  examplePayload: runReportExamplePayload,
});
export default { getProperty, listProperties, runReport };

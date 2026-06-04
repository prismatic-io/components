import { action, util } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../client";
import { sendMetricsExamplePayload } from "../examplePayloads";
import {
  timestamp,
  metricName,
  metricType,
  metricValue,
  attributes,
  connectionInput,
} from "../inputs";

export const sendMetrics = action({
  display: {
    label: "Send Metric Data",
    description: "Use the Metric API to send custom metrics to the New Relic",
  },
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
    );

    const { data } = await client.post(
      "https://metric-api.newrelic.com/metric/v1",
      [
        {
          metrics: [
            {
              name: params.metricName,
              type: params.metricType,
              value: params.metricValue || undefined,
              timestamp: params.timestamp,
              attributes: {
                ...(util.types.keyValPairListToObject(params.attributes) ||
                  undefined),
              },
            },
          ],
        },
      ],
    );

    return {
      data,
    };
  },
  examplePayload: sendMetricsExamplePayload,
  inputs: {
    metricName,
    metricType,
    metricValue,
    attributes,
    timestamp,
    newRelicConnection: connectionInput,
  },
});

export default sendMetrics;

import { action } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../client";
import { sendLogsExamplePayload } from "../examplePayloads";
import { connectionInput, jsonMessage, timestamp } from "../inputs";

export const sendLogs = action({
  display: {
    label: "Send Logs",
    description: "Use the Log API to send log data to New Relic",
  },
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
    );

    const { data } = await client.post("https://log-api.newrelic.com/log/v1", {
      timestamp: params.timestamp,
      message: params.jsonMessage || undefined,
    });

    return {
      data,
    };
  },
  examplePayload: sendLogsExamplePayload,
  inputs: { jsonMessage, timestamp, newRelicConnection: connectionInput },
});

export default sendLogs;

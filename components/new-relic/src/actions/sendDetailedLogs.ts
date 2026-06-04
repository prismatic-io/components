import { action } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../client";
import { sendDetailedLogsExamplePayload } from "../examplePayloads";
import { codeMessage, connectionInput } from "../inputs";

export const sendDetailedLogs = action({
  display: {
    label: "Send Detailed Logs",
    description:
      "Use the Log API to send a detailed log using a custom request body to New Relic",
  },
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
    );

    const { data } = await client.post(
      "https://log-api.newrelic.com/log/v1",
      params.codeMessage,
    );

    return {
      data,
    };
  },
  examplePayload: sendDetailedLogsExamplePayload,
  inputs: { codeMessage, newRelicConnection: connectionInput },
});

export default sendDetailedLogs;

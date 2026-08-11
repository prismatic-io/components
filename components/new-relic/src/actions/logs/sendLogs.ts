import { action, outputSchema } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../../client";
import { Service } from "../../constants";
import { sendLogsExamplePayload } from "../../examplePayloads";
import { sendLogsInputs } from "../../inputs";
import { sendLogsOutputSchema } from "../../outputSchemas";
export const sendLogs = action({
  display: {
    label: "Send Logs",
    description: "Use the Log API to send log data to New Relic.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
      Service.LOGS,
    );
    const { data } = await client.post("", {
      timestamp: params.timestamp,
      message: params.jsonMessage,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...sendLogsExamplePayload,
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendLogsOutputSchema,
  }),
  examplePayload: sendLogsExamplePayload,
  inputs: sendLogsInputs,
});
export default sendLogs;

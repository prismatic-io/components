import { action, outputSchema } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../../client";
import { Service } from "../../constants";
import { sendDetailedLogsExamplePayload } from "../../examplePayloads";
import { sendDetailedLogsInputs } from "../../inputs";
import { sendDetailedLogsOutputSchema } from "../../outputSchemas";
export const sendDetailedLogs = action({
  display: {
    label: "Send Detailed Logs",
    description:
      "Use the Log API to send a detailed log using a custom request body to New Relic.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
      Service.LOGS,
    );
    const { data } = await client.post("", params.codeMessage);
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...sendDetailedLogsExamplePayload,
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendDetailedLogsOutputSchema,
  }),
  examplePayload: sendDetailedLogsExamplePayload,
  inputs: sendDetailedLogsInputs,
});
export default sendDetailedLogs;

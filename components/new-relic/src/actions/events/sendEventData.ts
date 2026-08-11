import { action, outputSchema } from "@prismatic-io/spectral";
import { getNewRelicClient } from "../../client";
import { Service } from "../../constants";
import { sendEventDataExamplePayload } from "../../examplePayloads";
import { sendEventDataInputs } from "../../inputs";
import { sendEventDataOutputSchema } from "../../outputSchemas";
export const sendEventData = action({
  display: {
    label: "Send Event Data",
    description: "Use the Event API to send custom event data to New Relic.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getNewRelicClient(
      params.newRelicConnection,
      context.debug.enabled,
      Service.INSIGHTS,
    );
    const { data } = await client.post(`/accounts/${params.accountId}/events`, [
      {
        ...params.additionalAttributes,
        eventType: params.eventType,
      },
    ]);
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    ...sendEventDataExamplePayload,
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendEventDataOutputSchema,
  }),
  examplePayload: sendEventDataExamplePayload,
  inputs: sendEventDataInputs,
});
export default sendEventData;

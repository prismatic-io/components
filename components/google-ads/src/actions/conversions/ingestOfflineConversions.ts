import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../../client";
import { ingestOfflineConversionsExamplePayload } from "../../examplePayloads";
import { ingestOfflineConversionsInputs } from "../../inputs";
import { ingestOfflineConversionsOutputSchema } from "../../outputSchemas";
export const ingestOfflineConversions = action({
  display: {
    label: "Ingest Offline Conversions",
    description:
      "Import offline conversion events into Google Ads using the Data Manager API.",
  },
  inputs: ingestOfflineConversionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestOfflineConversionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, events, destinations, encoding, validateOnly },
  ) => {
    const client = createDataManagerClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const body = {
      destinations,
      events,
      validateOnly,
      encoding,
    };
    const { data } = await client.post("/events:ingest", body);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ingestOfflineConversionsExamplePayload,
  examplePayload: ingestOfflineConversionsExamplePayload,
});

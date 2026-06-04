import { action } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../../client";
import { ingestOfflineConversionsExamplePayload } from "../../examplePayloads";
import { ingestOfflineConversionsInputs } from "../../inputs";

export const ingestOfflineConversions = action({
  display: {
    label: "Ingest Offline Conversions",
    description:
      "Import offline conversion events into Google Ads using the Data Manager API.",
  },
  inputs: ingestOfflineConversionsInputs,
  perform: async (
    context,
    { connection, events, destinations, encoding, validateOnly },
  ) => {
    const client = createDataManagerClient(
      connection,
      context.debug.enabled,
      context.logger,
    );

    const body = {
      destinations,
      events,
      validateOnly,
      encoding,
    };

    const { data } = await client.post("/events:ingest", body);
    return { data };
  },
  examplePayload: ingestOfflineConversionsExamplePayload,
});

import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateCollectorInputs } from "../../inputs";
import { updateCollectorExamplePayload } from "../../examplePayloads";
import type { Collector } from "../../types";
export const updateCollector = action({
  display: {
    label: "Update Collector",
    description: "Update an existing collector's settings.",
  },
  inputs: updateCollectorInputs,
  perform: async (
    context,
    { connection, collectorId, name, collectorSettings = {}, extraBody },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body: Record<string, unknown> = {
      name,
      thank_you_message: collectorSettings.thankYouMessage,
      close_date: collectorSettings.closeDate,
      redirect_url: collectorSettings.redirectUrl,
      allow_multiple_responses: collectorSettings.allowMultipleResponsesModel
        ? util.types.toBool(collectorSettings.allowMultipleResponsesModel)
        : undefined,
      ...extraBody,
    };
    const { data } = await client.patch<Collector>(
      `/collectors/${collectorId}`,
      body,
    );
    return { data };
  },
  examplePayload: updateCollectorExamplePayload,
});

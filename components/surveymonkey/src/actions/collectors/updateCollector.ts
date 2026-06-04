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
    {
      connection,
      collectorId,
      name,
      thankYouMessage,
      closeDate,
      redirectUrl,
      allowMultipleResponsesModel,
      extraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    
    const body: Record<string, unknown> = {
      name,
      thank_you_message: thankYouMessage,
      close_date: closeDate,
      redirect_url: redirectUrl,
      allow_multiple_responses: allowMultipleResponsesModel
        ? util.types.toBool(allowMultipleResponsesModel)
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

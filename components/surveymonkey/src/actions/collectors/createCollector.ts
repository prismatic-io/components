import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCollectorInputs } from "../../inputs";
import { createCollectorExamplePayload } from "../../examplePayloads";
import type { Collector, CreateCollectorInput } from "../../types";
export const createCollector = action({
  display: {
    label: "Create Collector",
    description:
      "Create a new collector for a survey. Non-weblink collectors require a paid plan.",
  },
  inputs: createCollectorInputs,
  perform: async (
    context,
    { connection, surveyId, type, name, collectorSettings = {}, extraBody },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body: CreateCollectorInput = {
      type: type as CreateCollectorInput["type"],
      name,
      thank_you_message: collectorSettings.thankYouMessage,
      close_date: collectorSettings.closeDate,
      redirect_url: collectorSettings.redirectUrl,
      allow_multiple_responses: collectorSettings.allowMultipleResponses,
      ...extraBody,
    };
    const { data } = await client.post<Collector>(
      `/surveys/${surveyId}/collectors`,
      body,
    );
    return { data };
  },
  examplePayload: createCollectorExamplePayload,
});

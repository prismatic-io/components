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
    {
      connection,
      surveyId,
      type,
      name,
      thankYouMessage,
      closeDate,
      redirectUrl,
      allowMultipleResponses,
      extraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body: CreateCollectorInput = {
      type: type as CreateCollectorInput["type"],
      name,
      thank_you_message: thankYouMessage,
      close_date: closeDate,
      redirect_url: redirectUrl,
      allow_multiple_responses: allowMultipleResponses,
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

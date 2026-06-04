import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSurveyInputs } from "../../inputs";
import { getSurveyDetailsExamplePayload } from "../../examplePayloads";
import type { SurveyDetails } from "../../types";









export const getSurveyDetails = action({
  display: {
    label: "Get Survey Details",
    description:
      "Retrieve the complete survey structure including pages and questions.",
  },
  inputs: getSurveyInputs,
  perform: async (context, { connection, surveyId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<SurveyDetails>(
      `/surveys/${surveyId}/details`,
    );

    return { data };
  },
  examplePayload: getSurveyDetailsExamplePayload,
});

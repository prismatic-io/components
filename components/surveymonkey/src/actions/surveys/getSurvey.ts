import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSurveyInputs } from "../../inputs";
import { getSurveyExamplePayload } from "../../examplePayloads";
import type { Survey } from "../../types";









export const getSurvey = action({
  display: {
    label: "Get Survey",
    description:
      "Retrieve summary information about a survey. Use 'Get Survey Details' for full structure.",
  },
  inputs: getSurveyInputs,
  perform: async (context, { connection, surveyId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<Survey>(`/surveys/${surveyId}`);

    return { data };
  },
  examplePayload: getSurveyExamplePayload,
});

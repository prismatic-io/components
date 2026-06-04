import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getResponseInputs } from "../../inputs";
import { getResponseExamplePayload } from "../../examplePayloads";
import type { SurveyResponse } from "../../types";









export const getResponse = action({
  display: {
    label: "Get Response",
    description:
      "Get summary information about a specific response. Use 'Get Response Details' for full answers.",
  },
  inputs: getResponseInputs,
  perform: async (context, { connection, surveyId, responseId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<SurveyResponse>(
      `/surveys/${surveyId}/responses/${responseId}`,
    );

    return { data };
  },
  examplePayload: getResponseExamplePayload,
});

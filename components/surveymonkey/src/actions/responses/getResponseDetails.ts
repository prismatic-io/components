import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getResponseInputs } from "../../inputs";
import { getResponseDetailsExamplePayload } from "../../examplePayloads";
import type { SurveyResponseDetails } from "../../types";








export const getResponseDetails = action({
  display: {
    label: "Get Response Details",
    description:
      "Get complete response details including all answers. Requires responses_read_detail scope.",
  },
  inputs: getResponseInputs,
  perform: async (context, { connection, surveyId, responseId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<SurveyResponseDetails>(
      `/surveys/${surveyId}/responses/${responseId}/details`,
    );

    return { data };
  },
  examplePayload: getResponseDetailsExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getSurveyExamplePayload } from "../../examplePayloads/surveys";
import { getSurveyInputs } from "../../inputs";






export const getSurvey = action({
  display: {
    label: "Get Survey",
    description: "Retrieve information about a specific survey.",
  },
  inputs: getSurveyInputs,
  perform: async (context, { ssvConnection, surveyId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(`/v3/survey/${surveyId}`);

    return { data };
  },
  examplePayload: getSurveyExamplePayload,
});

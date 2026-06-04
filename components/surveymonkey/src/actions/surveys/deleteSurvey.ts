import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSurveyInputs } from "../../inputs";
import { deleteSurveyExamplePayload } from "../../examplePayloads";











export const deleteSurvey = action({
  display: {
    label: "Delete Survey",
    description:
      "Permanently delete a survey and all its data. This cannot be undone.",
  },
  inputs: deleteSurveyInputs,
  perform: async (context, { connection, surveyId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/surveys/${surveyId}`);

    return {
      data: {
        success: true,
        surveyId,
        message: `Survey ${surveyId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteSurveyExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteResponseInputs } from "../../inputs";
import { deleteResponseExamplePayload } from "../../examplePayloads";









export const deleteResponse = action({
  display: {
    label: "Delete Response",
    description: "Delete a survey response.",
  },
  inputs: deleteResponseInputs,
  perform: async (context, { connection, surveyId, responseId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/surveys/${surveyId}/responses/${responseId}`);

    return {
      data: {
        success: true,
        surveyId,
        responseId,
        message: `Response ${responseId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteResponseExamplePayload,
});

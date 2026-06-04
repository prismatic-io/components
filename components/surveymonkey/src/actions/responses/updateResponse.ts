import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateResponseInputs } from "../../inputs";
import { updateResponseExamplePayload } from "../../examplePayloads";
import type { SurveyResponse } from "../../types";











export const updateResponse = action({
  display: {
    label: "Update Response",
    description: "Update response metadata such as status.",
  },
  inputs: updateResponseInputs,
  perform: async (
    context,
    {
      connection,
      surveyId,
      responseId,
      responsePages,
      status,
      customValue,
      extraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    if (!Array.isArray(responsePages)) {
      throw new Error("Response pages must be a JSON array of response pages.");
    }

    const body: Record<string, unknown> = {
      pages: responsePages,
      response_status: status,
      custom_value: customValue,
      ...extraBody,
    };

    const { data } = await client.patch<SurveyResponse>(
      `/surveys/${surveyId}/responses/${responseId}`,
      body,
    );

    return { data };
  },
  examplePayload: updateResponseExamplePayload,
});

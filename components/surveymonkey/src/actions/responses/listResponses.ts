import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listResponsesInputs } from "../../inputs";
import { listResponsesExamplePayload } from "../../examplePayloads";
import type { SurveyResponse } from "../../types";
export const listResponses = action({
  display: {
    label: "List Responses",
    description: "List summary information for all responses to a survey.",
  },
  inputs: listResponsesInputs,
  perform: async (
    context,
    { connection, surveyId, status, fetchAll, pagination = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const endpoint = `/surveys/${surveyId}/responses`;
    const params: Record<string, unknown> = {};
    if (status) {
      params.status = status;
    }
    const data = await paginateResults<SurveyResponse>(
      client,
      endpoint,
      fetchAll,
      {
        ...params,
        page: pagination.page,
        per_page: pagination.perPage,
      },
    );
    return { data };
  },
  examplePayload: listResponsesExamplePayload,
});

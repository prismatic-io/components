import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listResponsesInputs } from "../../inputs";
import { listResponsesBulkExamplePayload } from "../../examplePayloads";
import type { SurveyResponseDetails } from "../../types";
export const listResponsesBulk = action({
  display: {
    label: "List Responses Bulk",
    description:
      "Bulk export responses with full answer details. More efficient for large exports.",
  },
  inputs: listResponsesInputs,
  perform: async (
    context,
    { connection, surveyId, status, fetchAll, pagination = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const endpoint = `/surveys/${surveyId}/responses/bulk`;
    const params: Record<string, unknown> = {};
    if (status) {
      params.status = status;
    }
    const data = await paginateResults<SurveyResponseDetails>(
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
  examplePayload: listResponsesBulkExamplePayload,
});

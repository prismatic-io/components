import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { paginateResults } from "../../util";
import { listCollectorsInputs } from "../../inputs";
import { listCollectorsExamplePayload } from "../../examplePayloads";
import type { Collector } from "../../types";
export const listCollectors = action({
  display: {
    label: "List Collectors",
    description: "List all collectors for a survey.",
  },
  inputs: listCollectorsInputs,
  perform: async (
    context,
    { connection, surveyId, fetchAll, pagination = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const endpoint = `/surveys/${surveyId}/collectors`;
    const data = await paginateResults<Collector>(client, endpoint, fetchAll, {
      page: pagination.page,
      per_page: pagination.perPage,
    });
    return { data };
  },
  examplePayload: listCollectorsExamplePayload,
});

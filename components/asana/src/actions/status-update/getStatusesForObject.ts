import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getStatusesForObjectExamplePayload } from "../../examplePayloads";
import { getStatusesForObjectInputs } from "../../inputs";
export const getStatusesForObject = action({
  display: {
    label: "Get Status Updates from Object",
    description: "Get status updates from a project, portfolio, or goal.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/status_updates`, {
      params: {
        parent: params.parent,
        limit: params.pagination.limit,
        offset: params.pagination.offset,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getStatusesForObjectInputs,
  examplePayload: getStatusesForObjectExamplePayload,
});

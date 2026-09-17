import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listAgentsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAgentsInputs as inputs } from "../../inputs";
import { listAgentsOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listAgents = action({
  display: {
    label: "List Agents",
    description: "Returns a list of all agents.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/agents`, "agents", {
      fetchAll,
      params: {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAgentsOutputSchema,
  }),
  inputs,
  examplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listAgentsExamplePayload as examplePayload } from "../../examplePayloads";
import { listAgentsInputs as inputs } from "../../inputs/agents";
import { getListData } from "../../util";
export const listAgents = action({
  display: {
    label: "List Agents",
    description: "Returns a list of all agents.",
  },
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const { data } = await getListData(client, `/agents`, "agents", fetchAll, {
      ...additionalQueryParams,
      per_page: pagination.perPage,
      page: pagination.page,
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});

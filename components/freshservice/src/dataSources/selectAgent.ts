import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectAgentInputs as inputs } from "../inputs/dataSources";
import type { Agent } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectAgent = dataSource({
  display: {
    label: "Select Agent",
    description: "Select an agent from a list of agents.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Agent, "agents">(
      client,
      `/agents`,
      "agents",
      true,
      {},
    );

    const objects = (data.agents || []).map<Element>(
      ({ first_name, last_name, email, id }) => ({
        key: util.types.toString(id),
        label: `${first_name} ${last_name ? last_name : ""} (${email})`,
      }),
    );

    return { result: objects };
  },
});

import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectRequesterInputs as inputs } from "../inputs/dataSources";
import type { Requester } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectRequester = dataSource({
  display: {
    label: "Select Requester",
    description: "Select a requester from a list of requesters.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Requester, "requesters">(
      client,
      `/requesters`,
      "requesters",
      true,
      {},
    );

    const objects = (data.requesters || []).map<Element>(
      ({ first_name, last_name, primary_email, id }) => ({
        key: util.types.toString(id),
        label: `${first_name} ${last_name ? last_name : ""} (${primary_email})`,
      }),
    );

    return { result: objects };
  },
});

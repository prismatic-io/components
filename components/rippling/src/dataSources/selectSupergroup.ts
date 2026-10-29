import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface SupergroupRecord {
  id: string;
  name?: string;
}

export const selectSupergroup = dataSource({
  display: {
    label: "Select Supergroup",
    description: "Select a supergroup from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/supergroups");

    const results = data?.results as SupergroupRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((sg) => ({
        label: sg.name || sg.id,
        key: util.types.toString(sg.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

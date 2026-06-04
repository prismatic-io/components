import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface TeamRecord {
  id: string;
  name?: string;
}

export const selectTeam = dataSource({
  display: {
    label: "Select Team",
    description: "Select a team from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/teams");

    const results = data?.results as TeamRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((team) => ({
        label: team.name || team.id,
        key: util.types.toString(team.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

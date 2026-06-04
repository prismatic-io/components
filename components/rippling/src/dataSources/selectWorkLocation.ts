import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface WorkLocationRecord {
  id: string;
  name?: string;
}

export const selectWorkLocation = dataSource({
  display: {
    label: "Select Work Location",
    description: "Select a work location from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/work-locations");

    const results = data?.results as WorkLocationRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((loc) => ({
        label: loc.name || loc.id,
        key: util.types.toString(loc.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

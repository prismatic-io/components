import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface ObjectCategoryRecord {
  id: string;
  name?: string;
}

export const selectObjectCategory = dataSource({
  display: {
    label: "Select Object Category",
    description: "Select an object category from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/object-categories/");

    const results = data?.results as ObjectCategoryRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((cat) => ({
        label: cat.name || cat.id,
        key: util.types.toString(cat.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

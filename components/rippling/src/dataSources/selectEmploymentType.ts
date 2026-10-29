import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface EmploymentTypeRecord {
  id: string;
  name?: string;
}

export const selectEmploymentType = dataSource({
  display: {
    label: "Select Employment Type",
    description: "Select an employment type from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/employment-types");

    const results = data?.results as EmploymentTypeRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((et) => ({
        label: et.name || et.id,
        key: util.types.toString(et.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

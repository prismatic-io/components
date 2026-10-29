import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface DepartmentRecord {
  id: string;
  name?: string;
}

export const selectDepartment = dataSource({
  display: {
    label: "Select Department",
    description: "Select a department from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/departments");

    const results = data?.results as DepartmentRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((dept) => ({
        label: dept.name || dept.id,
        key: util.types.toString(dept.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface JobFunctionRecord {
  id: string;
  name?: string;
}

export const selectJobFunction = dataSource({
  display: {
    label: "Select Job Function",
    description: "Select a job function from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/job-functions");

    const results = data?.results as JobFunctionRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((jf) => ({
        label: jf.name || jf.id,
        key: util.types.toString(jf.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

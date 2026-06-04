import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { API_VERSION } from "../constants";
import { connection } from "../inputs/general";

interface BusinessPartnerGroupRecord {
  id: string;
  name?: string;
}

export const selectBusinessPartnerGroup = dataSource({
  display: {
    label: "Select Business Partner Group",
    description: "Select a business partner group from your Rippling account.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, API_VERSION.V2);
    const { data } = await client.get("/business-partner-groups");

    const results = data?.results as BusinessPartnerGroupRecord[] | undefined;
    if (!results || !Array.isArray(results)) {
      return { result: [] };
    }

    const result: Element[] = results
      .map((bpg) => ({
        label: bpg.name || bpg.id,
        key: util.types.toString(bpg.id),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
});

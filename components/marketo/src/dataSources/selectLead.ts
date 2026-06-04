import { dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import type { Lead, PaginatedResponse } from "../interfaces";
import { selectLeadInputs } from "../inputs";
import { filterAndSort } from "../utils";
import type { ElementWithLabel } from "../types";

export const selectLead = dataSource({
  display: {
    label: "Select Lead",
    description: "Select a Lead field from a dropdown menu.",
  },
  inputs: selectLeadInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, filterQuery }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<PaginatedResponse<Lead>>(
      `/v1/leads/describe.json`,
    );

    const objects = data.result.map<ElementWithLabel>((lead) => ({
      key: util.types.toString(lead.id),
      label: lead.displayName,
    }));

    return { result: filterAndSort(objects, filterQuery) };
  },
});

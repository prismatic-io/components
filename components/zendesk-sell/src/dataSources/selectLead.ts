import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectLeadInputs } from "../inputs/dataSources/lead";

export const selectLead = dataSource({
  display: {
    label: "Select Lead",
    description: "Select a lead from your Zendesk Sell account.",
  },
  inputs: selectLeadInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/leads", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((lead: any) => {
          return {
            key: lead.data.id.toString(),
            label:
              `${lead.data.first_name || ""} ${lead.data.last_name || ""}`.trim() ||
              `Lead ${lead.data.id}`,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Lead", key: "12345" }],
  },
});

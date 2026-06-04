import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectContactInputs } from "../inputs/dataSources/contact";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "Select a contact from your Zendesk Sell account.",
  },
  inputs: selectContactInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/contacts", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((contact: any) => {
          return {
            key: contact.data.id.toString(),
            label:
              contact.data.name ||
              `${contact.data.first_name || ""} ${contact.data.last_name || ""}`.trim() ||
              `Contact ${contact.data.id}`,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Contact", key: "12345" }],
  },
});

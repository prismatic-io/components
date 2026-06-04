import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { paginateResults } from "../util";
import { connectionInput } from "../inputs";
import type { Contact } from "../types";




export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "A picklist of contacts in your SurveyMonkey account.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const response = await paginateResults<Contact>(client, "/contacts", true);

    const result = response.data
      .map<Element>((contact) => ({
        label: [contact.first_name, contact.last_name, `<${contact.email}>`]
          .filter(Boolean)
          .join(" "),
        key: contact.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Jane Smith <jane@example.com>", key: "1234567890" },
      { label: "John Doe <john@example.com>", key: "9876543210" },
    ],
  },
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithLimit, sortRecords } from "../util";

interface Lead {
  id: string;
  title: string;
}

export const selectLead = dataSource({
  display: {
    label: "Select Lead",
    description: "Select a Lead from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false);
    const { data } = await paginateRecordsWithLimit<Lead>(client, "leads", {}, true);

    const objects = sortRecords(data, "title").map<Element>((lead) => ({
      key: lead.id.toString(),
      label: lead.title,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Lead", key: "abc-123" }],
  },
});

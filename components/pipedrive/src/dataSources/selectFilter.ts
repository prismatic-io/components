import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { sortRecords } from "../util";

interface Filter {
  id: number;
  name: string;
  type: string;
}

export const selectFilter = dataSource({
  display: {
    label: "Select Filter",
    description: "Select a Filter from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false);
    const { data } = await client.get<{ data: Filter[] }>("/filters");

    const filters = data?.data ?? [];

    const result = sortRecords(filters, "name").map<Element>((filter) => ({
      key: filter.id.toString(),
      label: filter.type ? `${filter.name} (${filter.type})` : filter.name,
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "My Deals (deals)", key: "1" }],
  },
});

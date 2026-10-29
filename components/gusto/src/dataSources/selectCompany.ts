import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

interface Company {
  uuid: string;
  name: string;
}

export const selectCompany = dataSource({
  display: {
    label: "Select Company",
    description: "A picklist of companies in your Gusto account.",
  },
  dataSourceType: "picklist",
  inputs: { connection: connectionInput },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<Company[]>("/companies");

    const result = data
      .map<Element>((company) => ({
        label: company.name,
        key: company.uuid.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  examplePayload: {
    result: [
      {
        label: "Acme Corporation",
        key: "c44d66dc-c41b-4a60-9e25-5e93ff8583f2",
      },
    ],
  },
});

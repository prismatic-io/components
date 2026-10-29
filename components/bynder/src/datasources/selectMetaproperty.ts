import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";

interface Metaproperty {
  id: string;
  name: string;
  label: string;
  type: string;
}

export const selectMetaproperty = dataSource({
  display: {
    label: "Select Metaproperty",
    description:
      "Select a metaproperty from the list of metaproperties available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/metaproperties");

    const metaproperties = Object.values(data) as Metaproperty[];

    const objects = metaproperties
      .map<Element>((metaproperty) => ({
        key: metaproperty.id.toString(),
        label: `${metaproperty.label} (ID: ${metaproperty.id})`,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Colours (ID: 123)",
        key: "123",
      },
    ],
  },
});

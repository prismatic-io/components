import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

interface Channel {
  id: number;
  name: string;
}

export const selectChannel = dataSource({
  display: {
    label: "Select Channel",
    description: "Select a channel from your ShipBob account.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } = await client.get<Channel[]>("/channel");
    return {
      result: data
        .map<Element>((channel) => ({
          label: channel.name,
          key: channel.id.toString(),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "My Store", key: "12345" },
      { label: "Shopify Channel", key: "67890" },
    ],
  },
});

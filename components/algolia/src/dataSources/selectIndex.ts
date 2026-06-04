import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAlgoliaClient } from "../client";
import { connectionInput } from "../inputs";

export const selectIndex = dataSource({
  display: {
    label: "Select Index",
    description: "Select an Algolia index from your application.",
  },
  inputs: {
    algoliaConnection: connectionInput,
  },
  perform: async (_context, { algoliaConnection }) => {
    const client = createAlgoliaClient({
      algoliaConnection,
      isGoingToRead: true,
      debug: false,
    });

    const { data } = await client.get("/1/indexes");

    return {
      result: (data.items as { name: string }[])
        .map<Element>((item) => ({
          label: item.name,
          key: item.name,
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Index", key: "example_index" }],
  },
});

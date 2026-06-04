import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCollectionResponse } from "../examplePayloads";
import { connection } from "../inputs";
import type { Records } from "../types";
import { fetchCollections, sortArray } from "../util";

export const selectCollection = dataSource({
  display: {
    label: "Select Collection",
    description:
      "Select a collection from the list of collections available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const records = await fetchCollections(client, undefined);
    if (Array.isArray(records)) {
      const objects = sortArray<Records>(
        records as unknown as Records[],
        "name",
      ).map<Element>((collection) => ({
        key: collection.id.toString(),
        label: `${collection.name} (ID: ${collection.id})`,
      }));

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectCollectionResponse,
  },
});

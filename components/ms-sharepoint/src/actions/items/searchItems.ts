import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchItemsInputs } from "../../inputs";
import { searchItemsExamplePayload } from "../../examplePayloads/items/searchItemsExamplePayload";
import { paginateResults } from "../../utils";

export const searchItems = action({
  display: {
    label: "Search Items",
    description: "Search for items across all drives in a SharePoint site",
  },
  inputs: searchItemsInputs,
  perform: async (context, { connection, siteId, query }) => {
    const client = await createClient(connection, context.debug.enabled);

    const drivesEndpoint = `/sites/${siteId}/drives?$select=id,name`;
    const allDrives = (await paginateResults(client, drivesEndpoint)) as {
      id: string;
      name: string;
    }[];

    const searchResults = await Promise.all(
      allDrives.map(async (drive) => {
        try {
          const searchResults = (await paginateResults(
            client,
            `/drives/${drive.id}/root/search(q='${query}')`,
          )) as { name: string }[];

          const nameMatchedItems = searchResults.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
          );

          if (nameMatchedItems.length > 0) {
            return { driveName: drive.name, items: nameMatchedItems };
          }
        } catch (error) {
          throw new Error(`Search failed for drive "${drive.name}" (id: ${drive.id}): ${error}`);
        }
      }),
    );

    const data: Record<string, unknown[]> = {};
    for (const result of searchResults) {
      if (result) {
        data[result.driveName] = result.items;
      }
    }

    return { data };
  },
  examplePayload: searchItemsExamplePayload,
});

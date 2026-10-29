import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, listId, siteId } from "../../inputs";
import { sortArray } from "../../utils";
import type { ListItem } from "../../interfaces";

export const listItemsInSiteList = dataSource({
  display: {
    label: "List Items in Site List",
    description: "A picklist of items in a given site list",
  },
  inputs: {
    connection,
    siteId: { ...siteId, dataSource: undefined },
    listId: { ...listId, dataSource: undefined },
  },
  perform: async (_context, { connection, siteId, listId }) => {
    const client = await createClient(connection, false);
    const path = `/sites/${siteId}/lists/${listId}/items?$expand=fields`;
    const items: ListItem[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;

    do {
      const { data } = await client.get(nextLink);
      items.push(...(data?.value || []));
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);

    return {
      result: sortArray(
        items.map((item) => {
          return {
            key: item.id,
            label: item.fields.Title,
          };
        }),
      ),
    };
  },
  dataSourceType: "picklist",
});

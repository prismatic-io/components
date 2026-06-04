import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, siteId } from "../../inputs";
import { sortArray } from "../../utils";

interface SiteList {
  id: string;
  displayName?: string;
  name: string;
}

export const selectSiteList = dataSource({
  display: {
    label: "Select Site List",
    description: "A picklist of lists in a given site",
  },
  inputs: {
    connection,
    siteId: { ...siteId, dataSource: undefined },
  },
  perform: async (_context, { connection, siteId }) => {
    const client = await createClient(connection, false);
    const path = `/sites/${siteId}/lists`;
    const items: SiteList[] = [];
    let nextLink = `${client.defaults.baseURL}${path}`;
    client.defaults.baseURL = undefined;

    do {
      const { data } = await client.get(nextLink);
      items.push(...(data?.value || []));
      nextLink = data?.["@odata.nextLink"];
    } while (nextLink);

    return {
      result: sortArray(
        items.map((item) => ({
          key: item.id,
          label: item.displayName || item.name,
        })),
      ),
    };
  },
  dataSourceType: "picklist",
});

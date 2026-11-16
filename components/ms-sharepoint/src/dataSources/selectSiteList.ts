import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectSiteListExamplePayload } from "../examplePayloads";
import { selectSiteListInputs } from "../inputs/dataSources";
import type { SiteList } from "../types";
import { sortArray } from "../util";

export const selectSiteList = dataSource({
  display: {
    label: "Select Site List",
    description: "A picklist of lists in a given site.",
  },
  inputs: selectSiteListInputs,
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
  examplePayload: selectSiteListExamplePayload,
});

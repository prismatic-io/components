import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listSitesDataSourceExamplePayload } from "../examplePayloads";
import { listSitesInputs } from "../inputs/dataSources";
import type { GraphCollectionResponse, Site } from "../types";
import { mapToElement, sortArray } from "../util";

export const listSites = dataSource({
  display: {
    label: "List Sites from SharePoint",
    description: "A picklist of sites in the tenant.",
  },
  inputs: listSitesInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<GraphCollectionResponse<Site>>("/sites", {
      params: { search: "" },
    });
    const sites: Element[] = (data.value || []).map((site) => mapToElement(site));
    let nextLink = data?.["@odata.nextLink"];

    while (nextLink) {
      const { data } = await client.get<GraphCollectionResponse<Site>>(nextLink);
      sites.push(...(data.value || []).map((site) => mapToElement(site)));
      nextLink = data?.["@odata.nextLink"];
    }
    return {
      result: sortArray(sites),
    };
  },
  dataSourceType: "picklist",
  examplePayload: listSitesDataSourceExamplePayload,
});

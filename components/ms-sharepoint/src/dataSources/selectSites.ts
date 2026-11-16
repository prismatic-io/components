import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { SITE_SEARCH_ALL } from "../constants";
import { selectSitesExamplePayload } from "../examplePayloads";
import { selectSitesInputs } from "../inputs/dataSources";
import type { Site } from "../types";
import { fetchAllPages, nameOrId, sortArray, toObjectSelection } from "../util";

export const selectSites = dataSource({
  display: {
    label: "Select Sites",
    description: "Select one or many SharePoint sites.",
  },
  inputs: selectSitesInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const sites = await fetchAllPages<Site>(client, "/sites", { search: SITE_SEARCH_ALL });

    return {
      result: toObjectSelection(
        sortArray(
          sites.map<Element>((site) => ({
            key: site.id,
            label: nameOrId(site.displayName, site.id),
          })),
        ),
      ),
    };
  },
  dataSourceType: "objectSelection",
  examplePayload: selectSitesExamplePayload,
});

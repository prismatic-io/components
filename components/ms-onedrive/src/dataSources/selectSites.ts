import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { SITE_SEARCH_ALL } from "../constants";
import { selectSitesExamplePayload } from "../examplePayloads";
import { selectSitesInputs } from "../inputs";
import type { Site } from "../types";
import {
  fetchAllPages,
  nameOrId,
  sortElements,
  toObjectSelection,
} from "../util";

export const selectSites = dataSource({
  display: {
    label: "Select Sites",
    description: "Select one or many SharePoint sites.",
  },
  inputs: selectSitesInputs,
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const sites = await fetchAllPages<Site>(client, "/sites", {
      search: SITE_SEARCH_ALL,
    });

    return {
      result: toObjectSelection(
        sortElements(
          sites.map<Element>((site) => ({
            key: site.id,
            label: nameOrId(site.displayName, site.id),
          })),
        ),
      ),
    };
  },
  examplePayload: selectSitesExamplePayload,
  dataSourceType: "objectSelection",
});

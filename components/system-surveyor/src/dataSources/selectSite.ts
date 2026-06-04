import { dataSource } from "@prismatic-io/spectral";

import { createSsvClient } from "../client";
import { selectSiteExamplePayload } from "../examplePayloads/dataSources";
import { selectSiteInputs } from "../inputs";
import type { Site } from "../types";
import { fetchPaginatedResults, sortByLabel } from "../util";


export const selectSite = dataSource({
  display: {
    label: "Select Site",
    description: "Select a site from available System Surveyor sites.",
  },
  inputs: selectSiteInputs,
  perform: async (_context, params) => {
    const client = await createSsvClient(params.ssvConnection);
    const sites = await fetchPaginatedResults(client, "/v3/sitelist", {
      fetchAll: true,
    });

    const result = sortByLabel(
      (sites as Site[]).map((site) => ({
        label: site.name,
        key: site.id,
      })),
    );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectSiteExamplePayload,
});

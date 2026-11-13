import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { SITE_SEARCH_ALL } from "../constants";
import { selectSiteExamplePayload } from "../examplePayloads";
import { selectSiteInputs } from "../inputs";
import { fetchAllPages } from "../util";

export const selectSite = dataSource({
  display: {
    label: "Select Site",
    description: "Lists sites available to the current user.",
  },
  inputs: selectSiteInputs,
  perform: async (_context, { connection }) => {
    const client = getOneDriveClient(connection, false);
    const sites = await fetchAllPages<Record<string, unknown>>(
      client,
      "/sites",
      { search: SITE_SEARCH_ALL },
    );

    return {
      result: sites.map((record) => {
        return {
          label: record.displayName,
          key: record.id,
        };
      }) as Element[],
    };
  },
  examplePayload: selectSiteExamplePayload,
  dataSourceType: "picklist",
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectDriveInputs } from "../inputs/drives/list";
import { paginateResults } from "../helpers";
import type { Drive, Site } from "../interfaces";

export const selectDriveOrSite = dataSource({
  display: {
    label: "Select Drive or Site",
    description: "Select a drive or site from the list of drives and sites.",
  },
  inputs: selectDriveInputs,
  perform: async (_context, { connection }) => {
    const { client } = createClient(connection, false);
    const drivesUrl = "/me/drives";
    const drives = await paginateResults<Drive>(client, drivesUrl, true, {});
    const drivesResult = drives.value.map<Element>((drive) => ({
      label: `Drive: ${drive.name}`,
      key: drive.id,
    }));

    const sitesUrl = "/sites";
    const sites = await paginateResults<Site>(client, sitesUrl, true, {});
    const sitesResult = sites.value.map<Element>((site) => ({
      label: `Site: ${site.name}`,
      key: site.id,
    }));
    return { result: [...drivesResult, ...sitesResult] };
  },
  dataSourceType: "picklist",
});

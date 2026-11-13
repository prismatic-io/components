import { dataSource, type Element } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { GRAPH_FANOUT_CONCURRENCY } from "../constants";
import { selectDrivesFromSitesExamplePayload } from "../examplePayloads";
import { selectDrivesFromSitesInputs } from "../inputs";
import type { Drive, Site } from "../types";
import {
  fetchAllPages,
  listForParent,
  mapWithConcurrency,
  nameOrId,
  parentLabel,
  sortElements,
  toObjectSelection,
  withParentLabel,
} from "../util";

export const selectDrivesFromSites = dataSource({
  display: {
    label: "Select Drives from Sites",
    description: "Select one or many drives from the specified sites.",
  },
  inputs: selectDrivesFromSitesInputs,
  perform: async (context, { connection, siteIds }) => {
    const client = getOneDriveClient(connection, false);
    const multipleSites = siteIds.length > 1;

    const drivesBySite = await mapWithConcurrency(
      siteIds,
      GRAPH_FANOUT_CONCURRENCY,
      (site) =>
        listForParent<Element>(
          site,
          { kind: "site", canSkip: multipleSites, logger: context.logger },
          async () => {
            const siteName = multipleSites
              ? await parentLabel(site, async () => {
                  const { data } = await client.get<Site>(`/sites/${site.id}`, {
                    params: { $select: "displayName" },
                  });
                  return data.displayName;
                })
              : undefined;
            const drives = await fetchAllPages<Drive>(
              client,
              `/sites/${site.id}/drives`,
            );
            return drives.map<Element>((drive) => ({
              key: drive.id,
              label: withParentLabel(nameOrId(drive.name, drive.id), siteName),
            }));
          },
        ),
    );

    const drives = new Map<string, Element>();
    for (const drive of drivesBySite.flat()) {
      if (!drives.has(drive.key)) {
        drives.set(drive.key, drive);
      }
    }

    return {
      result: toObjectSelection(sortElements([...drives.values()])),
    };
  },
  examplePayload: selectDrivesFromSitesExamplePayload,
  dataSourceType: "objectSelection",
});

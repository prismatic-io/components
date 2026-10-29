import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select an asset from the list of assets available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    let records: Record<string, unknown>[] = [];
    let keepFetching = true;
    let page = 1;
    const limit = 1000;
    do {
      const { data } = await client.get("media", {
        params: {
          total: true,
          page,
          limit,
        },
      });
      const count = data?.total?.count;
      records = [...records, ...data.media];
      if (count) {
        keepFetching = records.length < count;
      } else {
        keepFetching = false;
      }
      page++;
    } while (keepFetching);

    if (Array.isArray(records)) {
      const objects = sortArray<Records>(
        records as unknown as Records[],
        "name",
      ).map<Element>((asset) => ({
        key: asset.id.toString(),
        label: `${asset.name} (ID: ${asset.id})`,
      }));

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        key: "D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123",
        label: "Grassland (ID: D4E5F6A7-B8C9-0123-D4E5-F6A7B8C90123)",
      },
    ],
  },
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { dealsDatasource } from "../examplePayloads/datasources";
import type { Deal } from "../types/deals";
import { WebhookVersion } from "../constants";

export const selectDeal = dataSource({
  display: {
    label: "Select Deal",
    description: "Select a Deal from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Deal>(client, "deals", {}, true);

    const objects = sortRecords(data, "id").map<Element>((deal) => ({
      key: deal.id.toString(),
      label: `${deal.title} - ${deal.status}`,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: dealsDatasource,
  },
});

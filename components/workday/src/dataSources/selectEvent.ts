import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectEventExamplePayload } from "../examplePayloads";
import { selectEventInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { toSortedPicklist } from "../util";
export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description: "A picklist of business process events in the Workday tenant.",
  },
  inputs: selectEventInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.businessProcess}/events`);
    return {
      result: toSortedPicklist(data.data, (item: WorkdayInstanceSummary) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectEventExamplePayload,
});

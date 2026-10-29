import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectPersonExamplePayload } from "../examplePayloads";
import { selectPersonInputs } from "../inputs";
import type { PersonSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectPerson = dataSource({
  display: {
    label: "Select Person",
    description: "A picklist of people in the Workday tenant.",
  },
  inputs: selectPersonInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.person}/people`);

    return {
      result: toSortedPicklist(data.data, (item: PersonSummary) => ({
        key: item.id,
        label: item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectPersonExamplePayload,
});

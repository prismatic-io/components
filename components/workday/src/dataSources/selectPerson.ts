import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectPersonExamplePayload } from "../examplePayloads";
import { selectPersonInputs } from "../inputs";
import type { PersonSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectPerson = dataSource({
  display: {
    label: "Select Person",
    description: "A picklist of people in the Workday tenant.",
  },
  inputs: selectPersonInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.person}/people`,
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as PersonSummary[], (item) => ({
        key: item.id,
        label: item.id,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectPersonExamplePayload,
});

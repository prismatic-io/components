import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { GROUPS_ENDPOINT } from "../constants";
import { selectGroupExamplePayload } from "../examplePayloads/dataSources";
import { selectGroupInputs } from "../inputs";
import type { Group } from "../types";
import { fetchAllData, TComparator } from "../util";
export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a Group from a dropdown menu.",
  },
  inputs: selectGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createHttpClient(connection, false);
    const { data } = (await fetchAllData(
      client,
      GROUPS_ENDPOINT,
      {},
      true,
    )) as {
      data: Group[];
    };
    const objects = data
      .sort(TComparator<Group>)
      .map<Element>(({ id, name }) => ({
        key: id,
        label: name,
      }));
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectGroupExamplePayload,
});

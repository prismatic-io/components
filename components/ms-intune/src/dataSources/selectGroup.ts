import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectGroupExamplePayload } from "../examplePayloads";
import { selectGroupInputs } from "../inputs";
import { paginateResults } from "../util";
export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group from the list of groups.",
  },
  inputs: selectGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false, true);
    const data = await paginateResults(client, ENDPOINTS.GROUPS, true);
    return data.value.map((group: { id: string; displayName: string }) => {
      return {
        label: group.displayName,
        key: group.id,
      };
    });
  },
  dataSourceType: "picklist",
  examplePayload: selectGroupExamplePayload,
});

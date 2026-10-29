import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectGroupInputs as inputs } from "../inputs/dataSources";
import { getValues } from "../util";

export const selectGroup = dataSource({
  display: {
    label: "Select Group",
    description: "Select a group from a picklist.",
  },
  inputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await getValues(true, client, `/groups`, {
      params: { $select: "id,displayName" },
    });
    return {
      result: data.value.map((group: { id: string; displayName: string }) => {
        return {
          key: group.id,
          label: group.displayName,
        };
      }),
    };
  },
  dataSourceType: "picklist",
});

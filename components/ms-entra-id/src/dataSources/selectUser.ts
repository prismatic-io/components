import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs as inputs } from "../inputs/dataSources";
import { getValues } from "../util";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from a picklist.",
  },
  inputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await getValues(true, client, `/users`, {
      params: { $select: "id,displayName" },
    });
    return {
      result: data.value
        .map((user: { id: string; displayName: string }) => ({
          label: user.displayName,
          key: user.id,
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});

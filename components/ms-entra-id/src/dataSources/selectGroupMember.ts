import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectGroupMemberInputs as inputs } from "../inputs/dataSources";
import { getValues } from "../util";

export const selectGroupMember = dataSource({
  display: {
    label: "Select Group Member",
    description: "Select a group member from a picklist.",
  },
  inputs,
  perform: async (_context, { connection, groupId }) => {
    const client = createClient(connection, false);
    const { data } = await getValues(
      true,
      client,
      `/groups/${groupId}/members`,
      {
        params: { $select: "id,displayName" },
      },
    );
    return {
      result: data.value.map((member: { id: string; displayName: string }) => {
        return {
          key: member.id,
          label: member.displayName,
        };
      }),
    };
  },
  dataSourceType: "picklist",
});

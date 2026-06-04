import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { groupIdForMembers } from "../inputs/members/general";

export const selectMember = dataSource({
  display: {
    label: "Select Group Member",
    description: "Select a member of a security or Microsoft 365 group.",
  },
  inputs: {
    connection,
    groupId: {
      ...groupIdForMembers,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
  perform: async (context, { connection, groupId }) => {
    const client = createClient(connection, false);

    const {
      data: { value: members },
    } = await client.get(`/groups/${groupId}/members`);

    return members.map((member: { id: string; mail: string }) => {
      return {
        label: member.mail,
        key: member.id,
      };
    });
  },
});

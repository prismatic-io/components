import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectMemberExamplePayload } from "../examplePayloads";
import { selectMemberInputs } from "../inputs";
export const selectMember = dataSource({
  display: {
    label: "Select Group Member",
    description: "Select a member of a security or Microsoft 365 group.",
  },
  inputs: selectMemberInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, groupId }) => {
    const client = createClient(connection, false);
    const {
      data: { value: members },
    } = await client.get(`${ENDPOINTS.GROUPS}/${groupId}/members`);
    return members.map((member: { id: string; mail: string }) => {
      return {
        label: member.mail,
        key: member.id,
      };
    });
  },
  examplePayload: selectMemberExamplePayload,
});

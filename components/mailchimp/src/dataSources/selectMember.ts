import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, listId } from "../inputs";
import type { MailchimpMember } from "../types";
import { paginatedRequest } from "../utils/pagination";

export const selectMember = dataSource({
  display: {
    label: "Select Member",
    description: "Select a member from a Mailchimp list/audience.",
  },
  inputs: {
    connection: connectionInput,
    listId: { ...listId, dataSource: undefined },
  },
  perform: async (_context, { connection, listId }) => {
    const client = await createClient(connection);
    const { data } = await paginatedRequest<MailchimpMember>({
      client,
      endpoint: `/lists/${listId}/members`,
      dataKey: "members",
      fetchAll: true,
    });

    const members = data.members as MailchimpMember[];
    const result = members
      .map<Element>((member) => ({
        label: member.full_name
          ? `${member.full_name} (${member.email_address})`
          : member.email_address,
        key: member.id.toString(),
      }))
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "John Doe (john.doe@example.com)",
        key: "b0a7d3c2f1e4a9b6c8d5e7f0a1b2c3d4",
      },
    ],
  },
});

export default selectMember;

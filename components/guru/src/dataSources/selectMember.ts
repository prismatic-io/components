import { dataSource, type Element } from "@prismatic-io/spectral";
import { getGuruClient } from "../client";
import { selectMemberInputs } from "../inputs";
import { fetchGuruResults } from "../util";
import type { GuruTeamMember } from "../types";

export const selectMember = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Member",
    description: "Select a member from your Guru team",
  },
  perform: async (_context, { connection, search }) => {
    const client = getGuruClient(connection, false);

    const queryParams = {
      search,
      sortField: "email",
      sortDir: "ASC",
    };

    const url = "/members";
    const members = await fetchGuruResults<GuruTeamMember>(
      client,
      url,
      true,
      queryParams,
    );

    return {
      result: members.map(
        (member): Element => ({
          label: member.id,
          key: member.id,
        }),
      ),
    };
  },
  inputs: selectMemberInputs,
});

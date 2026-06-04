import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listTeamMembersInputs } from "../../inputs";
import { fetchGuruResults } from "../../util";
import { listTeamMembersPayload } from "../../examplePayloads";

export const listTeamMembers = action({
  display: {
    label: "List Team Members",
    description: "Retrieve a list of all team members",
  },
  perform: async (context, { connection, search, fetchAll }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const queryParams = {
      search,
    };

    const url = "/members";
    const data = await fetchGuruResults(client, url, fetchAll, queryParams);

    return { data };
  },
  inputs: listTeamMembersInputs,
  examplePayload: listTeamMembersPayload,
});

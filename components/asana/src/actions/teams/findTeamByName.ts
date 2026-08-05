import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { findTeamByNameExamplePayload } from "../../examplePayloads";
import { findTeamByNameInputs } from "../../inputs";
import type { PaginatedResponse, Team } from "../../types";
export const findTeamByName = action({
  display: {
    label: "Find Team by Name",
    description: "Find a team by name within a workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: PaginatedResponse<Team> = await client.get(
        `/workspaces/${params.workspaceId}/teams`,
        {
          params: { offset },
        },
      );
      const filteredData = response.data.data.filter(
        (team) => params.teamName === team.name,
      );
      if (filteredData.length > 0) {
        return { data: filteredData[0] };
      }
      offset = response.data.next_page?.offset;
      if (!offset) {
        stop = true;
      }
    }
    throw new Error(`No team named "${params.teamName}" found.`);
  },
  inputs: findTeamByNameInputs,
  examplePayload: findTeamByNameExamplePayload,
});

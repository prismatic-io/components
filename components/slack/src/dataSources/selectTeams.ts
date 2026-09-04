import { dataSource, type Element } from "@prismatic-io/spectral";
import type { Team } from "@slack/web-api/dist/types/response/AdminTeamsListResponse";
import { createOauthClient } from "../client";
import { selectTeamsInputs } from "../inputs";
import { sortByAttribute } from "../util";
const MAX_DROPDOWN_PAGES = 10;
const PAGE_SIZE = 100;
export const selectTeams = dataSource({
  display: {
    label: "Select Team",
    description:
      "Select a workspace from an Enterprise Grid organization. Requires an org-level connection with the 'admin.teams:read' scope.",
  },
  inputs: selectTeamsInputs,
  perform: async (context, params) => {
    const client = await createOauthClient({
      slackConnection: params.connection,
    });
    let teams: Team[] = [];
    let cursor = null;
    let counter = 1;
    do {
      const data = await client.admin.teams.list({
        cursor,
        limit: PAGE_SIZE,
      });
      teams = [...teams, ...(data.teams ?? [])];
      cursor = data.response_metadata?.next_cursor;
      counter += 1;
    } while (cursor && counter < MAX_DROPDOWN_PAGES);
    const objects = sortByAttribute(teams, "name").map<Element>((team) => ({
      key: team.id,
      label: params.showIdInDropdown
        ? `${team.name} (ID: ${team.id})`
        : `${team.name}`,
    }));
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { key: "T1234567890", label: "Example Workspace (ID: T1234567890)" },
      { key: "T0987654321", label: "Example Engineering (ID: T0987654321)" },
    ],
  },
});

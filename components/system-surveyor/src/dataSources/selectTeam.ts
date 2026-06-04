import { dataSource, util } from "@prismatic-io/spectral";

import { createSsvClient } from "../client";
import { selectTeamExamplePayload } from "../examplePayloads/dataSources";
import { selectTeamInputs } from "../inputs";
import { sortByLabel } from "../util";


export const selectTeam = dataSource({
  display: {
    label: "Select Team",
    description: "Select a team from the current user's teams.",
  },
  inputs: selectTeamInputs,
  perform: async (_context, params) => {
    const client = await createSsvClient(params.ssvConnection);
    const { data: teams } = await client.get("/v3/teams");

    const result = sortByLabel(
      (teams as { id: number; name: string }[]).map((team) => ({
        label: team.name,
        key: util.types.toString(team.id),
      })),
    );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectTeamExamplePayload,
});

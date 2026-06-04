import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getTeamSystemTypesExamplePayload } from "../../examplePayloads/teams";
import { getTeamSystemTypesInputs } from "../../inputs";






export const getTeamSystemTypes = action({
  display: {
    label: "Get Team System Types",
    description:
      "Retrieve all system type elements available for a specific team.",
  },
  inputs: getTeamSystemTypesInputs,
  perform: async (context, { ssvConnection, teamId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(`/v3/team/${teamId}/systemtypes`);

    return { data };
  },
  examplePayload: getTeamSystemTypesExamplePayload,
});

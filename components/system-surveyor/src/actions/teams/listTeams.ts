import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listTeamsExamplePayload } from "../../examplePayloads/teams";
import { listTeamsInputs } from "../../inputs";






export const listTeams = action({
  display: {
    label: "List Teams",
    description: "Retrieve all teams the current user is a member of.",
  },
  inputs: listTeamsInputs,
  perform: async (context, { ssvConnection }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get("/v3/teams");

    return { data };
  },
  examplePayload: listTeamsExamplePayload,
});

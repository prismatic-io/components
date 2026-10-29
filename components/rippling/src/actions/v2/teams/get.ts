import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getTeamExamplePayload } from "../../../examplePayloads";
import { getTeamInputs } from "../../../inputs";

export const getTeam = action({
  display: {
    label: "Get Team (V2)",
    description: "Retrieve a specific team by ID.",
  },
  inputs: getTeamInputs,
  examplePayload: getTeamExamplePayload,
  perform: async (context, { connection, id, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${id}`, {
      params: {
        expand,
      },
    });
    return { data };
  },
});

import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getAuthorizedTeamsExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const getAuthorizedTeams = action({
  display: {
    label: "Get Authorized Workspaces",
    description: "List the workspaces available to the authenticated user.",
  },
  examplePayload: getAuthorizedTeamsExamplePayload,
  perform: async (context, { clickUpConnection }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get("/team");

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
  },
});

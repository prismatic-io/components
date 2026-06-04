import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getGuestExamplePayload } from "../../examplePayloads";
import { connectionInput, getGuestId, getTeamId } from "../../inputs";

const teamId = getTeamId(true);
const guestId = getGuestId(true, "Guest ID");

export const getGuest = action({
  display: {
    label: "Get Guest",
    description: "Retrieve information about a guest in a workspace.",
  },
  examplePayload: getGuestExamplePayload,
  perform: async (context, { clickUpConnection, teamId, guestId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/guest/${guestId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    guestId,
  },
});

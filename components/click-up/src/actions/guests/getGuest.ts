import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getGuestExamplePayload } from "../../examplePayloads";
import { getGuestInputs } from "../../inputs";
export const getGuest = action({
  display: {
    label: "Get Guest",
    description: "Retrieve information about a guest in a workspace.",
  },
  examplePayload: getGuestExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId, guestId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/guest/${guestId}`);
    return {
      data,
    };
  },
  inputs: getGuestInputs,
});

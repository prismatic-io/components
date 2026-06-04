import { action } from "@prismatic-io/spectral";
import { createShipStationClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieves the list of users on the account.",
  },
  perform: async (context, { connectionInput, showInactive }) => {
    const client = createShipStationClient(
      connectionInput,
      context.debug.enabled,
    );

    const params = {
      showInactive,
    };

    const { data } = await client.get("/users", { params });
    return { data };
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { suspendUserExamplePayload } from "../../examplePayloads/users";
import { suspendUserInputs } from "../../inputs/users";

export const suspendUser = action({
  display: {
    label: "Suspend User",
    description: "Suspend a user by ID or login.",
  },
  inputs: suspendUserInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.post(`/users/${encodeURIComponent(id)}/lifecycle/suspend`);

    return {
      data: {
        id,
        status: "SUSPENDED",
      },
    };
  },
  examplePayload: suspendUserExamplePayload,
});

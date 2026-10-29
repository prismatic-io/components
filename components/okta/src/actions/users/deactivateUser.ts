import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deactivateUserExamplePayload } from "../../examplePayloads/users";
import { deactivateUserInputs } from "../../inputs/users";

export const deactivateUser = action({
  display: {
    label: "Deactivate User",
    description: "Deactivate a user by ID or login.",
  },
  inputs: deactivateUserInputs,
  perform: async (context, { connection, id, sendEmail }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.post(`/users/${encodeURIComponent(id)}/lifecycle/deactivate`, {
      sendEmail,
    });

    return {
      data: {
        id,
        status: "DEPROVISIONED",
      },
    };
  },
  examplePayload: deactivateUserExamplePayload,
});

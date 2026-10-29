import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { deactivateUserV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { deactivateUserV3Inputs } from "../../../inputs/v3/users";

export const deactivateUserV3 = action({
  display: {
    label: "Deactivate User",
    description: "Deactivates an existing user.",
  },
  inputs: deactivateUserV3Inputs,
  perform: async (context, { connection, userId }) => {
    const client = createV3Client(connection, context.debug.enabled);

    await client.post(`/users/${userId}/deactivate`, {});
    return { data: { success: true } };
  },
  examplePayload: deactivateUserV3ExamplePayload,
});

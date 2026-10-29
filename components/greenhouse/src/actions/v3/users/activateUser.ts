import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { activateUserV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { activateUserV3Inputs } from "../../../inputs/v3/users";

export const activateUserV3 = action({
  display: {
    label: "Activate User",
    description: "Activates an existing user.",
  },
  inputs: activateUserV3Inputs,
  perform: async (context, { connection, userId }) => {
    const client = createV3Client(connection, context.debug.enabled);

    await client.post(`/users/${userId}/activate`, {});
    return { data: { success: true } };
  },
  examplePayload: activateUserV3ExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { getUserV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { getUserV3Inputs } from "../../../inputs/v3/users";
import type { V3User } from "../../../types";

export const getUserV3 = action({
  display: {
    label: "Get User",
    description: "Retrieves a single user by ID.",
  },
  inputs: getUserV3Inputs,
  perform: async (context, { connection, userId: userIdVal }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.get<V3User[]>("/users", {
      params: { ids: userIdVal },
    });
    return { data: data[0] ?? null };
  },
  examplePayload: getUserV3ExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads/users";
import { getUserInputs } from "../../inputs/users";
import type { User } from "../../interfaces/user";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve a user by ID or login.",
  },
  inputs: getUserInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<User>(`/users/${encodeURIComponent(id)}`);

    return { data };
  },
  examplePayload: getUserExamplePayload,
});

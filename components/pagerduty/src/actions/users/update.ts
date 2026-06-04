import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateUserExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  updateUserExample,
  userId,
  userObject,
} from "../../inputs";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update an existing user.",
  },
  perform: async (context, { connection, id, user }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/users/${id}`, { user });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userId,
    user: {
      ...userObject,
      example: updateUserExample,
    },
  },
  examplePayload: updateUserExamplePayload,
});

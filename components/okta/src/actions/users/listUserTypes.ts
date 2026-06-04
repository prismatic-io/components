import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUserTypesExamplePayload } from "../../examplePayloads/users";
import { listUserTypesInputs } from "../../inputs/users";
import type { UserType } from "../../interfaces/user";

export const listUserTypes = action({
  display: {
    label: "List User Types",
    description: "Lists all user types in your org.",
  },
  inputs: listUserTypesInputs,
  perform: async (context, { connection }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get<UserType[]>("/meta/types/user");

    return {
      data,
    };
  },
  examplePayload: listUserTypesExamplePayload,
});

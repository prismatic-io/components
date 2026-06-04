import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { paginateCursor } from "../../util";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Lists users with cursor-based pagination.",
  },
  inputs: listUsersInputs,
  perform: async (context, { connection, fetchAll, cursor, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/users/list",
      "users",
      { cursor, limit },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listUsersExamplePayload,
});

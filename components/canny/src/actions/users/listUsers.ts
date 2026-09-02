import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { listUsersOutputSchema } from "../../outputSchemas";
import { paginateCursor } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Lists users with cursor-based pagination.",
  },
  inputs: listUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUsersOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/users/list",
      "users",
      { cursor: pagination.cursor, limit: pagination.limit },
      fetchAll,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listUsersExamplePayload,
  examplePayload: listUsersExamplePayload,
});

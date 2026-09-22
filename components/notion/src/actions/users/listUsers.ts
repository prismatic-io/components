import { action, outputSchema } from "@prismatic-io/spectral";
import { listUsersOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { HttpMethod, MAX_PAGE_SIZE } from "../../constants";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { getPaginatedData } from "../../utils";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users in the workspace with optional page size",
  },
  inputs: listUsersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUsersOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await getPaginatedData(
      client,
      HttpMethod.GET,
      "/users",
      params.fetchAll,
      undefined,
      {
        start_cursor: params.fetchAll
          ? undefined
          : params.pagination.startCursor,
        page_size: params.fetchAll ? MAX_PAGE_SIZE : params.pagination.pageSize,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listUsersExamplePayload,
  examplePayload: listUsersExamplePayload,
});

import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersResponse } from "../../examplePayloads";
import { connection, includeInActive, limit, page } from "../../inputs";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieve all users",
  },
  inputs: { page, limit, includeInActive, connection },
  perform: async (context, { connection, includeInActive, limit, page }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data, headers } = await client.get("/users", {
      params: {
        page,
        limit,
        includeInActive,
      },
    });
    return { data, headers: headers as Record<string, string> };
  },
  examplePayload: {
    data: listUsersResponse,
    headers: {},
  },
});

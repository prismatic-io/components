import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, count, cursor, region } from "../../inputs";
import { listUsersExamplePayload } from "../../examplePayloads";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Returns a list of users with access to the Workspace.",
  },
  inputs: {
    connectionInput,
    region,

    count,
    cursor,
  },
  perform: async (context, { connectionInput, region, count, cursor }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/users`, {
      params: {
        pagination: {
          count: count || undefined,
          cursor: cursor || undefined,
        },
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listUsersExamplePayload,
  },
});

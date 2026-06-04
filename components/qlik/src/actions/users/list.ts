import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { connectionInput, limit, paramsInputFields, sort } from "../../inputs";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Get all Users.",
  },
  examplePayload: listUsersExamplePayload,
  perform: async (context, { connection, limit, sort, paramsInputFields }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users`, {
      params: {
        limit: limit || undefined,
        sort: sort || undefined,
        ...paramsInputFields,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    limit,
    sort,
    paramsInputFields,
  },
});

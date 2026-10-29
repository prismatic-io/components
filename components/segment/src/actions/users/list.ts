import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Returns a list of users with access to the Workspace.",
  },
  inputs: {
    connectionInput,
    region,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, fetchAll, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/users",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listUsersExamplePayload,
  },
});

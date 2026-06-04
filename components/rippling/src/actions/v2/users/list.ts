import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listUsersExamplePayload } from "../../../examplePayloads";
import { listUsersInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listUsers = action({
  display: {
    label: "List Users (V2)",
    description: "Retrieve a list of users.",
  },
  inputs: listUsersInputs,
  examplePayload: listUsersExamplePayload,
  perform: async (context, { connection, orderBy, cursor, fetchAll }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/users", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});

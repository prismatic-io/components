import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import type { JamfUser, RichPagedResponse } from "../../types";
import { paginateResults } from "../../util";
export const listUsers = action({
  display: {
    label: "List Users",
    description:
      "List Jamf Pro user accounts with optional filtering and pagination.",
  },
  inputs: listUsersInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<JamfUser, RichPagedResponse<JamfUser>>(
      client,
      "/v1/users",
      fetchAll,
      { page: pagination.page, "page-size": pagination.pageSize, sort, filter },
    );
    return { data };
  },
  examplePayload: listUsersExamplePayload,
});

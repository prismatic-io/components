import { action } from "@prismatic-io/spectral";
import { listUsersInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { UserResponse } from "../../types";
import { fetchAdobeSignResults } from "../../util";
import { listUsersExamplePayload } from "../../examplePayloads";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieves all the users in an account.",
  },
  inputs: listUsersInputs,
  perform: async (context, { connection, fetchAll, cursor, pageSize }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      UserResponse,
      "userInfoList",
      typeof fetchAll
    >(
      client,
      "/users",
      fetchAll,
      {
        pageSize: pageSize || undefined,
        cursor: cursor || undefined,
      },
      "userInfoList",
    );

    return { data };
  },
  examplePayload: listUsersExamplePayload,
});

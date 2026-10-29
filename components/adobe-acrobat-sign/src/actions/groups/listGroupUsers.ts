import { action } from "@prismatic-io/spectral";
import { listGroupUsersInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ListGroupUsers } from "../../types";
import { listGroupUsersExamplePayload } from "../../examplePayloads";
import { fetchAdobeSignResults } from "../../util";

export const listGroupUsers = action({
  display: {
    label: "List Group Users",
    description: "Retrieves all the users in a group.",
  },
  inputs: listGroupUsersInputs,
  perform: async (context, { connection, fetchAll, pagination, groupId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      ListGroupUsers,
      "userInfoList",
      typeof fetchAll
    >(
      client,
      `/groups/${groupId}/users`,
      fetchAll,
      {
        pageSize: pagination.pageSize || undefined,
        cursor: pagination.cursor || undefined,
      },
      "userInfoList",
    );

    return { data };
  },
  examplePayload: listGroupUsersExamplePayload,
});

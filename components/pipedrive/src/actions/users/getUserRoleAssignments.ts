import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  userIdInput,
} from "../../inputs";

export const getUserRoleAssignments = action({
  display: {
    label: "Get User Role Assignments",
    description: "Lists user role assignments.",
  },
  perform: async (context, { connection, id, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/roleAssignments`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: userIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});

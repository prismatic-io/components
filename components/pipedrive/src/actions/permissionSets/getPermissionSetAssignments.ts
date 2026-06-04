import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  permissionSetIdInput,
} from "../../inputs";

export const getPermissionSetAssignments = action({
  display: {
    label: "Get Permission Set Assignments",
    description: "Lists permission set assignments.",
  },
  perform: async (context, { connection, id, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/permissionSets/${id}/assignments`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: permissionSetIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
